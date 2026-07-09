import { useState, useRef } from "react";
import { X, Download, Share2, Image, Palette, User, Sparkles, Check, ChevronLeft, ChevronRight, Crown } from "lucide-react";
import { GUIDES, CATEGORIES, type Gender, GUIDE_BG } from "../flow";
import { GuideSprite } from "./guide-sprite";
import type { AllResults } from "../scoring";
import { toPng, toBlob } from "html-to-image";

const SHORT_NAMES: Record<string, string> = {
  kepribadian: "Kepribadian",
  karir: "Karir",
  finansial: "Finansial",
  belajar: "Belajar",
  attachment: "Sosial",
  kesejahteraan: "Sejahtera"
};

// Creative English names for Guide backgrounds
const CREATIVE_BG_NAMES: Record<string, string> = {
  vampire: "Crimson Keep",
  angel: "Ethereal Dawn",
  tree: "Ancient Grove",
  barbarian: "Warrior's Peak",
  werewolf: "Lunar Forest",
  knight: "Royal Bastion",
  qilin: "Jade Peaks",
  ghost: "Spectral Manor",
  griffin: "Aero Summit",
  golem: "Rune Forge",
};

const BACKGROUNDS = [
  { id: "forest", name: "Mystic Woods", url: "/assets/bg/bg_mystic_forest.png" },
  { id: "sunset", name: "Golden Sanctuary", url: "/assets/bg/bg_golden_sunset.png" },
  ...GUIDES.map(g => ({
    id: g.id,
    name: CREATIVE_BG_NAMES[g.id] || `${g.name}'s Domain`,
    url: GUIDE_BG[g.id]
  }))
];

// ──────────────────────────────────────────────
// ACCENT COLOR OPTIONS
// ──────────────────────────────────────────────

const ACCENT_COLORS = [
  { id: "default", color: "#6B7280", name: "Silver" },
  { id: "emerald", color: "#2D6A4F", name: "Emerald" },
  { id: "gold", color: "#C9A84C", name: "Gold" },
  { id: "purple", color: "#6B4C9A", name: "Amethyst" },
  { id: "ruby", color: "#C1121F", name: "Ruby" },
  { id: "ocean", color: "#0077B6", name: "Ocean" },
  { id: "sakura", color: "#FF6B8A", name: "Sakura" },
  { id: "amber", color: "#F59E0B", name: "Amber" },
];

type ShareCardProps = {
  guideId: string;
  bestGuideId: string;
  categoryResults: AllResults;
  selectedCats: string[];
  gender: Gender | null;
};

export default function ShareCard({ guideId, bestGuideId, categoryResults, selectedCats, gender }: ShareCardProps) {
  const [selectedBg, setSelectedBg] = useState(BACKGROUNDS[0].id);
  const [selectedAccent, setSelectedAccent] = useState(ACCENT_COLORS[0].id);
  const [avatarMode, setAvatarMode] = useState<"selected" | "best" | "adventurer">("selected");
  const [showRadar, setShowRadar] = useState(true);
  const [customName, setCustomName] = useState("");
  const [isBgBlurred, setIsBgBlurred] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [configTab, setConfigTab] = useState<"bg" | "accent" | "content">("bg");
  const [generatedImgUrl, setGeneratedImgUrl] = useState<string | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const bg = BACKGROUNDS.find(b => b.id === selectedBg)!;
  const accent = ACCENT_COLORS.find(a => a.id === selectedAccent)!;
  const cats = CATEGORIES.filter(c => selectedCats.includes(c.id));

  const mbtiResult = categoryResults.kepribadian;
  const primaryCode = mbtiResult?.code || "—";
  const primaryName = mbtiResult?.name || "";
  const topTraits = Object.values(categoryResults).flatMap(r => r.traits).slice(0, 4);

  // Determine Avatar Data
  let avatarName = "";
  let avatarDesc = "";
  let avatarContent = null;

  if (avatarMode === "adventurer") {
    const mbtiCode = (primaryCode && primaryCode !== "—") ? primaryCode.toLowerCase() : "intj";
    const mbtiSprite = `/assets/sprites/mbti/adv_${mbtiCode}_${gender}.png`;
    const defaultSprite = gender === "male" ? "/assets/sprites/adventurer_male.png"
      : gender === "female" ? "/assets/sprites/adventurer_female.png"
        : "/assets/sprites/adventurer_spirit.png";

    avatarName = "Adventurer";
    avatarDesc = "Adventurer";
    avatarContent = (
      <img
        src={mbtiSprite}
        onError={(e) => {
          e.currentTarget.src = defaultSprite;
          e.currentTarget.onerror = null;
        }}
        alt="Adventurer"
        className="h-28 w-28 object-contain"
        style={{ imageRendering: "pixelated" }}
      />
    );
  } else {
    const activeGuideId = avatarMode === "best" ? bestGuideId : guideId;
    const activeGuide = GUIDES.find(g => g.id === activeGuideId);
    if (activeGuide) {
      avatarName = activeGuide.name;
      avatarDesc = avatarMode === "best" ? "Guide Paling Cocok" : "Guide Pilihan";
      avatarContent = <GuideSprite guideId={activeGuide.id} size={112} animate={false} />;
    }
  }

  const handleDownload = async () => {
    if (!cardRef.current) return;
    setIsExporting(true);
    await new Promise(res => setTimeout(res, 100));
    try {
      const dataUrl = await toPng(cardRef.current, { 
        pixelRatio: 3, 
        width: 360,
        height: 720,
        style: { transform: "none", margin: "0" }, 
        cacheBust: true 
      });
      setGeneratedImgUrl(dataUrl);
      const link = document.createElement("a");
      link.download = `SoulCard_${primaryCode}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Export failed", err);
      alert("Maaf, terjadi kesalahan saat memproses gambar.");
    }
    setIsExporting(false);
  };

  const handleShare = async () => {
    if (!cardRef.current) return;
    setIsExporting(true);
    await new Promise(res => setTimeout(res, 100));
    try {
      const dataUrl = await toPng(cardRef.current, { 
        pixelRatio: 3, 
        width: 360,
        height: 720,
        style: { transform: "none", margin: "0" }, 
        cacheBust: true 
      });
      setGeneratedImgUrl(dataUrl);
      const res = await fetch(dataUrl);
      const blob = await res.blob();
      const file = new File([blob], `SoulCard_${primaryCode}.png`, { type: "image/png" });

      if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: `Soul Card — ${primaryCode}`,
          text: `Aku adalah ${primaryCode} "${primaryName}" di KnowYourself! 🌟 Coba juga yuk!`,
          files: [file],
        });
      } else {
        const link = document.createElement("a");
        link.download = `SoulCard_${primaryCode}.png`;
        link.href = dataUrl;
        link.click();
      }
    } catch (err) {
      console.error("Share failed", err);
      alert("Gagal membagikan. Anda bisa mengunduh gambar secara manual.");
    }
    setIsExporting(false);
  };

  const renderCardInner = () => (
    <>
      {/* Background Image Layer - using img instead of CSS background for iOS Safari reliability */}
      <img
        src={bg.url}
        alt=""
        crossOrigin="anonymous"
        className="absolute inset-0 h-full w-full object-cover transition-all duration-500"
        style={{
          filter: isBgBlurred ? "blur(6px)" : "none",
          transform: isBgBlurred ? "scale(1.1)" : "scale(1)"
        }}
      />

      {/* Soft Gradient Overlay for aesthetic text readability */}
      <div className="absolute inset-0 bg-black/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

      {/* Decorative sparkles */}
      {[...Array(15)].map((_, i) => (
        <span key={i} className="absolute rounded-full" style={{
          width: 2 + (i % 3),
          height: 2 + (i % 3),
          background: "rgba(255,255,255,0.6)",
          left: `${(i * 19) % 100}%`,
          top: `${(i * 31) % 100}%`,
          animation: `sparkle ${1.5 + (i % 3) * 0.5}s ease-in-out ${i * 0.15}s infinite`,
        }} />
      ))}

      {/* Content Wrapper */}
      <div className="relative z-10 flex h-full flex-col px-6 pt-6 pb-8 items-center">
        
        {/* Header */}
        <div className="inline-flex items-center gap-2 text-[8px] font-bold tracking-[0.35em] text-white/60 uppercase mt-2">
          ✦ KnowYourself Soul Card ✦
        </div>

        {/* Avatar Section */}
        <div className="mt-6 relative flex h-28 w-28 items-center justify-center rounded-full" style={{ border: `1px solid ${accent.color}44` }}>
          <div className="absolute inset-0 rounded-full opacity-30 blur-2xl" style={{ background: accent.color }} />
          <div className="relative z-10 drop-shadow-2xl">{avatarContent}</div>
        </div>

        <div className="mt-4 text-center">
          <h3 className="font-serif text-[22px] font-bold text-white drop-shadow-md">
            {customName.trim() ? customName : avatarName}
          </h3>
          <p className="mt-0.5 text-[8.5px] font-bold tracking-widest text-white/70 uppercase" style={{ fontFamily: "Inter, sans-serif" }}>{avatarDesc}</p>
        </div>

        {/* MBTI Title */}
        <div className="mt-4 text-center">
          <div className="text-[36px] font-black tracking-widest text-white leading-none" style={{ fontFamily: "'Press Start 2P', monospace", textShadow: `0 4px 20px ${accent.color}` }}>
            {primaryCode}
          </div>
          {primaryName && (
            <div className="mt-2 font-serif text-[14px] italic text-white/90" style={{ textShadow: "0 2px 4px rgba(0,0,0,0.5)" }}>
              "{primaryName}"
            </div>
          )}
        </div>

        {/* Traits Ribbon */}
        {topTraits.length > 0 && (
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {topTraits.map(t => (
              <span key={t} className="px-2.5 py-1 text-[8px] font-bold tracking-widest text-white/90 shadow-sm uppercase rounded" style={{ background: "rgba(0,0,0,0.4)", border: "1px solid rgba(255,255,255,0.15)", fontFamily: "Inter, sans-serif" }}>
                {t}
              </span>
            ))}
          </div>
        )}

        {/* Radar Chart */}
        {showRadar && cats.length >= 3 && (
          <div className="mt-auto w-full flex justify-center items-center pt-2">
            <div style={{ width: 150, height: 150 }}>
              <MiniRadar cats={cats} results={categoryResults} accent={accent.color} />
            </div>
          </div>
        )}

        {/* Spacer if no radar */}
        {(!showRadar || cats.length < 3) && <div className="flex-1" />}

        {/* Stat Lines (Bottom) */}
        <div className="mt-auto w-full pt-4">
          <div className="grid grid-cols-2 gap-x-8 gap-y-2.5">
            {cats.map(c => {
              const result = categoryResults[c.id];
              return (
                <div key={c.id} className="flex items-end justify-between border-b border-white/10 pb-1">
                  <span className="text-[8px] font-bold uppercase tracking-widest text-white/60" style={{ fontFamily: "Inter, sans-serif" }}>
                    {SHORT_NAMES[c.id] || c.name}
                  </span>
                  <span className="text-[11px] font-black text-white" style={{ fontFamily: "Inter, sans-serif" }}>
                    {result?.code || "—"}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer Watermark */}
        <div className="mt-6 mb-2 text-center w-full">
          <div className="text-[7px] font-bold tracking-[0.4em] text-white/30">KNOWYOURSELF.ID</div>
        </div>

      </div>
    </>
  );

  return (
    <div className="w-full">


      <div className="relative flex w-full flex-col gap-6 lg:flex-row">

        {/* CARD PREVIEW */}
        <div className="flex flex-1 items-center justify-center overflow-hidden rounded-3xl bg-gray-900 p-4 lg:p-8" style={{ minHeight: "80vh" }}>

          {/* Card Wrapper for responsive scaling */}
          <div className="relative flex items-center justify-center w-full max-w-[360px]" style={{ aspectRatio: "360/720" }}>
            <div
              ref={cardRef}
              className="absolute shrink-0 overflow-hidden rounded-3xl shadow-2xl origin-center bg-gray-900"
              style={{
                width: 360,
                height: 720,
                // Responsive scale for preview ONLY
                transform: "scale(min(1, calc((100vw - 32px) / 360)))"
              }}
            >
              {renderCardInner()}
            </div>
          </div>
        </div>



        {/* CONFIG PANEL */}
        <div className="w-full flex-shrink-0 lg:w-80 space-y-6">
          <div className="rounded-3xl bg-white p-6 shadow-sm border border-gray-100">
            <h2 className="font-serif text-2xl font-bold text-gray-900">Soul Card</h2>
            <p className="mt-1 text-sm text-gray-500">Sesuaikan kartu jiwamu sebelum dibagikan.</p>

            {/* Config tabs */}
            <div className="mt-6 flex gap-1 rounded-xl bg-gray-100 p-1">
              {(
                [
                  ["bg", "Latar", <Image key="img" className="w-4 h-4" />],
                  ["accent", "Aksen", <Palette key="pal" className="w-4 h-4" />],
                  ["content", "Isi", <Sparkles key="spk" className="w-4 h-4" />]
                ] as const
              ).map(([k, label, icon]) => (
                <button key={k} onClick={() => setConfigTab(k)} className="flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2.5 text-xs font-bold transition-all" style={{
                  background: configTab === k ? "white" : "transparent",
                  color: configTab === k ? "#2D6A4F" : "#888",
                  boxShadow: configTab === k ? "0 2px 8px rgba(0,0,0,0.05)" : "none",
                }}>
                  {icon} {label}
                </button>
              ))}
            </div>

            <div className="mt-6 min-h-[220px]">
              {configTab === "bg" && (
                <div className="space-y-3 animate-fade-in">
                  <div className="text-xs font-bold uppercase tracking-wider text-gray-400">Pilih Latar Belakang</div>
                  <div className="flex gap-3 overflow-x-auto pb-4 pt-1 snap-x scrollbar-hide" style={{ scrollBehavior: 'smooth' }}>
                    {BACKGROUNDS.map(b => (
                      <button key={b.id} onClick={() => setSelectedBg(b.id)} className="group relative overflow-hidden rounded-xl border-2 transition-all shrink-0 snap-center" style={{
                        borderColor: selectedBg === b.id ? "#2D6A4F" : "transparent",
                        width: "80px",
                        height: "142px", // 9:16 approx
                        boxShadow: selectedBg === b.id ? "0 4px 12px rgba(45, 106, 79, 0.3)" : "none"
                      }}>
                        <img src={b.url} alt={b.name} className="absolute inset-0 h-full w-full object-cover transition-transform group-hover:scale-110" />
                        {selectedBg === b.id && (
                          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                            <Check className="h-6 w-6 text-white drop-shadow-md" />
                          </div>
                        )}
                        {/* Always show name slightly so it's clear what it is, or on selected/hover */}
                        <div className={`absolute bottom-0 inset-x-0 bg-black/60 p-1.5 text-[8px] text-white text-center font-bold tracking-wider transition-opacity ${selectedBg === b.id ? 'opacity-100' : 'opacity-80 group-hover:opacity-100'}`}>
                          {b.name}
                        </div>
                      </button>
                    ))}
                  </div>
                  <div className="pt-2 border-t border-gray-100">
                    <label className="flex items-center justify-between rounded-xl border border-gray-200 p-3 transition hover:bg-gray-50 cursor-pointer">
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
                          <Image className="h-4 w-4 text-gray-500" />
                        </div>
                        <span className="text-sm font-bold text-gray-700">Latar Blur</span>
                      </div>
                      <div className="relative h-6 w-11 rounded-full transition" style={{ background: isBgBlurred ? "#2D6A4F" : "#ccc" }}>
                        <div className="absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform" style={{ transform: isBgBlurred ? "translateX(20px)" : "translateX(0)" }} />
                      </div>
                      <input type="checkbox" className="hidden" checked={isBgBlurred} onChange={() => setIsBgBlurred(!isBgBlurred)} />
                    </label>
                  </div>
                </div>
              )}

              {configTab === "accent" && (
                <div className="space-y-4 animate-fade-in">
                  <div className="text-xs font-bold uppercase tracking-wider text-gray-400">Pilih Warna Aksen</div>
                  <div className="grid grid-cols-5 gap-2">
                    {ACCENT_COLORS.map(a => (
                      <button key={a.id} onClick={() => setSelectedAccent(a.id)} className="flex flex-col items-center gap-2 transition-transform hover:scale-110" >
                        <div className="flex h-12 w-12 items-center justify-center rounded-full shadow-md transition-all" style={{
                          background: a.color,
                          border: selectedAccent === a.id ? "3px solid white" : "3px solid transparent",
                          outline: selectedAccent === a.id ? `2px solid ${a.color}` : "none"
                        }}>
                          {selectedAccent === a.id && <Check className="h-5 w-5 text-white" />}
                        </div>
                        <span className="text-[9px] font-bold text-gray-600">{a.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {configTab === "content" && (
                <div className="space-y-5 animate-fade-in">

                  <div className="space-y-2">
                    <div className="text-xs font-bold uppercase tracking-wider text-gray-400">Nama (Opsional)</div>
                    <input
                      type="text"
                      value={customName}
                      onChange={(e) => setCustomName(e.target.value)}
                      placeholder="Masukkan namamu..."
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 p-3 text-base font-medium transition focus:border-emerald-500 focus:bg-white focus:ring-1 focus:ring-emerald-500 outline-none placeholder:text-gray-400"
                      maxLength={20}
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="text-xs font-bold uppercase tracking-wider text-gray-400">Pilihan Avatar</div>
                    <div className="flex flex-col gap-2">
                      {[
                        { id: "selected", label: "Guide Pilihan", icon: <User className="w-4 h-4" /> },
                        { id: "best", label: "Guide Paling Cocok", icon: <Crown className="w-4 h-4 text-amber-500" /> },
                        { id: "adventurer", label: "Karakter Adventurer", icon: <Sparkles className="w-4 h-4" /> }
                      ].map(opt => (
                        <button key={opt.id} onClick={() => setAvatarMode(opt.id as any)} className="flex items-center gap-3 rounded-xl border p-3 transition-all" style={{
                          borderColor: avatarMode === opt.id ? "#2D6A4F" : "#E8E0D5",
                          background: avatarMode === opt.id ? "#F0FFF4" : "white"
                        }}>
                          <div className={`flex h-8 w-8 items-center justify-center rounded-full ${avatarMode === opt.id ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-100 text-gray-400'}`}>
                            {opt.icon}
                          </div>
                          <span className={`text-sm font-bold ${avatarMode === opt.id ? 'text-gray-900' : 'text-gray-600'}`}>{opt.label}</span>
                          {avatarMode === opt.id && <Check className="ml-auto h-4 w-4 text-emerald-600" />}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2">
                    <label className="flex items-center justify-between rounded-xl border border-gray-200 p-3 transition hover:bg-gray-50 cursor-pointer">
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
                          <Sparkles className="h-4 w-4 text-gray-500" />
                        </div>
                        <span className="text-sm font-bold text-gray-700">Tampilkan Radar Chart</span>
                      </div>
                      <div className="relative h-6 w-11 rounded-full transition" style={{ background: showRadar ? "#2D6A4F" : "#ccc" }}>
                        <div className="absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform" style={{ transform: showRadar ? "translateX(20px)" : "translateX(0)" }} />
                      </div>
                      {/* Hidden actual checkbox to make it accessible */}
                      <input type="checkbox" className="hidden" checked={showRadar} onChange={() => setShowRadar(!showRadar)} />
                    </label>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Action buttons */}
          <div className="space-y-3 rounded-3xl bg-white p-6 shadow-sm border border-gray-100">
            <button onClick={handleDownload} disabled={isExporting} className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl py-4 text-sm font-bold text-white transition-all hover:scale-[1.02] disabled:scale-100 disabled:opacity-70" style={{ background: "linear-gradient(135deg, #2D6A4F, #1A4331)" }}>
              <div className="absolute inset-0 bg-white/20 translate-y-full transition-transform group-hover:translate-y-0" />
              <Download className="relative z-10 h-5 w-5" />
              <span className="relative z-10">{isExporting ? "Memproses..." : "Download Soul Card"}</span>
            </button>

            <button onClick={handleShare} disabled={isExporting} className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 py-3.5 text-sm font-bold transition hover:bg-gray-50 disabled:opacity-60" style={{ borderColor: "#E8E0D5", color: "#4B5563" }}>
              <Share2 className="h-4 w-4" /> Bagikan ke Teman
            </button>
          </div>
        </div>
      </div>

      {generatedImgUrl && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/90 p-4 backdrop-blur-sm animate-fade-in">
          <button 
            onClick={() => setGeneratedImgUrl(null)}
            className="absolute right-4 top-4 rounded-full bg-white/20 p-2 text-white hover:bg-white/30 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
          
          <div className="text-center mb-6 max-w-sm">
            <h3 className="font-serif text-2xl font-bold text-white mb-2">Soul Card Siap!</h3>
            <p className="text-sm text-gray-300 bg-white/10 p-3 rounded-xl border border-white/20">
              Jika unduhan tidak otomatis berjalan, <strong className="text-emerald-400">Tekan tahan gambar di bawah ini</strong> lalu pilih "Simpan Gambar" / "Save Image".
            </p>
          </div>
          
          <img 
            src={generatedImgUrl} 
            alt="Your Soul Card" 
            className="max-h-[60vh] w-auto max-w-full rounded-2xl shadow-2xl" 
          />
        </div>
      )}

      <style>{`
        @keyframes sparkle { 0%,100% { opacity: 0.2; transform: scale(0.8); } 50% { opacity: 1; transform: scale(1.2); } }
        @keyframes fade-in { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
      `}</style>
    </div>
  );
}

// ──────────────────────────────────────────────
// MINI RADAR CHART
// ──────────────────────────────────────────────

function MiniRadar({ cats, results, accent }: { cats: typeof CATEGORIES; results: AllResults; accent: string }) {
  const n = Math.max(cats.length, 3);
  const r = 40;
  const cx = 75, cy = 75;

  const points = cats.map((c, i) => {
    const angle = (i / n) * Math.PI * 2 - Math.PI / 2;
    const result = results[c.id];
    const dist = r * (result ? result.score / 100 : 0.5);
    return { x: cx + Math.cos(angle) * dist, y: cy + Math.sin(angle) * dist };
  });

  const path = points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ") + "Z";

  return (
    <svg width={150} height={150} viewBox="0 0 150 150" style={{ width: "100%", height: "100%", overflow: "visible" }}>
      {[0.33, 0.66, 1].map(s => (
        <polygon key={s} points={Array.from({ length: n }, (_, i) => {
          const a = (i / n) * Math.PI * 2 - Math.PI / 2;
          return `${cx + Math.cos(a) * r * s},${cy + Math.sin(a) * r * s}`;
        }).join(" ")} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth={0.5} />
      ))}
      <path d={path} fill={accent + "44"} stroke={accent} strokeWidth={1.5} />
      {points.map((p, i) => <circle key={i} cx={p.x} cy={p.y} r={2.5} fill="white" stroke={accent} strokeWidth={1} />)}
      {cats.map((c, i) => {
        const angle = (i / n) * Math.PI * 2 - Math.PI / 2;
        const lx = cx + Math.cos(angle) * (r + 16);
        const ly = cy + Math.sin(angle) * (r + 16);
        return <text key={i} x={lx} y={ly} textAnchor="middle" dominantBaseline="middle" fontSize={6.5} fill="rgba(255,255,255,0.9)" fontWeight={700} fontFamily="Inter, sans-serif" letterSpacing="0.1em" style={{ textShadow: "0 2px 4px rgba(0,0,0,0.8)" }}>{(SHORT_NAMES[c.id] || c.name).toUpperCase()}</text>;
      })}
    </svg>
  );
}
