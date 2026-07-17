import { useNavigate } from "react-router";
import { User, Shield, Info, LogOut, ChevronLeft } from "lucide-react";
import type { Gender } from "../flow";
import { getAvatarForMBTI } from "../scoring";
import { useAppStore } from "../store/useAppStore";
import { useState } from "react";

export default function Profil() {
  const navigate = useNavigate();
  const gender = useAppStore(state => state.gender);
  const categoryResults = useAppStore(state => state.categoryResults);
  const resetAll = useAppStore(state => state.resetAll);
  const mbtiCode = categoryResults?.kepribadian?.code || null;
  const onBack = () => navigate(-1);
  const genderSprite = mbtiCode && gender ? getAvatarForMBTI(mbtiCode, gender)
    : gender === "male" ? "/assets/sprites/adventurer_male.png"
      : gender === "female" ? "/assets/sprites/adventurer_female.png"
        : "/assets/sprites/adventurer_spirit.png";

  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showAbout, setShowAbout] = useState(false);

  return (
    <div className="flex min-h-screen w-full flex-col p-6 items-center justify-center" style={{
      backgroundImage: "linear-gradient(rgba(250,247,240, 0.7), rgba(250,247,240, 0.95)), url('/assets/bg/bg_mystic_forest.png')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundAttachment: "fixed",
      fontFamily: "Inter, sans-serif"
    }}>

      <div className="w-full max-w-sm relative">
        <button onClick={onBack} className="absolute -top-16 left-0 flex h-10 w-10 items-center justify-center rounded-full bg-white/40 text-gray-800 shadow-sm backdrop-blur transition hover:bg-white/70 hover:scale-105">
          <ChevronLeft className="h-5 w-5" />
        </button>

        {/* Profile Card */}
        <div className="relative overflow-hidden rounded-3xl p-[2px] shadow-2xl" style={{ background: "linear-gradient(135deg, #2D6A4F, #C9A84C)" }}>
          <div className="relative flex flex-col items-center justify-center rounded-[22px] p-8 text-center transition-all" style={{ background: "#FAF7F0" }}>

            {/* Avatar */}
            <div className="relative flex h-32 w-32 items-center justify-center rounded-full bg-amber-50 shadow-inner overflow-hidden border-4 border-white">
              {gender ? (
                <img src={genderSprite} alt="Avatar" className="h-28 w-28 object-contain animate-idle-bob" style={{ imageRendering: "pixelated" }} />
              ) : (
                <User className="h-12 w-12 text-gray-400" />
              )}
            </div>

            <h1 className="mt-6 font-serif text-3xl font-bold text-gray-900">Penjelajah</h1>
            <p className="mt-1 text-xs font-bold uppercase tracking-widest text-amber-700">ID: KY-2026-X9A4</p>

            <div className="mt-8 w-full space-y-3">
              <button onClick={() => setShowPrivacy(true)} className="flex w-full items-center gap-4 rounded-2xl bg-white/60 p-4 text-left text-sm font-bold text-gray-800 shadow-sm transition hover:bg-white hover:scale-[1.02] border border-[#E8E0D5]">
                <Shield className="h-5 w-5 text-[#2D6A4F]" /> Privasi & Data
              </button>
              <button onClick={() => setShowAbout(true)} className="flex w-full items-center gap-4 rounded-2xl bg-white/60 p-4 text-left text-sm font-bold text-gray-800 shadow-sm transition hover:bg-white hover:scale-[1.02] border border-[#E8E0D5]">
                <Info className="h-5 w-5 text-[#C9A84C]" /> Tentang Kami
              </button>
              <button onClick={() => { resetAll(); navigate("/landing"); }} className="flex w-full items-center gap-4 rounded-2xl bg-white/60 p-4 text-left text-sm font-bold text-red-600 shadow-sm transition hover:bg-red-50 hover:scale-[1.02] border border-[#E8E0D5]">
                <LogOut className="h-5 w-5 text-red-500" /> Reset & Keluar
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Privacy Modal */}
      {showPrivacy && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 p-6 backdrop-blur-md" style={{ zIndex: 9999 }} onClick={() => setShowPrivacy(false)}>
          <div className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl animate-slide-up-fade" onClick={(e) => e.stopPropagation()}>
            <div className="p-8">
              <div className="flex items-center justify-between border-b pb-4">
                <h2 className="font-serif text-xl font-bold text-gray-900">Privasi & Data</h2>
                <button onClick={() => setShowPrivacy(false)} className="rounded-full bg-gray-100 p-2 text-gray-600 hover:bg-gray-200">✕</button>
              </div>
              <div className="mt-4 space-y-3 text-sm leading-relaxed text-gray-600">
                <p><strong>Semua data tersimpan lokal di perangkatmu.</strong></p>
                <p>Jawaban tes, hasil, dan preferensi disimpan di browser (localStorage). Kami tidak mengirim data pribadimu ke server manapun.</p>
                <p>Fitur AI Chat menggunakan API pihak ketiga, tapi percakapanmu tidak disimpan secara permanen.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* About Modal */}
      {showAbout && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 p-6 backdrop-blur-md" style={{ zIndex: 9999 }} onClick={() => setShowAbout(false)}>
          <div className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl animate-slide-up-fade" onClick={(e) => e.stopPropagation()}>
            <div className="p-8">
              <div className="flex items-center justify-between border-b pb-4">
                <h2 className="font-serif text-xl font-bold text-gray-900">Tentang KnowYourself</h2>
                <button onClick={() => setShowAbout(false)} className="rounded-full bg-gray-100 p-2 text-gray-600 hover:bg-gray-200">✕</button>
              </div>
              <div className="mt-4 space-y-3 text-sm leading-relaxed text-gray-600">
                <p><strong>KnowYourself</strong> adalah platform penemuan jati diri interaktif yang menggabungkan psikometri modern dengan estetika naratif spirit guide.</p>
                <p>Didukung oleh teori psikologi: MBTI, Big Five, Holland RIASEC, Klontz Money Scripts, VARK, ECR-S, PSS-10, dan Schwartz Values.</p>
                <div className="mt-4 rounded-2xl bg-amber-50 p-4 text-center">
                  <p className="font-bold text-amber-900">Technology for Society Project</p>
                  <p className="mt-1 text-amber-700">Lumora Studio — ITEBA 2026</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

