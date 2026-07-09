const fs = require('fs');
const file = 'src/app/components/share-card.tsx';
let code = fs.readFileSync(file, 'utf8');

const newRenderInner = `  const renderCardInner = () => (
    <>
      {/* Background Image Layer */}
      <img src={bgBase64Url || bg.url} alt=""
        className="absolute inset-0 h-full w-full object-cover transition-all duration-500"
        style={{
          filter: isBgBlurred ? "blur(6px)" : "none",
          transform: isBgBlurred ? "scale(1.1)" : "scale(1)"
        }}
      />

      {/* Base Gradient Overlay for character visibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/30" />

      {/* Huge Background Typography (MBTI Code) */}
      <div className="absolute inset-0 flex items-start justify-center overflow-hidden pointer-events-none opacity-[0.15] mix-blend-overlay pt-16">
        <div className="font-black text-white leading-none tracking-tighter" style={{ fontSize: "140px", fontFamily: "'Press Start 2P', monospace" }}>
          {primaryCode}
        </div>
      </div>

      {/* Decorative sparkles */}
      {[...Array(15)].map((_, i) => (
        <span key={i} className="absolute rounded-full" style={{
          width: 2 + (i % 3), height: 2 + (i % 3),
          background: "rgba(255,255,255,0.6)",
          left: \`\${(i * 19) % 100}%\`, top: \`\${(i * 31) % 100}%\`,
          animation: \`sparkle \${1.5 + (i % 3) * 0.5}s ease-in-out \${i * 0.15}s infinite\`
        }} />
      ))}

      {/* Main Container */}
      <div className="relative z-10 flex h-full flex-col justify-between">
        
        {/* TOP: Visual Zone */}
        <div className="flex flex-col items-center pt-6 px-6">
          <div className="inline-flex items-center gap-2 text-[8px] font-bold tracking-[0.35em] text-white/70 uppercase">
            ✦ KnowYourself Soul Card ✦
          </div>
          
          {/* Majestic Avatar (Bigger & Freely Floating) */}
          <div className="mt-6 relative flex items-center justify-center">
            {/* Glowing backdrop */}
            <div className="absolute inset-0 rounded-full opacity-40 blur-3xl" style={{ background: accent.color }} />
            {/* The avatar itself scaled up */}
            <div className="relative z-10 drop-shadow-[0_15px_25px_rgba(0,0,0,0.6)] scale-[1.3] transform-gpu">
              {avatarContent}
            </div>
          </div>
        </div>

        {/* BOTTOM: Frosted Glass HUD (Data Zone) */}
        <div className="mt-auto w-full backdrop-blur-2xl rounded-t-[32px] p-6 pb-5 shadow-[0_-15px_40px_rgba(0,0,0,0.4)] border-t border-white/10" style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.7) 100%)" }}>
          
          {/* HUD Header: Name & Title */}
          <div className="flex items-end justify-between border-b border-white/10 pb-3 mb-3">
            <div>
              <h3 className="font-serif text-[22px] font-bold text-white leading-none drop-shadow-md">
                {customName.trim() ? customName : avatarName}
              </h3>
              <div className="mt-1 flex items-center gap-1.5">
                <span className="text-[10px] font-black tracking-widest text-white" style={{ color: accent.color, textShadow: "0 0 10px rgba(0,0,0,0.8)" }}>{primaryCode}</span>
                <span className="text-[10px] text-white/50">•</span>
                <span className="text-[9px] font-bold uppercase tracking-widest text-white/70">{avatarDesc}</span>
              </div>
            </div>
          </div>

          {/* HUD Traits Ribbon */}
          {topTraits.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {topTraits.map(t => (
                <span key={t} className="px-2 py-0.5 text-[7px] font-bold tracking-widest text-white shadow-sm uppercase rounded" style={{ background: \`linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.02))\`, border: "1px solid rgba(255,255,255,0.15)", fontFamily: "Inter, sans-serif" }}>
                  {t}
                </span>
              ))}
            </div>
          )}

          {/* HUD Body: Split Layout (Stats vs Radar) */}
          <div className="flex items-center gap-4 mb-4">
            
            {/* Left: Stats List */}
            <div className="flex-1 flex flex-col gap-2">
              {cats.map(c => {
                const result = categoryResults[c.id];
                return (
                  <div key={c.id} className="flex justify-between items-end">
                    <span className="text-[7.5px] font-bold uppercase tracking-widest text-white/60" style={{ fontFamily: "Inter, sans-serif" }}>
                      {SHORT_NAMES[c.id] || c.name}
                    </span>
                    <span className="text-[10px] font-black text-white" style={{ fontFamily: "Inter, sans-serif" }}>
                      {result?.code || "—"}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Right: Compact Radar */}
            {showRadar && cats.length >= 3 && (
              <div className="shrink-0 rounded-full bg-white/5 p-1 border border-white/10" style={{ width: 80, height: 80 }}>
                <MiniRadar cats={cats} results={categoryResults} accent={accent.color} />
              </div>
            )}
          </div>

          {/* HUD Footer */}
          <div className="text-center w-full pt-1">
            <div className="text-[7px] font-bold tracking-[0.4em] text-white/30">KNOWYOURSELF.ID</div>
          </div>
          
        </div>
      </div>
    </>
  );`;

code = code.replace(/const renderCardInner = \(\) => \([\s\S]*?^\s*\);\n/m, newRenderInner + '\n');
fs.writeFileSync(file, code);
console.log('Applied Majestic Glassmorphism layout');
