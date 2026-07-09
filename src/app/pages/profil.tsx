import { useNavigate } from "react-router";
import { User, Shield, Info, LogOut, ChevronLeft } from "lucide-react";
import type { Gender } from "../flow";
import { getAvatarForMBTI } from "../scoring";
import { useAppStore } from "../store/useAppStore";

export default function Profil() {
  const navigate = useNavigate();
  const gender = useAppStore(state => state.gender);
  const categoryResults = useAppStore(state => state.categoryResults);
  const mbtiCode = categoryResults?.kepribadian?.code || null;
  const onBack = () => navigate(-1);
  const genderSprite = mbtiCode && gender ? getAvatarForMBTI(mbtiCode, gender)
    : gender === "male" ? "/assets/sprites/adventurer_male.png"
      : gender === "female" ? "/assets/sprites/adventurer_female.png"
        : "/assets/sprites/adventurer_spirit.png";

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
              <button className="flex w-full items-center gap-4 rounded-2xl bg-white/60 p-4 text-left text-sm font-bold text-gray-800 shadow-sm transition hover:bg-white hover:scale-[1.02] border border-[#E8E0D5]">
                <Shield className="h-5 w-5 text-[#2D6A4F]" /> Privasi & Data
              </button>
              <button className="flex w-full items-center gap-4 rounded-2xl bg-white/60 p-4 text-left text-sm font-bold text-gray-800 shadow-sm transition hover:bg-white hover:scale-[1.02] border border-[#E8E0D5]">
                <Info className="h-5 w-5 text-[#C9A84C]" /> Tentang Kami
              </button>
              <button onClick={onBack} className="flex w-full items-center gap-4 rounded-2xl bg-white/60 p-4 text-left text-sm font-bold text-red-600 shadow-sm transition hover:bg-red-50 hover:scale-[1.02] border border-[#E8E0D5]">
                <LogOut className="h-5 w-5 text-red-500" /> Keluar
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
