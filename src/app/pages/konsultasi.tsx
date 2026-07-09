import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Send, Sparkles, AlertCircle } from "lucide-react";
import { GUIDES, GUIDE_BG } from "../flow";
import { GuideSprite } from "../components/guide-sprite";
import type { AllResults } from "../scoring";
import { useAppStore } from "../store/useAppStore";

type Msg = { role: "user" | "guide"; text: string; ts: number };

const STARTERS = [
  "Aku merasa bingung dengan karirku 🌱",
  "Kenapa aku sulit dekat dengan orang? 💞",
  "Bagaimana cara mengelola stres? 🧘",
  "Apa kekuatan tersembunyiku?",
];

function buildResultSummary(results: AllResults): string {
  const lines: string[] = [];
  for (const [catId, r] of Object.entries(results)) {
    if (!r) continue;
    lines.push(`[${r.categoryId || catId}] ${r.code} — ${r.name}`);
    if (r.strengths?.length) lines.push(`  Kekuatan: ${r.strengths.join(", ")}`);
    if (r.weaknesses?.length) lines.push(`  Kelemahan: ${r.weaknesses.join(", ")}`);
    if (r.traits?.length) lines.push(`  Traits: ${r.traits.join(", ")}`);
    if (r.description) lines.push(`  Deskripsi: ${r.description}`);
  }
  return lines.join("\n") || "Belum ada hasil tes.";
}

async function callAI(guideId: string, result: string, history: Msg[]): Promise<string> {
  const url = `/api/chat`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      guideId,
      result,
      history: history.map((m) => ({ role: m.role === "guide" ? "model" : "user", text: m.text })),
    }),
  });
  const data = await res.json();
  if (!res.ok) {
    console.error("Chat API error:", data);
    throw new Error(data?.error || `HTTP ${res.status}`);
  }
  return data.reply as string;
}

export default function Konsultasi() {
  const navigate = useNavigate();
  const guideId = useAppStore(state => state.guide) || "vampire";
  const categoryResults = useAppStore(state => state.categoryResults);
  const onBack = () => navigate(-1);
  const guide = GUIDES.find(g => g.id === guideId)!;
  const resultSummary = buildResultSummary(categoryResults);
  const primaryCode = categoryResults?.kepribadian?.code || "—";
  const [messages, setMessages] = useState<Msg[]>([
    { role: "guide", text: `Halo... aku ${guide.name}. ✨\nAku sudah membaca hasilmu — ${primaryCode}. Ada hal yang ingin kamu bicarakan? Apapun, aku di sini.`, ts: Date.now() },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  const send = async (text: string) => {
    const clean = text.trim();
    if (!clean || typing) return;
    const nextHistory: Msg[] = [...messages, { role: "user", text: clean, ts: Date.now() }];
    setMessages(nextHistory);
    setInput("");
    setTyping(true);
    setError(null);
    try {
      const reply = await callAI(guideId, resultSummary, nextHistory);
      setMessages((m) => [...m, { role: "guide", text: reply, ts: Date.now() }]);
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      console.error("Failed to get reply from guide:", msg);
      setError(`Gagal menghubungi guide: ${msg}`);
    } finally {
      setTyping(false);
    }
  };

  return (
    <div className="flex h-[100dvh] w-full flex-col relative overflow-hidden" style={{
      backgroundImage: `linear-gradient(to bottom, rgba(250,247,240, 0.75), rgba(250,247,240, 0.95)), url('${GUIDE_BG[guide.id] || "/assets/bg/bg_hasil_1783273726443.png"}')`,
      backgroundSize: "cover", backgroundPosition: "center",
      fontFamily: "Inter, sans-serif"
    }}>
      {/* Decorative Sparkles */}
      {[...Array(8)].map((_, i) => (
        <span key={i} className="absolute rounded-full pointer-events-none" style={{
          width: 3 + (i % 3), height: 3 + (i % 3), background: guide.color,
          left: `${(i * 17) % 100}%`, top: `${(i * 23) % 100}%`,
          opacity: 0.3,
          animation: `sparkle ${2 + (i % 3)}s ease-in-out ${i * 0.5}s infinite`,
        }} />
      ))}

      <header className="flex items-center gap-3 border-b px-5 py-3 z-10 backdrop-blur-md shadow-sm" style={{ borderColor: "rgba(232,224,213,0.5)", background: "rgba(255,255,255,0.65)" }}>
        <button onClick={onBack} className="rounded-lg p-2 hover:bg-gray-100"><ArrowLeft className="h-5 w-5" /></button>
        <div className="flex h-12 w-12 items-center justify-center rounded-full" style={{ background: guide.color + "22" }}>
          <GuideSprite guideId={guide.id} size={44} withShadow={false} />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-bold">{guide.name}</span>
            <span className="text-xs" style={{ color: guide.color }}>{guide.title}</span>
          </div>
          <div className="flex items-center gap-1 text-xs" style={{ color: "#52B788" }}>
            <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" /> Online · Siap mendengarkan
          </div>
        </div>
        <div className="hidden items-center gap-1 rounded-full px-3 py-1 text-xs sm:flex" style={{ background: "#FFF8E1", color: "#B5850B" }}>
          <Sparkles className="h-3 w-3" /> AI Guide
        </div>
      </header>

      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-6">
        <div className="mx-auto max-w-2xl space-y-4">
          {messages.map((m, i) => (
            <div key={i} className={`flex gap-2 ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              {m.role === "guide" && (
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full" style={{ background: guide.color + "22" }}>
                  <GuideSprite guideId={guide.id} size={32} withShadow={false} />
                </div>
              )}
              <div className="max-w-[75%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm shadow-md" style={{
                background: m.role === "user" ? `linear-gradient(135deg, ${guide.color}, #1A1A1A)` : "rgba(255,255,255,0.95)",
                color: m.role === "user" ? "white" : "#1A1A1A",
                border: m.role === "guide" ? `1px solid ${guide.color}33` : "none",
                borderTopLeftRadius: m.role === "guide" ? 4 : undefined,
                borderTopRightRadius: m.role === "user" ? 4 : undefined,
                fontFamily: m.role === "guide" ? "'Crimson Text', serif" : undefined,
                fontSize: m.role === "guide" ? 17 : 14,
                lineHeight: 1.5,
              }}>
                {m.text}
              </div>
            </div>
          ))}
          {typing && (
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-full" style={{ background: guide.color + "22" }}>
                <GuideSprite guideId={guide.id} size={32} withShadow={false} />
              </div>
              <div className="flex gap-1 rounded-2xl rounded-tl-sm bg-white px-4 py-3 shadow-sm">
                {[0, 0.2, 0.4].map((d, i) => (
                  <span key={i} className="h-2 w-2 rounded-full" style={{ background: guide.color, animation: `bounce 1s ease-in-out ${d}s infinite` }} />
                ))}
              </div>
            </div>
          )}

          {error && (
            <div className="flex items-start gap-2 rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs text-rose-700">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {messages.length === 1 && (
            <div className="pt-4">
              <div className="mb-2 text-center text-xs uppercase tracking-widest" style={{ color: "#999" }}>Coba mulai dengan:</div>
              <div className="flex flex-wrap justify-center gap-2">
                {STARTERS.map(s => (
                  <button key={s} onClick={() => send(s)} className="rounded-full border bg-white px-4 py-2 text-sm transition hover:bg-gray-50" style={{ borderColor: guide.color + "55", color: guide.color }}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <footer className="border-t px-4 py-3 pb-8 z-10 backdrop-blur-md" style={{ borderColor: "rgba(232,224,213,0.5)", background: "rgba(255,255,255,0.65)" }}>
        <div className="mx-auto flex max-w-2xl items-end gap-2 relative">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(input); } }}
            placeholder={`Tanya apapun pada ${guide.name}...`}
            rows={1}
            className="max-h-32 flex-1 resize-none rounded-2xl border px-4 py-3.5 text-base outline-none transition focus:border-opacity-100 shadow-inner"
            style={{ borderColor: `${guide.color}55`, background: "rgba(255,255,255,0.85)" }}
          />
          <button
            onClick={() => send(input)}
            disabled={!input.trim() || typing}
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-white transition disabled:opacity-40 hover:brightness-110"
            style={{ background: guide.color }}
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
        <p className="mx-auto mt-2 max-w-2xl text-center text-[10px]" style={{ color: "#999" }}>
          ✦ Konsultasi ini bukan pengganti bantuan profesional. Jika kamu dalam krisis, hubungi layanan kesehatan mental terdekat.
        </p>
      </footer>

      <style>{`
        @keyframes bounce { 0%, 100% { transform: translateY(0); opacity: 0.5; } 50% { transform: translateY(-4px); opacity: 1; } }
        @keyframes sparkle { 0%,100% { opacity: 0.1; transform: scale(0.8); } 50% { opacity: 0.6; transform: scale(1.3); } }
      `}</style>
    </div>
  );
}
