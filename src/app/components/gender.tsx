import { useState } from "react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Gender } from "../flow";

const OPTS: { id: Gender; name: string; pronoun: string; sprite: string; bg: string }[] = [
  { id: "male", name: "Laki-laki", pronoun: "He/Him", sprite: "/assets/sprites/adventurer_male.png", bg: "#E0F4FF" },
  { id: "female", name: "Perempuan", pronoun: "She/Her", sprite: "/assets/sprites/adventurer_female.png", bg: "#FFE5E5" },
  { id: "spirit", name: "Spirit", pronoun: "Prefer not to say", sprite: "/assets/sprites/adventurer_spirit.png", bg: "#EDE7F6" },
];

export default function GenderScreen({ onBack, onNext, initial }: { onBack: () => void; onNext: (g: Gender) => void; initial: Gender | null }) {
  const [sel, setSel] = useState<Gender | null>(initial);
  return (
    <div className="min-h-screen w-full pb-32" style={{ 
      backgroundImage: "linear-gradient(rgba(250,247,240, 0.65), rgba(250,247,240, 0.8)), url('/assets/bg/bg_pilih_area_night_1783274214753.png')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundAttachment: "fixed",
      fontFamily: "Inter, sans-serif" 
    }}>
      <div className="mx-auto max-w-2xl px-6 pt-8">
        <button onClick={onBack} className="flex items-center gap-2 text-sm" style={{ color: "#555" }}><ArrowLeft className="h-4 w-4" /> Kembali</button>
        <div className="mt-6 text-center">
          <h1 style={{ fontFamily: "'Crimson Text', serif", fontSize: 32, fontWeight: 700 }}>Siapa kamu?</h1>
          <p className="mt-2 text-sm" style={{ color: "#555" }}>Pilih gender atau identitas dirimu</p>
          <div className="mt-4 flex justify-center gap-2">
            {[0,1,2,3,4].map(i => <div key={i} className="h-2 w-2 rounded-full" style={{ background: i <= 1 ? "#2D6A4F" : "#E8E0D5" }} />)}
          </div>
          <p className="mt-2 text-xs uppercase tracking-widest" style={{ color: "#999" }}>Langkah 2 dari 5</p>
        </div>

        <p className="mx-auto mt-8 max-w-sm text-center text-sm" style={{ color: "#555" }}>
          Ini membantu kami menyesuaikan avatar dan cara penyampaian hasil untukmu.
        </p>

        <div className="mt-8 space-y-3">
          {OPTS.map(o => {
            const isSel = sel === o.id;
            return (
              <button key={o.id} onClick={() => setSel(o.id)} className="flex w-full items-center gap-4 rounded-xl p-4 text-left transition" style={{
                background: isSel ? "#D8F3DC" : "#FFFFFF",
                border: `${isSel ? 2 : 1}px solid ${isSel ? "#2D6A4F" : "#E8E0D5"}`,
              }}>
                <div className={`flex h-20 w-20 items-center justify-center rounded-full overflow-hidden ${isSel ? 'animate-idle-bob' : ''}`} style={{ background: o.bg }}>
                  <img src={o.sprite} alt={o.name} className="h-16 w-16 object-contain" style={{ imageRendering: "pixelated" }} />
                </div>
                <div className="flex-1">
                  <div style={{ fontSize: 18, fontWeight: 700 }}>{o.name}</div>
                  <div className="text-sm" style={{ color: "#999" }}>{o.pronoun}</div>
                </div>
                {isSel && <div className="flex h-7 w-7 items-center justify-center rounded-full" style={{ background: "#2D6A4F" }}><Check className="h-4 w-4 text-white" /></div>}
              </button>
            );
          })}
        </div>

        <p className="mt-6 text-center text-xs" style={{ color: "#2D6A4F" }}>✦ Pilihan ini tidak mempengaruhi hasil tes psikologimu</p>
      </div>

      <div className="fixed bottom-0 left-0 right-0 border-t bg-white/95 backdrop-blur" style={{ borderColor: "#E8E0D5" }}>
        <div className="mx-auto flex max-w-2xl items-center justify-end px-6 py-4">
          <button disabled={!sel} onClick={() => sel && onNext(sel)} className="inline-flex items-center gap-2 rounded-xl px-6 text-white transition disabled:opacity-40 hover:brightness-110" style={{ background: "#2D6A4F", height: 48, fontWeight: 600 }}>
            Lanjut <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

