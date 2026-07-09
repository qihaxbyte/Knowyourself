import { Compass } from "lucide-react";

export default function Perjalanan({ onBack }: { onBack: () => void }) {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center p-6 text-center" style={{ background: "#FAF7F0", fontFamily: "Inter, sans-serif" }}>
      <div className="flex h-24 w-24 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 shadow-inner">
        <Compass className="h-10 w-10" />
      </div>
      <h1 className="mt-6 font-serif text-3xl font-bold text-gray-900">Perjalananmu</h1>
      <p className="mt-4 max-w-md text-sm leading-relaxed text-gray-600">
        Ini adalah rekam jejak perjalanan spiritual dan psikologismu. (Fitur ini sedang dalam pengembangan).
      </p>
      <button onClick={onBack} className="mt-8 rounded-full px-6 py-2 text-sm font-semibold text-white transition hover:brightness-110" style={{ background: "#2D6A4F" }}>
        Kembali ke Beranda
      </button>
    </div>
  );
}
