import { useState, useRef } from "react";
import { Sparkles, Star, Share2, RotateCcw, MessageCircle, Crown, Zap, Heart, Home, Download, TrendingUp, Target, Sprout, ChevronDown, ChevronUp } from "lucide-react";
import { CATEGORIES, GUIDES, GuideMatch, QuizAnswers, GUIDE_BG } from "../flow";
import { GuideSprite } from "./guide-sprite";
import { type AllResults, type CategoryResult, computeMBTI } from "../scoring";
import { getCategoryInsight, getGuideComment, type CategoryInsight } from "../insights";
import ShareCard from "./share-card";
import SoulResonance from "./soul-resonance";
import { toPng } from "html-to-image";
import type { Gender } from "../flow";

export default function Hasil({ guideId, selectedCats, guideMatches, answers, categoryResults, gender, onRestart, onChat, onShare }: { guideId: string; selectedCats: string[]; guideMatches: GuideMatch[]; answers: QuizAnswers; categoryResults: AllResults; gender: Gender | null; onRestart: () => void; onChat: (id?: string) => void; onShare: () => void }) {
  const guide = GUIDES.find(g => g.id === guideId)!;
  const cats = CATEGORIES.filter(c => selectedCats.includes(c.id));
  const [tab, setTab] = useState<"ringkasan" | "kategori" | "guide-match" | "saran">("ringkasan");
  const [expanded, setExpanded] = useState<string | null>(null);

  // Top 3 guide matches
  const topMatches = guideMatches.slice(0, 3);
  const bestMatch = topMatches[0];
  const bestGuide = bestMatch ? GUIDES.find(g => g.id === bestMatch.guideId) : null;
  const isCurrentGuideBest = bestMatch?.guideId === guideId;

  // Dynamic results
  const mbtiResult = categoryResults.kepribadian;
  const userMBTI = mbtiResult?.code || (answers.length > 0 ? computeMBTI(answers).code : "INFJ");
  const guideComment = getGuideComment(guideId, categoryResults);

  const cardRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);

  const handleShare = async () => {
    if (!cardRef.current) return;
    setIsExporting(true);
    try {
      const dataUrl = await toPng(cardRef.current, {
        pixelRatio: 2,
        cacheBust: true,
        style: { margin: "0" }
      });
      
      const res = await fetch(dataUrl);
      const blob = await res.blob();
        if (!blob) {
          setIsExporting(false);
          return;
        }
        
        const fileName = `KnowYourself_Profile_${userMBTI}.png`;
        const file = new File([blob], fileName, { type: "image/png" });

        // Try Web Share API first (Mobile friendly for IG, WA, Twitter)
        if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
          try {
            await navigator.share({
              title: 'Hasil Tes Kepribadian KnowYourself',
              text: `Lihat Soulcard hasil tes kepribadianku (${userMBTI}) di KnowYourself!`,
              files: [file]
            });
          } catch (shareErr: any) {
            // Ignore AbortError (user cancelled share)
            if (shareErr.name !== 'AbortError') {
              console.error("Gagal share ke aplikasi:", shareErr);
              fallbackDownload(canvas, fileName);
            }
          }
        } else {
          // Fallback to auto download for PC
          fallbackDownload(dataUrl, fileName);
        }
        setIsExporting(false);
      
    } catch (err) {
      console.error("Gagal memproses gambar", err);
      setIsExporting(false);
    }
  };

  const fallbackDownload = (dataUrl: string, fileName: string) => {
    const link = document.createElement("a");
    link.download = fileName;
    link.href = dataUrl;
    link.click();
  };

  // Get result for a category (dynamic or fallback)
  const getResult = (catId: string): CategoryResult | null => {
    return categoryResults[catId] || null;
  };

  return (
    <div className="min-h-screen w-full pb-12" style={{
      backgroundImage: `linear-gradient(rgba(250,247,240, 0.85), rgba(250,247,240, 0.95)), url('${GUIDE_BG[guide.id]}')`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundAttachment: "fixed",
      fontFamily: "Inter, sans-serif"
    }}>
      <div className="relative h-80 overflow-hidden" style={{ background: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.7)), url('${GUIDE_BG[guide.id]}') center/cover no-repeat` }}>
        {[...Array(30)].map((_, i) => (
          <span key={i} className="absolute h-1 w-1 rounded-full bg-amber-200" style={{
            left: `${(i * 23) % 100}%`, top: `${(i * 41) % 100}%`,
            opacity: 0.5, animation: `sparkle ${1 + (i % 3)}s ease-in-out ${i * 0.1}s infinite`,
          }} />
        ))}

        <button onClick={onRestart} className="absolute left-6 top-6 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white shadow-sm backdrop-blur transition hover:bg-white/30 hover:scale-105">
          <Home className="h-5 w-5" />
        </button>

        <div className="relative z-10 mx-auto flex h-full max-w-3xl flex-col items-center justify-center px-6 text-center text-white">
          <div className="flex h-24 w-24 items-center justify-center rounded-full text-5xl" style={{ background: "rgba(255,255,255,0.15)", border: "2px solid rgba(255,255,255,0.3)" }}>
            <GuideSprite guideId={guide.id} size={90} animate={false} />
          </div>
          <div className="mt-3 text-xs" style={{ color: "rgba(255,255,255,0.7)" }}>Selamat! Kepribadian utamamu:</div>
          <div className="mt-1" style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 36 }}>{userMBTI}</div>
          {mbtiResult && <div className="mt-1 italic" style={{ fontFamily: "'Crimson Text', serif", fontSize: 18, color: "rgba(255,255,255,0.85)" }}>{mbtiResult.name}</div>}
          <div className="mt-2 flex items-center gap-2 text-sm">
            <span style={{ color: "rgba(255,255,255,0.85)" }}>Didampingi oleh Guide: <strong>{guide.name}</strong></span>
          </div>
        </div>
      </div>

      <div className="sticky top-0 z-20 border-b bg-[#F0EBE3]/95 backdrop-blur" style={{ borderColor: "#E8E0D5" }}>
        <div className="mx-auto flex max-w-3xl gap-2 overflow-x-auto px-6 py-3 scrollbar-hide">
          {([
            ["ringkasan", "📜 Profil Utama"],
            ["kategori", "🔍 Detail"],
            ["saran", "💡 Insight"],
            ["guide-match", "✨ Guide Cocok"]
          ] as const).map(([k, label]) => (
            <button key={k} onClick={() => setTab(k as any)} className="whitespace-nowrap rounded-full px-4 py-2 text-sm transition" style={{
              background: tab === k ? (k === "forge" ? "linear-gradient(135deg, #C1121F, #6B4C9A)" : k === "resonance" ? "linear-gradient(135deg, #FF6B6B, #C1121F)" : k === "guide-match" ? "linear-gradient(135deg, #C9A84C, #B5850B)" : "#2A9D8F") : "transparent",
              color: tab === k ? "white" : "#555",
              fontWeight: tab === k ? 600 : 400,
              boxShadow: tab === k ? "0 2px 12px rgba(42, 157, 143, 0.2)" : "none",
            }}>{label}</button>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-6 py-8">
        {tab === "ringkasan" && (
          <div className="space-y-6">
            <div ref={cardRef} className="relative mx-auto max-w-md overflow-hidden rounded-2xl shadow-2xl" style={{
              border: `1px solid ${guide.color}88`,
            }}>
              {/* Blurred Background Image */}
              <div className="absolute inset-0 z-0" style={{
                backgroundImage: `url('${GUIDE_BG[guide.id]}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                filter: "blur(16px) brightness(0.5)",
                transform: "scale(1.15)"
              }} />

              {/* Content Wrapper */}
              <div className="relative z-10">
                {/* Card Header */}
                <div className="p-6 text-center text-white" style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.6), rgba(0,0,0,0))" }}>
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-black/40 text-3xl shadow-inner backdrop-blur border border-white/20">
                    <GuideSprite guideId={guide.id} size={48} animate={false} />
                  </div>
                  <h3 className="mt-3 font-serif text-2xl font-bold tracking-wide text-white drop-shadow-md">{userMBTI}</h3>
                  {mbtiResult && <p className="mt-0.5 text-sm opacity-90 drop-shadow-md">{mbtiResult.name}</p>}
                  <p className="mt-1 text-xs opacity-80" style={{ color: "#FFD27A" }}>KnowYourself Identity Card</p>
                </div>

                <div className="p-6 pt-2 backdrop-blur-sm">
                  <h4 className="mb-4 text-center text-[10px] font-bold uppercase tracking-widest text-white/60">Profil Hexagon</h4>
                  <RadarChart cats={cats} results={categoryResults} />

                  <div className="mt-6 grid grid-cols-2 gap-3">
                    {cats.map(c => {
                      const result = getResult(c.id);
                      return (
                        <div key={c.id} className="rounded-xl border p-3 text-center transition hover:bg-white/10 backdrop-blur-md" style={{ borderColor: c.color + "44", background: "rgba(0,0,0,0.3)" }}>
                          <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-full" style={{ background: c.color + "33", color: c.light }}>
                            <Sparkles className="h-4 w-4" />
                          </div>
                          <div className="mt-2 text-[10px] font-bold uppercase tracking-wider" style={{ color: c.light }}>{c.name}</div>
                          <div className="mt-0.5 text-xs font-bold text-white drop-shadow-sm">{result?.code || "—"}</div>
                          {result && <div className="mt-0.5 text-[10px] text-white/70">{result.name}</div>}
                        </div>
                      );
                    })}
                  </div>

                  {/* Top traits */}
                  {mbtiResult && (
                    <div className="mt-4 flex flex-wrap justify-center gap-2">
                      {mbtiResult.traits.map(t => (
                        <span key={t} className="rounded-full px-3 py-1 text-xs font-semibold backdrop-blur-md" style={{ background: guide.color + "44", color: "#FFF", border: `1px solid ${guide.color}66` }}>
                          ★ {t}
                        </span>
                      ))}
                    </div>
                  )}

                  <button onClick={onShare} className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold text-white transition shadow-lg hover:scale-[1.02]" style={{ background: `linear-gradient(135deg, ${guide.color}, #1A1A1A)`, border: `1px solid ${guide.color}88` }}>
                    <Sparkles className="h-4 w-4" /> Bagikan Soul Card
                  </button>
                </div>
                {/* End Content Wrapper */}
              </div>
            </div>

            {/* Dynamic guide comment */}
            <div className="mt-6 rounded-xl p-5" style={{ background: guide.color + "11", border: `1px solid ${guide.color}33` }}>
              <div className="flex gap-3">
                <div className="flex shrink-0 items-center justify-center rounded-full" style={{ background: guide.color + "33", width: 48, height: 48 }}><GuideSprite guideId={guide.id} size={48} animate={false} /></div>
                <div className="flex-1">
                  <div className="text-xs font-bold" style={{ color: guide.color }}>{guide.name} berkata:</div>
                  <p className="mt-1 text-sm italic" style={{ color: "#1A1A1A" }}>
                    "{guideComment.summary}"
                  </p>
                  <p className="mt-2 text-xs font-semibold" style={{ color: guide.color }}>
                    {guideComment.encouragement}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick guide match teaser */}
            {bestGuide && (
              <button
                onClick={() => setTab("guide-match")}
                className="mt-4 flex w-full items-center gap-3 rounded-xl p-4 text-left transition hover:shadow-md"
                style={{ background: "linear-gradient(135deg, #FFF8E1, #FFF3CD)", border: "1px solid #C9A84C44" }}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full" style={{ background: bestGuide.color + "22" }}>
                  <GuideSprite guideId={bestGuide.id} size={44} withShadow={false} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-1 text-xs font-bold" style={{ color: "#B5850B" }}>
                    <Crown className="h-3 w-3" /> Guide Paling Cocok Untukmu
                  </div>
                  <div className="text-sm font-bold">{bestGuide.name} - {bestMatch.score}% Kecocokan</div>
                </div>
                <span className="text-xs" style={{ color: "#B5850B" }}>Lihat →</span>
              </button>
            )}
          </div>
        )}

        {tab === "kategori" && (
          <div className="space-y-3">
            {cats.map(c => {
              const open = expanded === c.id;
              const result = getResult(c.id);
              return (
                <div key={c.id} className="overflow-hidden rounded-xl bg-white shadow-sm" style={{ borderLeft: `4px solid ${c.color}` }}>
                  <button onClick={() => setExpanded(open ? null : c.id)} className="flex w-full items-center gap-3 p-4 text-left">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full" style={{ background: c.light, color: c.color }}>
                      <Sparkles className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <div className="text-xs font-bold uppercase" style={{ color: c.color }}>{c.name}</div>
                      <div className="text-sm font-bold">{result ? `${result.code} - ${result.name}` : "Belum diambil"}</div>
                    </div>
                    {result && (
                      <div className="flex items-center gap-2">
                        <span className="rounded-full px-2 py-0.5 text-xs font-bold" style={{ background: c.light, color: c.color }}>{result.score}%</span>
                        {open ? <ChevronUp className="h-4 w-4" style={{ color: c.color }} /> : <ChevronDown className="h-4 w-4" style={{ color: c.color }} />}
                      </div>
                    )}
                  </button>
                  {open && result && (
                    <div className="border-t px-4 py-4 space-y-3" style={{ borderColor: c.light, background: c.light + "55" }}>
                      <p className="text-sm leading-relaxed">{result.description}</p>

                      {/* Strengths */}
                      <div>
                        <div className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: c.color }}>Kekuatan</div>
                        <div className="flex flex-wrap gap-2">
                          {result.strengths.map(s => (
                            <span key={s} className="rounded-full px-3 py-1 text-xs text-white" style={{ background: c.color }}>★ {s}</span>
                          ))}
                        </div>
                      </div>

                      {/* Weaknesses / Growth areas */}
                      {result.weaknesses.length > 0 && (
                        <div>
                          <div className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "#B5850B" }}>Area Pertumbuhan</div>
                          <div className="flex flex-wrap gap-2">
                            {result.weaknesses.map(w => (
                              <span key={w} className="rounded-full border px-3 py-1 text-xs" style={{ borderColor: "#B5850B44", color: "#B5850B" }}>🌱 {w}</span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Traits */}
                      <div className="flex flex-wrap gap-2 pt-2">
                        {result.traits.map(t => (
                          <span key={t} className="rounded-full px-3 py-1 text-xs font-semibold" style={{ background: c.color + "15", color: c.color }}>
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {tab === "guide-match" && (
          <div className="space-y-6">
            {/* Header */}
            <div className="text-center">
              <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold" style={{ background: "#FFF8E1", color: "#B5850B", border: "1px solid #C9A84C44" }}>
                <Zap className="h-3 w-3" /> Berdasarkan Jawaban Quiz-mu
              </div>
              <h2 className="mt-3" style={{ fontFamily: "'Crimson Text', serif", fontSize: 28, fontWeight: 700 }}>
                Guide yang Paling Cocok Untukmu
              </h2>
              <p className="mt-1 text-sm" style={{ color: "#777" }}>
                Algoritma kami menganalisis setiap jawabanmu dan mencocokkannya dengan kepribadian masing-masing guide
              </p>
            </div>

            {/* Best Match - Hero Card */}
            {bestGuide && bestMatch && (
              <div className="relative overflow-hidden rounded-2xl p-[2px] animate-shimmer-fast" style={{ background: "linear-gradient(135deg, #C9A84C, #B5850B, #FFD27A, #C9A84C)", backgroundSize: "300% 300%", boxShadow: "0 10px 30px -10px rgba(201, 168, 76, 0.4)" }}>
                <div className="relative rounded-xl p-6 transition-all duration-300 hover:brightness-105" style={{ background: (bestGuide as any).bgGradient || "#FFFDF7" }}>
                  {/* Decorative sparkles */}
                  {[...Array(8)].map((_, i) => (
                    <span key={i} className="absolute h-1.5 w-1.5 rounded-full" style={{
                      background: "#C9A84C",
                      left: `${10 + (i * 29) % 80}%`,
                      top: `${5 + (i * 37) % 90}%`,
                      opacity: 0.2,
                      animation: `sparkle ${1.5 + (i % 3) * 0.5}s ease-in-out ${i * 0.2}s infinite`,
                    }} />
                  ))}

                  <div className="pointer-events-none absolute inset-2 rounded-xl border border-dashed opacity-20" style={{ borderColor: bestGuide.color }} />

                  <div className="relative z-10">
                    <div className="flex justify-center">
                      <div className="inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-bold text-white" style={{ background: "linear-gradient(135deg, #C9A84C, #B5850B)" }}>
                        <Crown className="h-3.5 w-3.5" /> #1 GUIDE TERBAIK
                      </div>
                    </div>

                    <div className="mt-5 flex flex-col items-center gap-5 sm:flex-row">
                      <div className="relative">
                        <div className="absolute inset-0 -m-3 rounded-full blur-xl" style={{ background: bestGuide.color, opacity: 0.2 }} />
                        <div className="relative flex h-28 w-28 items-center justify-center rounded-full" style={{ background: bestGuide.color + "22", border: `3px solid ${bestGuide.color}55` }}>
                          <GuideSprite guideId={bestGuide.id} size={100} />
                        </div>
                      </div>

                      <div className="flex-1 text-center sm:text-left">
                        <div className="text-sm font-bold uppercase tracking-widest" style={{ color: bestGuide.color }}>{bestGuide.title}</div>
                        <div style={{ fontFamily: "'Crimson Text', serif", fontSize: 32, fontWeight: 700 }}>{bestGuide.name}</div>

                        <div className="mt-4 flex items-center gap-3">
                          <div className="relative h-4 flex-1 overflow-hidden rounded-full shadow-inner" style={{ background: "rgba(0,0,0,0.1)" }}>
                            <div className="absolute inset-y-0 left-0 rounded-full transition-all duration-1000 ease-out" style={{
                              width: `${bestMatch.score}%`,
                              background: `linear-gradient(90deg, ${bestGuide.color}, #C9A84C)`,
                            }} />
                          </div>
                          <div className="flex h-12 w-16 items-center justify-center rounded-xl bg-white/60 shadow-sm backdrop-blur-md border border-white/40">
                            <span className="text-lg font-black" style={{ color: bestGuide.color }}>{bestMatch.score}%</span>
                          </div>
                        </div>

                        <div className="mt-3 flex flex-wrap justify-center gap-2 sm:justify-start">
                          {bestGuide.traits.map(t => (
                            <span key={t} className="rounded-full px-3 py-1 text-xs font-semibold" style={{ background: bestGuide.color + "18", color: bestGuide.color }}>
                              {t}
                            </span>
                          ))}
                        </div>

                        <div className="mt-4">
                          <button
                            onClick={() => onChat(bestGuide.id)}
                            className="inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:opacity-90 sm:w-auto"
                            style={{ background: `linear-gradient(135deg, ${bestGuide.color}, #C9A84C)` }}
                          >
                            <MessageCircle className="h-4 w-4" /> Ngobrol dengan {bestGuide.name}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Reasons */}
                    <div className="mt-5 space-y-2 rounded-xl p-4" style={{ background: bestGuide.color + "08", border: `1px solid ${bestGuide.color}22` }}>
                      <div className="text-xs font-bold uppercase tracking-wider" style={{ color: bestGuide.color }}>Mengapa Cocok?</div>
                      {bestMatch.reasons.map((r, i) => (
                        <div key={i} className="flex items-start gap-2 text-sm">
                          <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0" style={{ color: bestGuide.color }} />
                          <span>{r}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 text-center text-sm italic" style={{ color: "#777" }}>
                      "{bestGuide.quote}" - <span style={{ color: bestGuide.color, fontWeight: 600 }}>{bestGuide.name}</span>
                    </div>

                    {!isCurrentGuideBest && (
                      <div className="mt-4 rounded-lg p-3 text-center text-xs" style={{ background: "#FFF3CD", border: "1px solid #C9A84C33" }}>
                        <span style={{ color: "#856404" }}>
                          💡 Kamu memilih <b>{guide.name}</b> sebagai guide, tapi berdasarkan jawabanmu, <b>{bestGuide.name}</b> lebih selaras denganmu!
                        </span>
                      </div>
                    )}
                    {isCurrentGuideBest && (
                      <div className="mt-4 rounded-lg p-3 text-center text-xs" style={{ background: "#D4EDDA", border: "1px solid #28A74533" }}>
                        <span style={{ color: "#155724" }}>
                          ✨ Pilihan tepat! <b>{guide.name}</b> yang kamu pilih memang guide yang paling cocok untukmu!
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Runner-ups */}
            {topMatches.length > 1 && (
              <>
                <div className="text-xs font-bold uppercase tracking-widest" style={{ color: "#999" }}>Juga Cocok Untukmu</div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {topMatches.slice(1).map((match, i) => {
                    const mg = GUIDES.find(g => g.id === match.guideId)!;
                    const isChosen = match.guideId === guideId;
                    return (
                      <div key={match.guideId} className="relative overflow-hidden rounded-xl p-4 shadow-sm transition hover:shadow-md" style={{ background: (mg as any).bgGradient || "white", borderLeft: `4px solid ${mg.color}` }}>
                        {isChosen && (
                          <div className="absolute right-2 top-2 rounded-full px-2 py-0.5 text-[10px] font-bold" style={{ background: mg.color + "22", color: mg.color }}>
                            Pilihanmu
                          </div>
                        )}
                        <div className="flex items-center gap-3">
                          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full" style={{ background: mg.color + "15" }}>
                            <GuideSprite guideId={mg.id} size={48} withShadow={false} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="rounded-full px-2 py-0.5 text-[10px] font-bold text-white" style={{ background: i === 0 ? "#8B8B8B" : "#A0522D" }}>
                                #{i + 2}
                              </span>
                              <span className="text-sm font-bold truncate">{mg.name}</span>
                            </div>
                            <div className="mt-1 text-xs" style={{ color: "#777" }}>{mg.title}</div>
                          </div>
                        </div>
                        <div className="mt-3 flex items-center gap-2">
                          <div className="relative h-2 flex-1 overflow-hidden rounded-full" style={{ background: "#E8E0D5" }}>
                            <div className="absolute inset-y-0 left-0 rounded-full" style={{ width: `${match.score}%`, background: mg.color, opacity: 0.7 }} />
                          </div>
                          <span className="text-xs font-bold" style={{ color: mg.color }}>{match.score}%</span>
                        </div>
                        {match.reasons[0] && (
                          <div className="mt-2 flex items-start gap-1.5 text-xs" style={{ color: "#888" }}>
                            <Star className="mt-0.5 h-3 w-3 shrink-0 text-amber-400" />
                            <span>{match.reasons[0]}</span>
                          </div>
                        )}
                        <div className="mt-4">
                          <button
                            onClick={() => onChat(mg.id)}
                            className="flex w-full items-center justify-center gap-1.5 rounded-lg border py-1.5 text-xs font-bold transition hover:bg-gray-50"
                            style={{ borderColor: mg.color + "44", color: mg.color }}
                          >
                            <MessageCircle className="h-3.5 w-3.5" /> Ngobrol
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}

            {/* All guides ranking */}
            {guideMatches.length > 3 && (
              <div className="rounded-xl bg-white p-5 shadow-sm">
                <div className="mb-3 text-xs font-bold uppercase tracking-widest" style={{ color: "#999" }}>Semua Guide - Peringkat Kecocokan</div>
                <div className="space-y-2">
                  {guideMatches.slice(3).map((match, i) => {
                    const mg = GUIDES.find(g => g.id === match.guideId)!;
                    return (
                      <div key={match.guideId} className="flex items-center gap-3 text-sm">
                        <span className="w-5 text-center text-xs font-bold" style={{ color: "#BBB" }}>#{i + 4}</span>
                        <div className="flex h-8 w-8 items-center justify-center rounded-full text-lg" style={{ background: mg.color + "15" }}>
                          <GuideSprite guideId={mg.id} size={28} animate={false} />
                        </div>
                        <span className="w-24 truncate font-medium">{mg.name}</span>
                        <div className="relative h-1.5 flex-1 overflow-hidden rounded-full" style={{ background: "#E8E0D5" }}>
                          <div className="absolute inset-y-0 left-0 rounded-full" style={{ width: `${match.score}%`, background: mg.color, opacity: 0.5 }} />
                        </div>
                        <span className="text-xs" style={{ color: "#999" }}>{match.score}%</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {tab === "saran" && (
          <div className="space-y-6">
            {/* Header */}
            <div className="text-center">
              <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold" style={{ background: "#D8F3DC", color: "#2D6A4F", border: "1px solid #2D6A4F33" }}>
                <Sprout className="h-3 w-3" /> Berdasarkan Hasil Tesmu
              </div>
              <h2 className="mt-3" style={{ fontFamily: "'Crimson Text', serif", fontSize: 28, fontWeight: 700 }}>
                Insight & Saran Pertumbuhan
              </h2>
              <p className="mt-1 text-sm" style={{ color: "#777" }}>
                Saran yang dipersonalisasi berdasarkan hasil unikmu — bukan tips generik
              </p>
            </div>

            {/* Guide Quest */}
            <div className="rounded-xl p-5 text-white" style={{ background: `linear-gradient(135deg, ${guide.color}, #2D6A4F)` }}>
              <div className="flex items-start gap-3">
                <div className="flex shrink-0 items-center justify-center rounded-full" style={{ background: "rgba(255,255,255,0.2)", width: 64, height: 64 }}><GuideSprite guideId={guide.id} size={64} animate={false} /></div>
                <div className="flex-1">
                  <div className="text-xs font-bold uppercase tracking-widest" style={{ color: "#FFD27A" }}>Quest dari {guide.name}</div>
                  <h3 className="mt-1" style={{ fontFamily: "'Crimson Text', serif", fontSize: 22, fontWeight: 700 }}>{guide.quest.title}</h3>
                  <p className="mt-1 text-sm italic">{guide.quest.desc}</p>
                </div>
              </div>
            </div>

            {/* Per-category insights */}
            {cats.map(c => {
              const result = getResult(c.id);
              if (!result) return null;
              const insight = getCategoryInsight(result);
              return (
                <div key={c.id} className="rounded-xl bg-white shadow-sm overflow-hidden" style={{ borderLeft: `4px solid ${c.color}` }}>
                  <div className="p-4 border-b" style={{ borderColor: c.light }}>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full" style={{ background: c.light, color: c.color }}>
                        <Target className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-xs font-bold uppercase" style={{ color: c.color }}>{c.name}</div>
                        <div className="text-sm font-bold">{result.code} — {result.name}</div>
                      </div>
                    </div>
                  </div>

                  {/* Harness */}
                  <div className="px-4 pt-4 pb-2">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "#2D6A4F" }}>
                      <span>{insight.harness.icon}</span> {insight.harness.title}
                    </div>
                    <ul className="space-y-2">
                      {insight.harness.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <TrendingUp className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-500" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Grow */}
                  <div className="px-4 pt-3 pb-2">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "#B5850B" }}>
                      <span>{insight.grow.icon}</span> {insight.grow.title}
                    </div>
                    <ul className="space-y-2">
                      {insight.grow.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <Sprout className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-500" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Actions */}
                  <div className="px-4 pt-3 pb-4" style={{ background: c.light + "44" }}>
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider mb-2" style={{ color: c.color }}>
                      <span>{insight.actions.icon}</span> {insight.actions.title}
                    </div>
                    <ul className="space-y-2">
                      {insight.actions.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white" style={{ background: c.color }}>{i + 1}</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {tab === "saran" && (
          <div className="mt-8 overflow-hidden rounded-3xl shadow-lg" style={{ background: `linear-gradient(135deg, ${guide.color}, #1a1a1a)` }}>
            <div className="flex flex-col items-center gap-6 p-8 text-center md:flex-row md:text-left">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full text-5xl shadow-xl" style={{ background: "rgba(255,255,255,0.2)", border: "2px solid rgba(255,255,255,0.3)" }}>
                <GuideSprite guideId={guide.id} size={80} animate={false} />
              </div>
              <div className="flex-1 text-white">
                <div className="text-xs font-bold uppercase tracking-widest" style={{ color: "#FFD27A" }}>✦ Baru!</div>
                <h3 style={{ fontFamily: "'Crimson Text', serif", fontSize: 22, fontWeight: 700 }}>Lanjutkan obrolan dengan {guide.name}</h3>
                <p className="mt-1 text-sm" style={{ color: "rgba(255,255,255,0.9)" }}>
                  Tanya apapun tentang hasilmu, karir, hubungan, atau cara tumbuh. {guide.name} akan menjawab dengan caranya yang khas.
                </p>
              </div>
              <button onClick={() => onChat()} className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-white px-5 py-3 font-bold transition hover:brightness-95" style={{ color: guide.color }}>
                <MessageCircle className="h-4 w-4" /> Mulai Konsultasi
              </button>
            </div>
          </div>
        )}

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <button onClick={onShare} className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-white hover:brightness-110" style={{ background: "#2D6A4F" }}>
            <Share2 className="h-4 w-4" /> Bagikan Hasilmu
          </button>
          <button onClick={onRestart} className="inline-flex items-center gap-2 rounded-xl border-2 px-5 py-3 hover:bg-gray-50" style={{ borderColor: "#2D6A4F", color: "#2D6A4F" }}>
            <RotateCcw className="h-4 w-4" /> Tes Ulang
          </button>
        </div>
      </div>

      <style>{`
        @keyframes sparkle { 0%,100% { opacity: 0.2; transform: scale(0.8); } 50% { opacity: 1; transform: scale(1.2); } }
        @keyframes shimmer {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
      <div className="mx-auto max-w-4xl px-2 py-8">
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────
// RADAR CHART (DYNAMIC)
// ──────────────────────────────────────────────

function RadarChart({ cats, results }: { cats: typeof CATEGORIES; results: AllResults }) {
  const n = Math.max(cats.length, 3);
  const r = 85;
  const center = 130;

  const points = cats.map((c, i) => {
    const angle = (i / n) * Math.PI * 2 - Math.PI / 2;
    const result = results[c.id];
    // Use actual score (0-100) mapped to radius
    const dist = r * (result ? result.score / 100 : 0.5);
    return { x: center + Math.cos(angle) * dist, y: center + Math.sin(angle) * dist, c };
  });

  const labelPoints = cats.map((c, i) => {
    const angle = (i / n) * Math.PI * 2 - Math.PI / 2;
    return { x: center + Math.cos(angle) * (r + 25), y: center + Math.sin(angle) * (r + 25), c };
  });

  const path = points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ") + "Z";

  return (
    <svg viewBox="0 0 260 260" className="mx-auto mt-3" style={{ width: 240, height: 240 }}>
      {/* Grid lines */}
      {[0.33, 0.66, 1].map(s => (
        <polygon key={s} points={Array.from({ length: n }, (_, i) => {
          const a = (i / n) * Math.PI * 2 - Math.PI / 2;
          return `${center + Math.cos(a) * r * s},${center + Math.sin(a) * r * s}`;
        }).join(" ")} fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth={1} />
      ))}
      {/* Axis lines */}
      {Array.from({ length: n }, (_, i) => {
        const a = (i / n) * Math.PI * 2 - Math.PI / 2;
        return <line key={i} x1={center} y1={center} x2={center + Math.cos(a) * r} y2={center + Math.sin(a) * r} stroke="rgba(255,255,255,0.15)" strokeWidth={0.5} />;
      })}
      {/* Data polygon */}
      <path d={path} fill="rgba(255, 255, 255, 0.15)" stroke="rgba(255,255,255,0.8)" strokeWidth={2} />
      {/* Data points */}
      {points.map((p, i) => <circle key={i} cx={p.x} cy={p.y} r={4.5} fill={p.c.color} stroke="rgba(0,0,0,0.6)" strokeWidth={1.5} />)}
      {/* Labels */}
      {labelPoints.map((p, i) => {
        const result = results[p.c.id];
        return (
          <text key={i} x={p.x} y={p.y} textAnchor="middle" dominantBaseline="middle" fontSize={11} fontWeight={700} fill={p.c.light}>
            {result ? result.code : p.c.name.slice(0, 4)}
          </text>
        );
      })}
    </svg>
  );
}
