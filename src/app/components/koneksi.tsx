import { useState } from "react";
import { Users, Heart, Crown, ArrowLeft } from "lucide-react";
import ShareCard from "./share-card";
import SoulResonance from "./soul-resonance";
import type { AllResults } from "../scoring";
import type { GuideMatch, Gender } from "../flow";

export default function Koneksi({ 
  categoryResults, 
  guideId,
  guideMatches,
  selectedCats, 
  gender,
  onBack,
  onTakeTest
}: { 
  categoryResults: AllResults; 
  guideId: string | null;
  guideMatches: GuideMatch[];
  selectedCats: string[]; 
  gender: Gender | null;
  onBack: () => void;
  onTakeTest: () => void;
}) {
  const [tab, setTab] = useState<"forge" | "resonance">(() => {
    if (typeof window !== "undefined" && new URLSearchParams(window.location.search).has("compare")) return "resonance";
    return "forge";
  });

  const hasTakenTest = Object.keys(categoryResults).length > 0 && guideId;

  if (!hasTakenTest) {
    return (
      <div className="flex min-h-screen w-full flex-col items-center justify-center p-6 text-center" style={{ background: "#FAF7F0", fontFamily: "Inter, sans-serif" }}>
        <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-white shadow-md">
          <Users className="h-10 w-10 text-gray-300" />
        </div>
        <h2 className="font-serif text-2xl font-bold text-gray-900">Belum Ada Profil</h2>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-gray-600">
          Kamu harus menyelesaikan perjalanan dan mengetahui Guide-mu terlebih dahulu sebelum bisa membagikan kartu atau mencari kecocokan dengan teman.
        </p>
        <button 
          onClick={onTakeTest}
          className="mt-8 rounded-full px-8 py-3.5 text-sm font-bold text-white transition hover:scale-105"
          style={{ background: "#C1121F", boxShadow: "0 4px 15px rgba(193, 18, 31, 0.3)" }}
        >
          Mulai Perjalanan
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full pb-24" style={{ background: "#FAF7F0", fontFamily: "Inter, sans-serif" }}>
      <header className="glass-panel sticky top-0 z-20 px-6 py-4 shadow-sm backdrop-blur-md" style={{ borderColor: "rgba(232, 224, 213, 0.5)", background: "rgba(255,255,255,0.85)" }}>
        <div className="mx-auto flex max-w-4xl items-center gap-4">
          <button onClick={onBack} className="rounded-xl p-2 hover:bg-gray-100">
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </button>
          <div className="flex-1">
            <h1 className="font-serif text-xl font-bold text-gray-900">Koneksi Sosial</h1>
            <p className="text-xs text-gray-500">Bagikan jati dirimu & temukan kecocokan</p>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-4 py-6">
        <div className="mb-8 flex overflow-hidden rounded-2xl bg-white p-1 shadow-sm" style={{ border: "1px solid #E8E0D5" }}>
          <button
            onClick={() => setTab("forge")}
            className={`flex flex-1 items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold transition-colors ${tab === "forge" ? "text-white shadow-sm" : "text-gray-500 hover:bg-gray-50"}`}
            style={{ background: tab === "forge" ? "#C1121F" : "transparent" }}
          >
            <Crown className="h-4 w-4" /> Soul Card
          </button>
          <button
            onClick={() => setTab("resonance")}
            className={`flex flex-1 items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold transition-colors ${tab === "resonance" ? "text-white shadow-sm" : "text-gray-500 hover:bg-gray-50"}`}
            style={{ background: tab === "resonance" ? "#B5850B" : "transparent" }}
          >
            <Heart className="h-4 w-4" /> Soul Resonance
          </button>
        </div>

        {tab === "forge" && (
          <div className="animate-fade-in">
            <ShareCard
              guideId={guideId!}
              bestGuideId={guideMatches?.[0]?.guideId || guideId!}
              categoryResults={categoryResults}
              selectedCats={selectedCats}
              gender={gender}
            />
          </div>
        )}

        {tab === "resonance" && (
          <div className="animate-fade-in">
            <SoulResonance 
              myResults={categoryResults} 
              guideId={guideId!} 
            />
          </div>
        )}
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.4s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
