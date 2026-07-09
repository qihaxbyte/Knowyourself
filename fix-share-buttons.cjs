const fs = require('fs');
const file = 'src/app/components/share-card.tsx';
let code = fs.readFileSync(file, 'utf8');

const replacement = `          <img
            src={generatedImgUrl}
            alt="Your Soul Card"
            className="max-h-[60vh] w-auto max-w-full rounded-2xl shadow-2xl mb-4"
          />
          <button
            onClick={async () => {
              try {
                const res = await fetch(generatedImgUrl);
                const blob = await res.blob();
                const file = new File([blob], \`SoulCard_\${primaryCode}.png\`, { type: "image/png" });
                if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
                  await navigator.share({
                    title: \`Soul Card — \${primaryCode}\`,
                    text: \`Aku adalah \${primaryCode} "\${primaryName}" di KnowYourself! 🌟 Cek punyamu yuk!\`,
                    files: [file]
                  });
                } else {
                  alert("Browser Anda tidak mendukung Share API. Gunakan fitur 'Tahan & Simpan'.");
                }
              } catch (e) {
                console.error(e);
              }
            }}
            className="w-full max-w-xs flex items-center justify-center gap-2 rounded-xl py-3 font-bold text-white shadow-lg transition hover:scale-105 active:scale-95"
            style={{ background: "linear-gradient(135deg, #10B981, #059669)" }}
          >
            <Share2 className="h-5 w-5" /> Bagikan ke IG / WA
          </button>`;

code = code.replace(/<img\s+src=\{generatedImgUrl\}[\s\S]*?\/>/, replacement);
fs.writeFileSync(file, code);
console.log('Fixed Share Buttons');
