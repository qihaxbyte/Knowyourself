import { useEffect, useState } from "react";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { GUIDES, GUIDE_BG } from "../flow";
import { GuideSprite } from "./guide-sprite";

export default function Welcome({ guideId, onNext, onChangeGuide }: { guideId: string; onNext: () => void; onChangeGuide: () => void }) {
  const guide = GUIDES.find(g => g.id === guideId)!;
  const fullText = `Hei! Aku ${guide.name}, ${guide.title}. ✨\nAku akan membantumu menggali potensi tersembunyimu sepanjang perjalanan ini.\nSiap memulai petualanganmu?`;
  const [shown, setShown] = useState("");

  useEffect(() => {
    let i = 0;
    const t = setInterval(() => {
      i++;
      setShown(fullText.slice(0, i));
      if (i >= fullText.length) clearInterval(t);
    }, 25);
    return () => clearInterval(t);
  }, [fullText]);

  return (
    <div className="relative min-h-screen w-full overflow-hidden" style={{ 
      backgroundImage: `linear-gradient(180deg, transparent 0%, #FAF7F0aa 40%, #FAF7F0 100%), url('${GUIDE_BG[guideId] || ''}')`, 
      backgroundSize: "cover",
      backgroundPosition: "center",
      fontFamily: "Inter, sans-serif" 
    }}>
      {/* ── Header ── */}
      <div className="relative z-10 mx-auto max-w-2xl px-6 pt-safe pb-4 text-gray-700">
        <button
          onClick={onChangeGuide}
          className="flex items-center gap-2 rounded-full bg-white/40 px-3 py-1.5 text-sm backdrop-blur transition hover:bg-white/60 shadow-sm"
        >
          <ArrowLeft className="h-4 w-4" /> Kembali
        </button>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-[55vh] rounded-t-3xl bg-white/95 shadow-[0_-8px_40px_rgba(0,0,0,0.1)] backdrop-blur" />

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-80px)] max-w-2xl flex-col items-center justify-end px-6 pb-12">
        <div className="mb-4 flex h-40 w-40 items-center justify-center rounded-full shadow-2xl" style={{ background: guide.color + "33" }}>
          <GuideSprite guideId={guide.id} size={140} />
        </div>

        <div className="w-full">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold" style={{ background: "#C9A84C", color: "#1A1A1A" }}>
            ✦ {guide.name}
          </div>

          <div className="mt-4 rounded-xl border-2 bg-amber-50/60 p-5 shadow-sm" style={{ borderColor: "#C9A84C" }}>
            <pre className="whitespace-pre-wrap text-center" style={{ fontFamily: "'Crimson Text', serif", fontSize: 18, color: "#1A1A1A", lineHeight: 1.6 }}>
              {shown}
              <span className="animate-pulse">▌</span>
            </pre>
          </div>

          <div className="mt-4 text-center">
            <div className="text-xs uppercase tracking-widest" style={{ color: "#999" }}>Gaya bimbinganku:</div>
            <div className="mt-2 flex flex-wrap justify-center gap-2">
              {guide.traits.map(t => <span key={t} className="rounded-full px-3 py-1 text-xs" style={{ background: guide.color + "22", color: guide.color }}>{t}</span>)}
            </div>
          </div>

          <div className="mt-6 flex flex-col items-center gap-3">
            <button onClick={onNext} className="inline-flex w-full max-w-sm items-center justify-center gap-2 rounded-xl px-6 text-white transition hover:brightness-110 shadow-premium" style={{ background: guide.color, height: 52, fontWeight: 600 }}>
              Siap! Mulai <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <style>{`@keyframes float-slow { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }`}</style>
    </div>
  );
}
