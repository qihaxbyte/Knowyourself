import { useState, useRef, useEffect } from "react";
import { ArrowLeft, ArrowRight, Heart, GripVertical } from "lucide-react";
import { GUIDES, CATEGORIES, GUIDE_BG, type QuizQ, type AnswerEntry } from "../flow";
import { getQuestionsForCategories } from "../questions";
import { getGuideDialogue } from "../dialogues";
import { GuideSprite } from "./guide-sprite";

// High-performance slider component to prevent parent re-renders during drag
function ScaleSlider({
  value,
  onChange,
  categoryColor
}: {
  value: number;
  onChange: (val: number) => void;
  categoryColor: string;
}) {
  const [localVal, setLocalVal] = useState<number>(value);
  const onChangeRef = useRef(onChange);

  // Keep ref updated
  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  // Sync from parent if needed (e.g. going back/forward)
  useEffect(() => {
    setLocalVal(value);
  }, [value]);

  // Debounce parent update to prevent lag during active drag
  useEffect(() => {
    const timer = setTimeout(() => {
      onChangeRef.current(localVal);
    }, 150);
    return () => clearTimeout(timer);
  }, [localVal]);

  return (
    <div className="relative flex items-center h-10 w-full group">
      <input
        type="range"
        min={1}
        max={10}
        step={0.01}
        value={localVal}
        onChange={(e) => setLocalVal(parseFloat(e.target.value))}
        className="absolute inset-0 w-full h-full opacity-0 z-20 cursor-pointer"
      />

      <div className="w-full h-1.5 rounded-full bg-gray-200 shadow-inner overflow-hidden relative z-0 border border-black/5">
        <div
          className="h-full"
          style={{
            width: `${(((localVal) - 1) / 9) * 100}%`,
            background: categoryColor
          }}
        />
      </div>

      <div
        className="absolute z-10 flex items-center justify-center pointer-events-none group-active:scale-110 transition-transform duration-75"
        style={{
          left: `calc(${(((localVal) - 1) / 9) * 100}% - 14px)`,
          width: 28,
          height: 28,
        }}
      >
        <span
          className="pixel-font text-2xl leading-none"
          style={{
            color: categoryColor,
            textShadow: "-1px -1px 0 #FFF, 1px -1px 0 #FFF, -1px 1px 0 #FFF, 1px 1px 0 #FFF, 0px 2px 4px rgba(0,0,0,0.5)"
          }}
        >
          ✦
        </span>
      </div>
    </div>
  );
}

const FREQ_LABELS = ["Tidak pernah", "Jarang", "Kadang-kadang", "Cukup sering", "Sangat sering"];

export default function Quiz({
  guideId,
  selectedCats,
  isQuick,
  onBack,
  onDone,
}: {
  guideId: string;
  selectedCats: string[];
  isQuick: boolean;
  onBack: () => void;
  onDone: (answers: AnswerEntry[]) => void;
}) {
  const guide = GUIDES.find((g) => g.id === guideId)!;
  const questions = useRef(getQuestionsForCategories(selectedCats, isQuick)).current;
  const total = questions.length;
  const [idx, setIdx] = useState(0);
  const q = questions[idx];

  // Current category info
  const currentCat = CATEGORIES.find((c) => c.id === q.cat);
  const categoryColor = currentCat?.color || "#2D6A4F";

  // Saved answers for all questions
  const savedAnswers = useRef<(AnswerEntry | null)[]>(
    new Array(total).fill(null)
  );

  // ── Per-question state ──
  const [mcSel, setMcSel] = useState<number | null>(null);
  const [scaleVals, setScaleVals] = useState<number[]>([]);
  const [scaleTouched, setScaleTouched] = useState<boolean[]>([]);
  const [forcedSel, setForcedSel] = useState<"a" | "b" | null>(null);
  const [rankOrder, setRankOrder] = useState<string[]>([]);
  const [essay, setEssay] = useState("");
  const [freqVals, setFreqVals] = useState<number[]>([]);

  // Load saved answer or reset for a question index
  const loadQuestion = (i: number) => {
    const saved = savedAnswers.current[i];
    const nextQ = questions[i];
    if (saved) {
      setMcSel(saved.mcSel ?? null);
      setScaleVals(saved.scaleVals ?? []);
      setScaleTouched(
        saved.scaleVals ? saved.scaleVals.map(() => true) : []
      );
      setForcedSel(saved.forcedSel ?? null);
      setRankOrder(saved.rankOrder ?? []);
      setEssay(saved.essay ?? "");
      setFreqVals(saved.freqVals ?? []);
    } else {
      setMcSel(null);
      setForcedSel(null);
      setEssay("");
      if (nextQ.type === "scale") {
        setScaleVals(nextQ.statements.map(() => 5));
        setScaleTouched(nextQ.statements.map(() => true));
      } else {
        setScaleVals([]);
        setScaleTouched([]);
      }
      if (nextQ.type === "rank") setRankOrder([...nextQ.items]);
      else setRankOrder([]);
      if (nextQ.type === "frequency") {
        setFreqVals(nextQ.statements.map(() => -1));
      } else {
        setFreqVals([]);
      }
    }
  };

  // Init first question
  useEffect(() => {
    loadQuestion(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const saveCurrentAnswer = () => {
    const entry: AnswerEntry = { type: q.type, cat: q.cat };
    if (q.type === "mc") entry.mcSel = mcSel ?? undefined;
    if (q.type === "scale") entry.scaleVals = [...scaleVals];
    if (q.type === "forced") entry.forcedSel = forcedSel ?? undefined;
    if (q.type === "rank") entry.rankOrder = [...rankOrder];
    if (q.type === "essay") entry.essay = essay;
    if (q.type === "frequency") entry.freqVals = [...freqVals];
    savedAnswers.current[idx] = entry;
  };

  const canNext = (() => {
    if (q.type === "mc") return mcSel !== null;
    if (q.type === "scale") return scaleTouched.every(Boolean);
    if (q.type === "forced") return forcedSel !== null;
    if (q.type === "rank") return true;
    if (q.type === "essay") return true; // Optional, so always true
    if (q.type === "frequency") return freqVals.every((v) => v >= 0);
    return false;
  })();

  const goNext = () => {
    saveCurrentAnswer();
    if (idx + 1 >= total) {
      onDone(savedAnswers.current.filter(Boolean) as AnswerEntry[]);
      return;
    }
    loadQuestion(idx + 1);
    setIdx(idx + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goPrev = () => {
    if (idx === 0) {
      onBack();
      return;
    }
    saveCurrentAnswer();
    loadQuestion(idx - 1);
    setIdx(idx - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const moveRank = (from: number, to: number) => {
    if (to < 0 || to >= rankOrder.length) return;
    const next = [...rankOrder];
    [next[from], next[to]] = [next[to], next[from]];
    setRankOrder(next);
  };

  const hearts = 3 - Math.floor((idx / total) * 3);

  return (
    <div
      className="relative min-h-screen w-full"
      style={{
        backgroundImage: `linear-gradient(180deg, ${categoryColor}aa 0%, #2D6A4Fbb 40%, #FAF7F0cc 80%), url('${GUIDE_BG[guideId] || '/assets/bg/bg_quiz_1783273716799.png'}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        fontFamily: "Inter, sans-serif",
      }}
    >
      {/* ── Header ── */}
      <div className="relative z-10 mx-auto max-w-2xl px-6 pt-safe pb-4 text-white">
        <div className="flex items-center justify-between">
          <button
            onClick={goPrev}
            className="flex items-center gap-2 rounded-full bg-black/20 px-3 py-1.5 text-sm backdrop-blur transition hover:bg-black/30"
          >
            <ArrowLeft className="h-4 w-4" /> Kembali
          </button>
          <div
            className="text-xs uppercase tracking-widest"
            style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: 10,
            }}
          >
            {currentCat?.name || "Quiz"}
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between text-xs">
          <span>
            {idx + 1} / {total}
          </span>
          <div className="relative mx-3 h-2 flex-1 overflow-hidden rounded-full bg-black/20 shadow-inner">
            <div
              className="absolute inset-y-0 left-0 rounded-full transition-all duration-700 ease-out shadow-[0_0_10px_rgba(255,255,255,0.5)]"
              style={{
                width: `${((idx + 1) / total) * 100}%`,
                background: "linear-gradient(90deg, rgba(255,255,255,0.8), #ffffff)",
              }}
            />
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2">
          <div
            className="flex shrink-0 items-center justify-center rounded-full shadow"
            style={{ background: guide.color + "44", width: 44, height: 44 }}
          >
            <GuideSprite guideId={guide.id} size={50} animate={false} />
          </div>
          <div
            key={idx} // Force animation re-run on index change
            className="animate-fade-in-up rounded-2xl rounded-tl-none bg-white/95 px-3 py-2 text-xs leading-relaxed shadow-sm"
            style={{ color: "#1A1A1A", border: `1px solid ${guide.color}33` }}
          >
            {getGuideDialogue(guideId, currentCat?.id || "", idx, total)}
          </div>
        </div>
      </div>

      {/* ── Question Card ── */}
      <div key={idx} className="relative z-10 mx-auto mt-6 max-w-2xl rounded-t-3xl bg-white px-6 pb-32 pt-6 shadow-[0_-8px_40px_rgba(0,0,0,0.1)] animate-swipe-in-right">
        {/* ── MC ── */}
        {q.type === "mc" && (
          <>
            <h2
              style={{
                fontFamily: "'Crimson Text', serif",
                fontSize: 22,
                fontWeight: 700,
              }}
            >
              {q.q}
            </h2>
            <div className="mt-5 space-y-3">
              {q.options.map((opt, i) => {
                const letter = String.fromCharCode(65 + i);
                const isSel = mcSel === i;
                return (
                  <button
                    key={i}
                    onClick={() => setMcSel(i)}
                    className={`neumorphic-btn group flex w-full items-center gap-3 rounded-2xl p-4 text-left ${isSel ? "animate-pulse-glow" : ""}`}
                    style={{
                      background: isSel ? categoryColor + "1A" : "#FFFFFF",
                      border: `${isSel ? 2 : 1}px solid ${isSel ? categoryColor : "#E8E0D5"
                        }`,
                    }}
                  >
                    <div
                      className="flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold"
                      style={{
                        background: isSel
                          ? categoryColor
                          : categoryColor + "22",
                        color: isSel ? "white" : categoryColor,
                      }}
                    >
                      {letter}
                    </div>
                    <span className="text-sm">{opt}</span>
                  </button>
                );
              })}
            </div>
            <p
              className="mt-4 text-center text-xs italic"
              style={{ color: "#999" }}
            >
              Pilih yang paling mencerminkan dirimu.
            </p>
          </>
        )}

        {/* ── SCALE (batch) ── */}
        {q.type === "scale" && (
          <>

            <h2
              style={{
                fontFamily: "'Crimson Text', serif",
                fontSize: 22,
                fontWeight: 700,
              }}
            >
              {q.title || "Rate seberapa kamu setuju:"}
            </h2>
            <div className="mt-5 space-y-6">
              {q.statements.map((s, i) => (
                <div
                  key={i}
                  className="border-b pb-4"
                  style={{ borderColor: "#E8E0D5" }}
                >
                  <div className="text-sm">{s}</div>
                  <div className="mt-4">
                    <ScaleSlider
                      value={scaleVals[i] ?? 5}
                      categoryColor={categoryColor}
                      onChange={(val) => {
                        const next = [...scaleVals];
                        next[i] = val;
                        setScaleVals(next);
                        const t = [...scaleTouched];
                        t[i] = true;
                        setScaleTouched(t);
                      }}
                    />
                    <div className="flex items-start justify-between mt-1 px-1">
                      <span className="text-[11px] font-medium leading-tight w-20 text-left" style={{ color: "#999" }}>
                        Sangat tidak setuju
                      </span>
                      <span
                        className="text-sm font-bold mt-1"
                        style={{ color: categoryColor, opacity: scaleTouched[i] ? 1 : 0.4 }}
                      >
                        {Math.round(scaleVals[i] ?? 5)}
                      </span>
                      <span className="text-[11px] font-medium leading-tight w-20 text-right" style={{ color: "#999" }}>
                        Sangat setuju
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ── FREQUENCY (PSS-10) ── */}
        {q.type === "frequency" && (
          <>
            <h2
              style={{
                fontFamily: "'Crimson Text', serif",
                fontSize: 22,
                fontWeight: 700,
              }}
            >
              {q.title || "Seberapa sering kamu mengalami hal berikut?"}
            </h2>
            <p className="mt-1 text-xs" style={{ color: "#999" }}>
              Pilih frekuensi yang paling sesuai untuk setiap pernyataan
            </p>
            <div className="mt-5 space-y-4">
              {q.statements.map((s, i) => (
                <div
                  key={i}
                  className="rounded-xl border p-4"
                  style={{
                    borderColor:
                      freqVals[i] >= 0 ? categoryColor + "55" : "#E8E0D5",
                    background:
                      freqVals[i] >= 0 ? categoryColor + "08" : "#fff",
                  }}
                >
                  <div className="text-sm font-medium">{s}</div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {FREQ_LABELS.map((label, fi) => {
                      const isSel = freqVals[i] === fi;
                      return (
                        <button
                          key={fi}
                          onClick={() => {
                            const next = [...freqVals];
                            next[i] = fi;
                            setFreqVals(next);
                          }}
                          className="rounded-full px-3 py-1.5 text-xs transition"
                          style={{
                            background: isSel
                              ? categoryColor
                              : "#F5F0E8",
                            color: isSel ? "white" : "#555",
                            fontWeight: isSel ? 600 : 400,
                            border: `1px solid ${isSel ? categoryColor : "#E8E0D5"
                              }`,
                          }}
                        >
                          {label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ── FORCED CHOICE ── */}
        {q.type === "forced" && (
          <>
            <h2
              className="text-center"
              style={{
                fontFamily: "'Crimson Text', serif",
                fontSize: 22,
                fontWeight: 700,
              }}
            >
              {q.q}
            </h2>
            <div className="mt-6 flex items-stretch gap-3">
              {[
                { key: "a" as const, text: q.a, icon: "/assets/icons/pixel_target_v4.png" },
                { key: "b" as const, text: q.b, icon: "/assets/icons/pixel_star_v4.png" },
              ].map((c) => {
                const isSel = forcedSel === c.key;
                const dim = forcedSel && !isSel;
                return (
                  <button
                    key={c.key}
                    onClick={() => setForcedSel(c.key)}
                    className="flex flex-1 flex-col items-center justify-center gap-3 rounded-xl p-5 text-center transition"
                    style={{
                      background: isSel
                        ? categoryColor + "22"
                        : "#FFFFFF",
                      border: `${isSel ? 2 : 1}px solid ${isSel ? categoryColor : "#E8E0D5"
                        }`,
                      transform: isSel ? "scale(1.03)" : "scale(1)",
                      opacity: dim ? 0.5 : 1,
                    }}
                  >
                    <div className="flex h-14 w-14 items-center justify-center">
                      <img src={c.icon} alt="" className="w-full h-full object-contain drop-shadow-sm" style={{ imageRendering: "pixelated" }} />
                    </div>
                    <div className="text-sm font-semibold">{c.text}</div>
                  </button>
                );
              })}
            </div>
            <div
              className="mt-4 flex items-center justify-center gap-2 text-xs italic"
              style={{ color: "#999" }}
            >
              <span className="flex items-center justify-center h-6 w-6 rounded-full" style={{ background: guide.color + "33" }}><GuideSprite guideId={guide.id} size={24} animate={false} /></span> Tidak ada
              jawaban benar atau salah.
            </div>
          </>
        )}

        {/* ── RANK ── */}
        {q.type === "rank" && (
          <>
            <h2
              style={{
                fontFamily: "'Crimson Text', serif",
                fontSize: 22,
                fontWeight: 700,
              }}
            >
              {q.q}
            </h2>
            <p
              className="mt-1 text-xs italic"
              style={{ color: "#999" }}
            >
              ✦ Gunakan panah untuk mengurutkan
            </p>
            <div className="mt-5 space-y-2">
              {rankOrder.map((item, i) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-xl bg-white p-3 shadow-sm"
                  style={{ border: "1px solid #E8E0D5" }}
                >
                  <div
                    className="flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold text-white"
                    style={{ background: "#C9A84C" }}
                  >
                    {i + 1}
                  </div>
                  <div className="flex-1 font-semibold">{item}</div>
                  <button
                    onClick={() => moveRank(i, i - 1)}
                    disabled={i === 0}
                    className="rounded p-1 disabled:opacity-30 hover:bg-gray-100"
                  >
                    ↑
                  </button>
                  <button
                    onClick={() => moveRank(i, i + 1)}
                    disabled={i === rankOrder.length - 1}
                    className="rounded p-1 disabled:opacity-30 hover:bg-gray-100"
                  >
                    ↓
                  </button>
                  <GripVertical className="h-4 w-4 text-gray-300" />
                </div>
              ))}
            </div>
          </>
        )}

        {/* ── ESSAY ── */}
        {q.type === "essay" && (
          <>
            <h2
              className="text-center"
              style={{
                fontFamily: "'Crimson Text', serif",
                fontSize: 22,
                fontWeight: 700,
              }}
            >
              {q.q}
            </h2>
            <p
              className="mt-2 text-center text-sm italic"
              style={{ color: "#999" }}
            >
              {q.hint ||
                "Tulis dengan bebas - 2 hingga 5 kalimat sudah cukup."}
            </p>
            <textarea
              value={essay}
              onChange={(e) => setEssay(e.target.value.slice(0, 500))}
              placeholder="Tulis di sini... jangan takut jujur."
              className="mt-4 min-h-[160px] w-full rounded-xl border bg-amber-50/40 p-4 outline-none focus:ring-2"
              style={{ borderColor: "#E8E0D5" }}
            />
            <div className="mt-1 flex justify-between text-xs">
              <span style={{ color: "#999" }}>
                🔒 Dianalisis secara anonim
              </span>
              <span
                style={{
                  color: essay.length >= 10 ? "#2D6A4F" : "#999",
                }}
              >
                {essay.length} / 500
              </span>
            </div>
          </>
        )}

        {/* ── Navigation (in-card) ── */}
        <div
          className="mt-8 flex items-center justify-between gap-3 border-t pt-5"
          style={{ borderColor: "#E8E0D5" }}
        >
          <button
            onClick={goPrev}
            className="rounded-xl border-2 px-5 py-3 text-sm font-semibold transition hover:-translate-x-1 hover:bg-gray-50"
            style={{ borderColor: "#E8E0D5", color: "#555" }}
          >
            ← Kembali
          </button>
          <button
            disabled={!canNext}
            onClick={goNext}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl px-6 text-white transition-all disabled:cursor-not-allowed disabled:opacity-40 hover:-translate-y-1 hover:shadow-lg hover:brightness-110 active:scale-95"
            style={{
              background: q.type === "essay" && essay.trim().length === 0 ? "#E8E0D5" : categoryColor,
              color: q.type === "essay" && essay.trim().length === 0 ? "#555" : "white",
              height: 52,
              fontWeight: 700,
              fontSize: 16,
            }}
          >
            {q.type === "essay" && essay.trim().length === 0 ? "Lewati (Opsional) →" : (idx + 1 >= total ? "Analisis Jawabanku →" : "Lanjut →")}
          </button>
        </div>
      </div>
    </div>
  );
}
