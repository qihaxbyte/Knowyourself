import { useState, useEffect } from "react";
import { ArrowLeft, Copy, Check, Heart, Zap, AlertTriangle, Lightbulb, Share2, Sparkles } from "lucide-react";
import { CATEGORIES, GUIDES } from "../flow";
import { GuideSprite } from "./guide-sprite";
import type { AllResults } from "../scoring";
import { encodeResults, decodeResults, computeChemistry, type ChemistryResult } from "../resonance";

export default function SoulResonance({ myResults, guideId }: { myResults: AllResults; guideId: string }) {
  const [friendCode, setFriendCode] = useState("");
  const [friendResults, setFriendResults] = useState<AllResults | null>(null);
  const [chemistry, setChemistry] = useState<ChemistryResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  // Check URL for compare parameter on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const compareCode = params.get("compare");
    if (compareCode) {
      setFriendCode(compareCode);
      handleDecode(compareCode);
    }
  }, []);

  const myCode = encodeResults(myResults);
  const shareUrl = `${window.location.origin}${window.location.pathname}?compare=${myCode}#perjalanan`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const input = document.createElement("input");
      input.value = shareUrl;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDecode = (code?: string) => {
    const input = code || friendCode;
    if (!input.trim()) { setError("Masukkan kode dari temanmu"); return; }
    const decoded = decodeResults(input.trim());
    if (!decoded) { setError("Kode tidak valid. Minta temanmu kirim ulang."); return; }
    setError("");
    setFriendResults(decoded);
    setChemistry(computeChemistry(myResults, decoded));
  };

  const guide = GUIDES.find(g => g.id === guideId);

  return (
    <div className="w-full pb-32 font-sans">
      <div className="mx-auto max-w-3xl pt-2">

        {/* Header */}
        <div className="mt-2 text-center">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold" style={{ background: "#FFE5E5", color: "#C1121F", border: "1px solid #C1121F33" }}>
            <Heart className="h-3 w-3" /> Soul Resonance
          </div>
          <h1 className="mt-4" style={{ fontFamily: "'Crimson Text', serif", fontSize: 32, fontWeight: 700 }}>
            Cek Chemistry-mu dengan Teman
          </h1>
          <p className="mt-2 text-sm" style={{ color: "#777" }}>
            Bandingkan hasil tesmu dengan temanmu dan temukan seberapa besar resonansi jiwa kalian
          </p>
        </div>

        {/* Step 1: Share your code */}
        <div className="mt-6 rounded-2xl bg-white p-6 shadow-sm" style={{ border: "1px solid #E8E0D5" }}>
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white" style={{ background: "#C1121F" }}>1</div>
            <h2 className="text-lg font-bold">Kirim Linkmu ke Teman</h2>
          </div>
          <p className="mt-2 text-sm" style={{ color: "#777" }}>Bagikan link ini ke teman yang sudah pernah mengerjakan tes KnowYourself</p>

          <div className="mt-4 flex gap-2">
            <div className="flex-1 overflow-hidden rounded-lg border p-3 text-xs break-all" style={{ borderColor: "#E8E0D5", background: "#FAF7F0", color: "#888" }}>
              {shareUrl.length > 80 ? shareUrl.slice(0, 80) + "..." : shareUrl}
            </div>
            <button onClick={handleCopy} className="flex shrink-0 items-center gap-2 rounded-lg px-4 py-3 text-sm font-bold text-white transition hover:brightness-110" style={{ background: copied ? "#2D6A4F" : "#C1121F" }}>
              {copied ? <><Check className="h-4 w-4" /> Tersalin!</> : <><Copy className="h-4 w-4" /> Salin</>}
            </button>
          </div>

          {/* Share buttons */}
          <div className="mt-3 flex gap-2">
            <a href={`https://wa.me/?text=${encodeURIComponent(`Cek chemistry kita di KnowYourself! 💫\n${shareUrl}`)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-semibold transition hover:bg-gray-50" style={{ borderColor: "#25D366", color: "#25D366" }}>
              💬 WhatsApp
            </a>
            <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`Cek chemistry kita di KnowYourself! 💫 ${shareUrl}`)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-semibold transition hover:bg-gray-50" style={{ borderColor: "#1DA1F2", color: "#1DA1F2" }}>
              🐦 Twitter
            </a>
          </div>
        </div>

        {/* Step 2: Paste friend's code */}
        <div className="mt-6 rounded-2xl bg-white p-6 shadow-sm" style={{ border: "1px solid #E8E0D5" }}>
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white" style={{ background: "#C1121F" }}>2</div>
            <h2 className="text-lg font-bold">Tempel Kode Teman</h2>
          </div>
          <p className="mt-2 text-sm" style={{ color: "#777" }}>Minta temanmu mengirim kode mereka, lalu tempel di sini</p>

          <div className="mt-4 flex gap-2">
            <input
              type="text"
              value={friendCode}
              onChange={(e) => { setFriendCode(e.target.value); setError(""); }}
              placeholder="Tempel kode teman di sini..."
              className="flex-1 rounded-lg border px-4 py-3 text-sm outline-none transition focus:border-[#C1121F]"
              style={{ borderColor: error ? "#C1121F" : "#E8E0D5" }}
            />
            <button onClick={() => handleDecode()} className="flex shrink-0 items-center gap-2 rounded-lg px-4 py-3 text-sm font-bold text-white transition hover:brightness-110" style={{ background: "#C1121F" }}>
              <Sparkles className="h-4 w-4" /> Bandingkan!
            </button>
          </div>
          {error && <p className="mt-2 text-xs text-red-500">{error}</p>}
        </div>

        {/* Results */}
        {chemistry && friendResults && (
          <div className="mt-8 space-y-6 animate-slide-up-fade">
            {/* Chemistry Score Hero */}
            <div className="relative overflow-hidden rounded-2xl p-8 text-center text-white" style={{
              background: "linear-gradient(135deg, #C1121F, #6B4C9A, #2D6A4F)",
            }}>
              {[...Array(15)].map((_, i) => (
                <span key={i} className="absolute rounded-full" style={{
                  width: 3, height: 3, background: "rgba(255,255,255,0.3)",
                  left: `${(i * 23) % 100}%`, top: `${(i * 37) % 100}%`,
                  animation: `sparkle ${1 + (i % 3)}s ease-in-out ${i * 0.2}s infinite`,
                }} />
              ))}

              <div className="relative z-10">
                <div className="text-xs font-bold uppercase tracking-widest" style={{ color: "#FFD27A" }}>Soul Resonance Score</div>
                <div className="mt-4 text-7xl font-black" style={{ fontFamily: "'Press Start 2P', monospace", textShadow: "0 0 30px rgba(255,255,255,0.3)" }}>
                  {chemistry.overallScore}%
                </div>
                <div className="mt-2 text-lg italic" style={{ fontFamily: "'Crimson Text', serif" }}>
                  {chemistry.overallScore >= 80 ? "Jiwa kalian sangat beresonansi! ✨"
                    : chemistry.overallScore >= 60 ? "Kalian punya koneksi yang menarik! 💫"
                    : "Perbedaan kalian bisa memperkuat ikatan 🌱"}
                </div>

                {/* Dual character */}
                <div className="mt-6 flex items-center justify-center gap-6">
                  <div className="text-center">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full" style={{ background: "rgba(255,255,255,0.15)" }}>
                      {guide && <GuideSprite guideId={guide.id} size={48} animate={false} />}
                    </div>
                    <div className="mt-1 text-[10px] font-bold">Kamu</div>
                    <div className="text-xs font-bold" style={{ color: "#FFD27A" }}>{myResults.kepribadian?.code || "—"}</div>
                  </div>
                  <div className="text-3xl">💞</div>
                  <div className="text-center">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full text-2xl" style={{ background: "rgba(255,255,255,0.15)" }}>
                      👤
                    </div>
                    <div className="mt-1 text-[10px] font-bold">Teman</div>
                    <div className="text-xs font-bold" style={{ color: "#FFD27A" }}>{friendResults.kepribadian?.code || "—"}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Per Category Breakdown */}
            <div className="rounded-2xl bg-white p-6 shadow-sm overflow-hidden" style={{ border: "1px solid #E8E0D5" }}>
              <h3 className="text-sm font-bold uppercase tracking-wider" style={{ color: "#999" }}>Breakdown per Kategori</h3>
              <div className="mt-4 space-y-3 overflow-x-auto pb-2 scrollbar-hide">
                <div className="min-w-[320px] space-y-3">
                {chemistry.perCategory.map(pc => {
                  const cat = CATEGORIES.find(c => c.id === pc.catId);
                  return (
                    <div key={pc.catId} className="flex items-center gap-3">
                      <div className="w-24 text-xs font-semibold" style={{ color: cat?.color || "#555" }}>{pc.catName}</div>
                      <div className="relative h-3 flex-1 overflow-hidden rounded-full" style={{ background: "#E8E0D5" }}>
                        <div className="absolute inset-y-0 left-0 rounded-full transition-all duration-1000" style={{
                          width: `${pc.score}%`,
                          background: cat?.color || "#2D6A4F",
                        }} />
                      </div>
                      <div className="w-10 text-right text-xs font-bold" style={{ color: cat?.color || "#555" }}>{pc.score}%</div>
                      <div className="w-28 truncate text-[10px]" style={{ color: "#999" }}>{pc.note}</div>
                    </div>
                  );
                })}
                </div>
              </div>
            </div>

            {/* Shared */}
            {chemistry.shared.length > 0 && (
              <div className="rounded-2xl p-5" style={{ background: "#D8F3DC", border: "1px solid #2D6A4F33" }}>
                <div className="flex items-center gap-2 text-sm font-bold" style={{ color: "#2D6A4F" }}>
                  <Heart className="h-4 w-4" /> Yang Kalian Bagikan
                </div>
                <ul className="mt-3 space-y-2">
                  {chemistry.shared.map((s, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <span className="mt-0.5 text-emerald-500">✦</span> {s}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Complement */}
            {chemistry.complement.length > 0 && (
              <div className="rounded-2xl p-5" style={{ background: "#E0F4FF", border: "1px solid #0077B633" }}>
                <div className="flex items-center gap-2 text-sm font-bold" style={{ color: "#0077B6" }}>
                  <Zap className="h-4 w-4" /> Yang Saling Melengkapi
                </div>
                <ul className="mt-3 space-y-2">
                  {chemistry.complement.map((s, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <span className="mt-0.5 text-blue-500">⚡</span> {s}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tension */}
            {chemistry.tension.length > 0 && (
              <div className="rounded-2xl p-5" style={{ background: "#FFF3CD", border: "1px solid #B5850B33" }}>
                <div className="flex items-center gap-2 text-sm font-bold" style={{ color: "#B5850B" }}>
                  <AlertTriangle className="h-4 w-4" /> Potensi Konflik
                </div>
                <ul className="mt-3 space-y-2">
                  {chemistry.tension.map((s, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <span className="mt-0.5 text-amber-500">⚠</span> {s}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Advice */}
            <div className="rounded-2xl p-6 text-white" style={{ background: "linear-gradient(135deg, #6B4C9A, #C1121F)" }}>
              <div className="flex items-center gap-2 text-sm font-bold" style={{ color: "#FFD27A" }}>
                <Lightbulb className="h-4 w-4" /> Saran untuk Mempererat Hubungan
              </div>
              <ul className="mt-4 space-y-3">
                {chemistry.advice.map((a, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold" style={{ background: "rgba(255,255,255,0.2)" }}>{i + 1}</span>
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes sparkle { 0%,100% { opacity: 0.2; transform: scale(0.8); } 50% { opacity: 1; transform: scale(1.2); } }
      `}</style>
    </div>
  );
}
