import { useState, useRef } from "react";
import { ArrowLeft, ArrowRight, Crown, ChevronLeft, ChevronRight } from "lucide-react";
import { GUIDES, GUIDE_BG } from "../flow";
import { GuideSprite } from "./guide-sprite";

export default function GuideSelect({ onBack, onNext, initial }: { onBack: () => void; onNext: (id: string) => void; initial: string | null }) {
  const [sel, setSel] = useState<string | null>(initial || "vampire");
  const scrollRef = useRef<HTMLDivElement>(null);
  const selGuide = GUIDES.find(g => g.id === sel);
  const bgUrl = sel && GUIDE_BG[sel] ? GUIDE_BG[sel] : "/assets/bg/bg_guide_1783273703509.png";

  return (
    <div className="relative min-h-screen w-full pb-64" style={{ fontFamily: "Inter, sans-serif" }}>
      {/* Background Layers for smooth transition */}
      <div className="fixed inset-0 z-0 bg-[#FAF7F0]">
        <div className="absolute inset-0 bg-cover bg-center transition-opacity duration-700" style={{ backgroundImage: "url('/assets/bg/bg_guide_1783273703509.png')", opacity: sel ? 0 : 1 }} />
        {Object.entries(GUIDE_BG).map(([id, url]) => (
          <div key={id} className="absolute inset-0 bg-cover bg-center transition-opacity duration-700" style={{ backgroundImage: `url('${url}')`, opacity: sel === id ? 1 : 0 }} />
        ))}
        {/* Overlay */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(rgba(250,247,240, 0.65), rgba(250,247,240, 0.8))" }} />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl px-6 pt-8">
        <button onClick={onBack} className="flex items-center gap-2 text-sm" style={{ color: "#555" }}><ArrowLeft className="h-4 w-4" /> Kembali</button>
        <div className="mt-6 text-center">
          <h1 style={{ fontFamily: "'Crimson Text', serif", fontSize: 32, fontWeight: 700 }}>Pilih Spirit Guide-mu</h1>
          <p className="mt-2 text-sm" style={{ color: "#555" }}>Mereka akan menemanimu sepanjang perjalanan ini</p>
          <div className="mt-4 flex justify-center gap-2">
            {[0,1,2,3,4].map(i => <div key={i} className="h-2 w-2 rounded-full" style={{ background: i <= 2 ? "#2D6A4F" : "#E8E0D5" }} />)}
          </div>
          <p className="mt-2 text-xs uppercase tracking-widest" style={{ color: "#999" }}>Langkah 3 dari 5</p>
        </div>

        {selGuide && (
          <div className="relative mt-8 overflow-hidden rounded-xl p-5 shadow-[0_2px_12px_rgba(0,0,0,0.06)]" style={{ background: (selGuide as any).bgGradient || "white", border: `1px solid ${selGuide.color}33` }}>
            {/* Border Decorations */}
            <div className="pointer-events-none absolute inset-1.5 rounded-lg border border-dashed opacity-20" style={{ borderColor: selGuide.color }} />
            <div className="pointer-events-none absolute left-2 top-2 h-3 w-3 border-l-2 border-t-2 opacity-50" style={{ borderColor: selGuide.color }} />
            <div className="pointer-events-none absolute right-2 top-2 h-3 w-3 border-r-2 border-t-2 opacity-50" style={{ borderColor: selGuide.color }} />
            <div className="pointer-events-none absolute bottom-2 left-2 h-3 w-3 border-b-2 border-l-2 opacity-50" style={{ borderColor: selGuide.color }} />
            <div className="pointer-events-none absolute bottom-2 right-2 h-3 w-3 border-b-2 border-r-2 opacity-50" style={{ borderColor: selGuide.color }} />

            {/* Ornament watermark */}
            <div className="pointer-events-none absolute -bottom-6 -right-4 select-none opacity-[0.03] grayscale transition-all" style={{ fontSize: "140px", transform: "rotate(-15deg)" }}>
              {selGuide.emoji}
            </div>

            <div className="relative z-10">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full sm:h-20 sm:w-20" style={{ background: selGuide.color + "22" }}>
                  <GuideSprite guideId={selGuide.id} size={56} />
                </div>
                <div>
                  <div style={{ fontFamily: "'Crimson Text', serif", fontSize: 20, fontWeight: 700, color: selGuide.color, lineHeight: 1.2 }}>{selGuide.name}</div>
                  <div className="text-xs italic mt-0.5" style={{ color: "#999" }}>{selGuide.title}</div>
                </div>
              </div>
              
              <div className="mt-3">
                <p className="text-xs sm:text-sm leading-relaxed" style={{ color: "#555" }}>{selGuide.desc}</p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {selGuide.traits.map(t => <span key={t} className="rounded-full px-2 py-0.5 text-[10px] sm:text-xs sm:px-3 sm:py-1" style={{ background: selGuide.color + "22", color: selGuide.color }}>{t}</span>)}
                </div>
                <p className="mt-2 text-xs sm:text-sm italic" style={{ color: selGuide.color }}>"{selGuide.quote}"</p>
              </div>

              {/* Typings */}
              {(selGuide as any).typings && (
                <div className="mt-4 grid grid-cols-3 gap-1.5 sm:gap-2">
                  <div className="rounded-lg bg-white/60 p-2 text-xs shadow-sm backdrop-blur-sm">
                    <span className="block text-[9px] font-bold text-gray-500">MBTI</span>
                    <span className="block font-semibold text-gray-800 break-words leading-tight mt-0.5">{(selGuide as any).typings.mbti}</span>
                  </div>
                  <div className="rounded-lg bg-white/60 p-2 text-xs shadow-sm backdrop-blur-sm">
                    <span className="block text-[9px] font-bold text-gray-500">KARIR</span>
                    <span className="block font-semibold text-gray-800 break-words leading-tight mt-0.5">{(selGuide as any).typings.riasec}</span>
                  </div>
                  <div className="rounded-lg bg-white/60 p-2 text-xs shadow-sm backdrop-blur-sm">
                    <span className="block text-[9px] font-bold text-gray-500">FINANSIAL</span>
                    <span className="block font-semibold text-gray-800 break-words leading-tight mt-0.5">{(selGuide as any).typings.financial}</span>
                  </div>
                  <div className="rounded-lg bg-white/60 p-2 text-xs shadow-sm backdrop-blur-sm">
                    <span className="block text-[9px] font-bold text-gray-500">BELAJAR</span>
                    <span className="block font-semibold text-gray-800 break-words leading-tight mt-0.5">{(selGuide as any).typings.learning}</span>
                  </div>
                  <div className="rounded-lg bg-white/60 p-2 text-xs shadow-sm backdrop-blur-sm">
                    <span className="block text-[9px] font-bold text-gray-500">SOSIAL</span>
                    <span className="block font-semibold text-gray-800 break-words leading-tight mt-0.5">{(selGuide as any).typings.attachment}</span>
                  </div>
                  <div className="rounded-lg bg-white/60 p-2 text-xs shadow-sm backdrop-blur-sm">
                    <span className="block text-[9px] font-bold text-gray-500">NILAI</span>
                    <span className="block font-semibold text-gray-800 break-words leading-tight mt-0.5">{(selGuide as any).typings.wellbeing}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="mt-6">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest text-center sm:text-left">Atau pilih guide lainnya:</p>
            <div className="hidden sm:flex items-center gap-2">
              <button onClick={() => scrollRef.current?.scrollBy({ left: -300, behavior: 'smooth' })} className="flex h-7 w-7 items-center justify-center rounded-full bg-white shadow hover:bg-gray-50 transition border border-gray-100 text-gray-600"><ChevronLeft className="h-4 w-4" /></button>
              <button onClick={() => scrollRef.current?.scrollBy({ left: 300, behavior: 'smooth' })} className="flex h-7 w-7 items-center justify-center rounded-full bg-white shadow hover:bg-gray-50 transition border border-gray-100 text-gray-600"><ChevronRight className="h-4 w-4" /></button>
            </div>
          </div>
          <div ref={scrollRef} className="flex gap-3 overflow-x-auto pb-4 snap-x" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
            <style>{`
              .flex.overflow-x-auto::-webkit-scrollbar { display: none; }
            `}</style>
            {GUIDES.map(g => {
              const isSel = sel === g.id;
              return (
                <button key={g.id} onClick={() => setSel(g.id)} className="relative flex shrink-0 snap-center flex-col items-center gap-2 rounded-xl p-3 transition w-[88px]" style={{
                  background: isSel ? "#FFF8E1" : "#FFFFFF",
                  border: `${isSel ? 2 : 1}px solid ${isSel ? "#C9A84C" : "#E8E0D5"}`,
                  boxShadow: isSel ? "0 0 16px rgba(201,168,76,0.5)" : "none",
                }}>
                  {isSel && <Crown className="absolute -top-3 h-5 w-5 text-amber-500" />}
                  <div className="flex h-14 w-14 items-center justify-center rounded-full" style={{ background: g.color + "22" }}>
                    <GuideSprite guideId={g.id} size={48} withShadow={false} />
                  </div>
                  <div className="text-center text-xs" style={{ color: isSel ? "#C9A84C" : "#555", fontWeight: isSel ? 700 : 400 }}>{g.name}</div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-white/95 backdrop-blur" style={{ borderColor: "#E8E0D5" }}>
        <div className="mx-auto flex max-w-3xl items-center justify-end px-6 py-4 pb-safe">
          <button disabled={!sel} onClick={() => sel && onNext(sel)} className="inline-flex items-center gap-2 rounded-xl px-6 text-white transition disabled:opacity-40 hover:brightness-110" style={{ background: "linear-gradient(90deg, #2D6A4F, #C9A84C)", height: 48, fontWeight: 600 }}>
            Mulai Perjalanan! <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
