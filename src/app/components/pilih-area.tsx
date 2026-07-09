import { useState } from "react";
import { ArrowLeft, ArrowRight, Check, Clock, ListChecks, X } from "lucide-react";
import { CATEGORIES } from "../flow";
import { CATEGORY_TIME_ESTIMATES } from "../questions";

const ICON_IMGS: Record<string, string> = {
  kepribadian: "/assets/icons/cat_kepribadian_pixel.png",
  karir: "/assets/icons/cat_karir_pixel.png",
  finansial: "/assets/icons/cat_finansial_pixel.png",
  belajar: "/assets/icons/cat_belajar_pixel.png",
  attachment: "/assets/icons/cat_attachment_pixel.png",
  kesejahteraan: "/assets/icons/cat_kesejahteraan_pixel.png",
};

export default function PilihArea({ onBack, onNext, initial, initialQuick = null }: { onBack: () => void; onNext: (ids: string[], isQuick: boolean) => void; initial: string[]; initialQuick?: boolean | null }) {
  const [selected, setSelected] = useState<Set<string>>(new Set(initial));
  const [isQuick, setIsQuick] = useState<boolean | null>(initialQuick);
  const toggle = (id: string) => {
    const s = new Set(selected);
    s.has(id) ? s.delete(id) : s.add(id);
    setSelected(s);
  };
  const count = selected.size;

  return (
    <div className="min-h-screen w-full pb-64" style={{
      backgroundImage: "linear-gradient(rgba(250,247,240, 0.65), rgba(250,247,240, 0.8)), url('/assets/bg/bg_pilih_area_night_1783274214753.png')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundAttachment: "fixed",
      fontFamily: "Inter, sans-serif"
    }}>
      <div className="relative z-10 mx-auto max-w-3xl px-6 pt-safe pb-8">
        <button onClick={onBack} className="flex items-center gap-2 text-sm" style={{ color: "#555" }}>
          <ArrowLeft className="h-4 w-4" /> Kembali
        </button>

        <div className="mt-6 text-center">
          <h1 style={{ fontFamily: "'Crimson Text', serif", fontSize: 32, fontWeight: 700 }}>Pilih Area</h1>
          <p className="mt-2 text-sm" style={{ color: "#555" }}>Pilih satu atau lebih kategori yang ingin kamu jelajahi</p>
          <div className="mt-4 flex justify-center gap-3">
            {[0, 1, 2, 3, 4].map(i => <div key={i} className={`h-2.5 w-2.5 rounded-full transition-all duration-500 ${i === 0 ? "scale-125" : ""}`} style={{ background: i === 0 ? "#2D6A4F" : "#E8E0D5", boxShadow: i === 0 ? "0 0 10px rgba(45, 106, 79, 0.4)" : "none" }} />)}
          </div>
          <p className="mt-2 text-xs uppercase tracking-widest" style={{ color: "#999" }}>Langkah 1 dari 5</p>
        </div>

        <div className="mt-8 flex items-center justify-between">
          <div className="text-sm font-semibold text-gray-700">Kategori Tes</div>
          <button
            onClick={() => {
              if (selected.size === CATEGORIES.length) {
                setSelected(new Set());
              } else {
                setSelected(new Set(CATEGORIES.map(c => c.id)));
              }
            }}
            className="group flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold shadow-sm transition-all hover:shadow-md"
            style={{
              background: selected.size === CATEGORIES.length ? "#C9A84C" : "white",
              borderColor: selected.size === CATEGORIES.length ? "#C9A84C" : "#E8E0D5",
              color: selected.size === CATEGORIES.length ? "white" : "#666"
            }}
          >
            {selected.size === CATEGORIES.length ? (
              <>
                <X className="h-3.5 w-3.5 transition-transform group-hover:rotate-90" />
                Batal Pilih Semua
              </>
            ) : (
              <>
                <ListChecks className="h-3.5 w-3.5 text-amber-600 transition-transform group-hover:scale-110" />
                <span className="text-gray-700">Pilih Semua</span>
              </>
            )}
          </button>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {CATEGORIES.map(c => {
            const isSel = selected.has(c.id);
            return (
              <button key={c.id} onClick={() => toggle(c.id)} className="group relative rounded-2xl p-5 text-left transition-all duration-300 glass-panel hover:shadow-premium-hover" style={{
                background: isSel ? c.light : "rgba(252, 249, 242, 0.8)",
                border: `${isSel ? 2 : 1}px solid ${isSel ? c.color : "rgba(212,196,168,0.5)"}`,
                transform: isSel ? "scale(1.02) translateY(-2px)" : "scale(1)",
                boxShadow: isSel ? `0 12px 24px ${c.color}33, inset 0 2px 4px rgba(255,255,255,0.5)` : "0 6px 16px rgba(139,69,19,0.06)",
              }}>
                {isSel && <div className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full animate-slide-up-fade" style={{ background: c.color, boxShadow: `0 0 12px ${c.color}66` }}><Check className="h-4 w-4 text-white" /></div>}
                <div className="flex h-14 w-14 items-center justify-center rounded-full transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-1" style={{ background: c.light, color: c.color, boxShadow: `inset 0 2px 4px rgba(255,255,255,0.6)` }}>
                  <img src={ICON_IMGS[c.id]} alt={c.name} className="h-10 w-10 object-contain drop-shadow-sm" style={{ imageRendering: "pixelated" }} />
                </div>
                <div className="mt-4 transition-colors" style={{ fontFamily: "'Crimson Text', serif", fontSize: 19, fontWeight: 700, color: isSel ? c.color : "#1A1A1A" }}>{c.name}</div>
                <div className="mt-1 text-xs leading-relaxed" style={{ color: "#555" }}>{c.desc}</div>
              </button>
            );
          })}
        </div>

        <div className="mt-8 flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm" style={{ background: "#F0EBE3", color: "#555" }}>
            <Clock className="h-4 w-4" />
            Estimasi waktu: ~{Math.max(1, Math.floor(Array.from(selected).reduce((t, id) => t + (CATEGORY_TIME_ESTIMATES[id] || 5), 0) * (isQuick ? 0.3 : 1)))} menit
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3">
          <button
            onClick={() => setIsQuick(false)}
            className="flex items-center gap-3 rounded-xl border p-4 transition-all hover:bg-[#2D6A4F]/5"
            style={{
              borderColor: isQuick === false ? "#2D6A4F" : "#E8E0D5",
              background: isQuick === false ? "#2D6A4F0D" : "#FCF9F2",
              boxShadow: isQuick === false ? "0 4px 12px rgba(45,106,79,0.1)" : "0 4px 12px rgba(139,69,19,0.04)",
            }}
          >
            <div
              className="flex h-5 w-5 items-center justify-center rounded-full border-2"
              style={{
                borderColor: isQuick === false ? "#2D6A4F" : "#ccc",
                background: isQuick === false ? "#2D6A4F" : "transparent",
              }}
            >
              {isQuick === false && <Check className="h-3 w-3 text-white" />}
            </div>
            <div className="text-left">
              <div className="text-sm font-bold" style={{ color: isQuick === false ? "#2D6A4F" : "#555" }}>Mode Mendalam 🔍</div>
              <div className="text-xs text-gray-500">Akurasi maksimal. Menjawab semua soal, termasuk esai.</div>
            </div>
          </button>

          <button
            onClick={() => setIsQuick(true)}
            className="flex items-center gap-3 rounded-xl border p-4 transition-all hover:bg-[#C9A84C]/5"
            style={{
              borderColor: isQuick === true ? "#C9A84C" : "#E8E0D5",
              background: isQuick === true ? "#C9A84C0D" : "#FCF9F2",
              boxShadow: isQuick === true ? "0 4px 12px rgba(201,168,76,0.15)" : "0 4px 12px rgba(139,69,19,0.04)",
            }}
          >
            <div
              className="flex h-5 w-5 items-center justify-center rounded-full border-2"
              style={{
                borderColor: isQuick === true ? "#C9A84C" : "#ccc",
                background: isQuick === true ? "#C9A84C" : "transparent",
              }}
            >
              {isQuick === true && <Check className="h-3 w-3 text-white" />}
            </div>
            <div className="text-left">
              <div className="text-sm font-bold" style={{ color: isQuick === true ? "#C9A84C" : "#555" }}>Quick Mode ⚡</div>
              <div className="text-xs text-gray-500">Hemat waktu. Hanya menjawab soal inti, lewati soal tambahan.</div>
            </div>
          </button>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-white/95 backdrop-blur" style={{ borderColor: "#E8E0D5" }}>
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4 pb-safe">
          <div className="text-sm" style={{ color: "#555" }}><span className="font-semibold" style={{ color: "#1A1A1A" }}>{count}</span> kategori dipilih</div>
          <button disabled={count === 0 || isQuick === null} onClick={() => onNext(Array.from(selected), isQuick!)} className="inline-flex items-center gap-2 rounded-xl px-6 text-white transition disabled:cursor-not-allowed disabled:opacity-40 hover:brightness-110" style={{ background: "#2D6A4F", height: 48, fontWeight: 600 }}>
            Lanjut <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
