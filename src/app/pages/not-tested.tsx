import { Compass, Sparkles } from "lucide-react";
import { useNavigate } from "react-router";

export default function PreTestPrompt() {
  const navigate = useNavigate();
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center p-6 text-center" style={{ background: "#FAF7F0", fontFamily: "Inter, sans-serif" }}>
      <div className="relative flex h-32 w-32 items-center justify-center rounded-full bg-white shadow-lg" style={{ border: "4px solid #E8E0D5" }}>
        <div className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-amber-300 text-amber-800 shadow-sm">
          <Sparkles className="h-4 w-4" />
        </div>
        <Compass className="h-12 w-12 text-gray-400" />
      </div>
      
      <h1 className="mt-8 font-serif text-3xl font-bold text-gray-900">Perjalananmu Belum Dimulai</h1>
      <p className="mt-4 max-w-md text-sm leading-relaxed text-gray-600">
        Kenali dirimu lebih dalam melalui Kuis KnowYourself sebelum mengakses fitur ini. Temukan kekuatan, arah karir, dan profil psikologismu sekarang.
      </p>
      
      <button onClick={() => navigate("/pilih")} className="mt-8 inline-flex items-center gap-2 rounded-xl px-8 py-4 text-sm font-bold text-white shadow-lg transition hover:scale-105 hover:brightness-110" style={{ background: "linear-gradient(135deg, #2D6A4F, #C9A84C)" }}>
        <Sparkles className="h-4 w-4" /> Mulai Kuis Sekarang
      </button>
    </div>
  );
}
