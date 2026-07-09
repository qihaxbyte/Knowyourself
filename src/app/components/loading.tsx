import { useEffect, useState } from "react";
import { GUIDES } from "../flow";
import { GuideSprite } from "./guide-sprite";

const PHASES = ["Menganalisis jawabanmu...", "Menemukan pola tersembunyimu...", "Merangkai insight terbaik...", "Hampir selesai..."];
const CHECKS = ["Memahami kepribadianmu", "Mencari pola terbaikmu", "Merangkai insight terbaik", "Hampir selesai..."];

export default function Loading({ guideId, onDone }: { guideId: string; onDone: () => void }) {
  const guide = GUIDES.find(g => g.id === guideId)!;
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setProgress(p => {
      const next = p + 2;
      if (next >= 100) { clearInterval(t); setTimeout(onDone, 500); return 100; }
      return next;
    }), 80);
    return () => clearInterval(t);
  }, [onDone]);

  useEffect(() => {
    const t = setInterval(() => setPhase(p => (p + 1) % PHASES.length), 1500);
    return () => clearInterval(t);
  }, []);

  const checksShown = Math.floor((progress / 100) * CHECKS.length);

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden" style={{ fontFamily: "Inter, sans-serif" }}>
      {/* Background Image */}
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/assets/bg/bg_loading.png')" }} />
      <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(26,26,26,0.8), rgba(13,13,13,0.9))", backdropFilter: "blur(4px)" }} />
      {[...Array(40)].map((_, i) => (
        <span key={i} className="absolute h-1 w-1 rounded-full bg-white" style={{
          left: `${(i * 37) % 100}%`, top: `${(i * 53) % 100}%`,
          opacity: 0.3 + ((i % 5) * 0.15),
          animation: `twinkle ${2 + (i % 4)}s ease-in-out ${i * 0.1}s infinite`,
        }} />
      ))}

      <div className="relative z-10 flex max-w-md flex-col items-center px-6 text-center text-white">
        <div className="relative mb-6">
          <div className="absolute inset-0 -m-4 rounded-full blur-2xl" style={{ background: phase === 0 ? "#6B4C9A" : phase === 1 ? "#52B788" : "#C9A84C", opacity: 0.6, transition: "background 600ms" }} />
          <div className="relative flex h-44 w-44 items-center justify-center rounded-full text-7xl" style={{
            background: "radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.05) 70%)",
            border: "2px solid rgba(255,255,255,0.2)",
            animation: "spin-slow 8s linear infinite",
          }}>
            🔮
          </div>
        </div>

        <div className="mb-3 flex items-center gap-2">
          <span className="flex items-center justify-center h-8 w-8 rounded-full" style={{ background: "rgba(255,255,255,0.15)" }}><GuideSprite guideId={guide.id} size={32} animate={false} /></span>
          <span className="text-xs italic" style={{ color: "rgba(255,255,255,0.6)" }}>{guide.name} sedang mengamati...</span>
        </div>

        <p style={{ fontFamily: "'Crimson Text', serif", fontSize: 18, fontStyle: "italic" }} key={phase}>
          {PHASES[phase]}
        </p>

        <div className="mt-4 h-1.5 w-64 overflow-hidden rounded-full bg-white/10">
          <div className="h-full rounded-full transition-all" style={{ width: `${progress}%`, background: "linear-gradient(90deg, #C9A84C, #F0D080)" }} />
        </div>

        <div className="mt-6 space-y-1 text-left text-sm">
          {CHECKS.slice(0, checksShown).map((c, i) => (
            <div key={i} style={{ color: "rgba(255,255,255,0.85)" }}>✓ {c}</div>
          ))}
          {checksShown < CHECKS.length && <div style={{ color: "rgba(255,255,255,0.4)" }}>○ {CHECKS[checksShown]}</div>}
        </div>

        {progress >= 70 && (
          <p className="mt-6 text-xs italic" style={{ color: "rgba(255,255,255,0.6)" }}>
            "{guide.quote}" - {guide.name}
          </p>
        )}
      </div>

      <style>{`
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes twinkle { 0%, 100% { opacity: 0.2; } 50% { opacity: 1; } }
      `}</style>
    </div>
  );
}
