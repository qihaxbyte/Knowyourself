const fs = require('fs');
const file = 'src/app/components/share-card.tsx';
let code = fs.readFileSync(file, 'utf8');

// Add useBase64Image hook
if (!code.includes('useBase64Image')) {
  code = code.replace(
    /export default function ShareCard/,
    `function useBase64Image(url) {
  const [base64, setBase64] = React.useState("");
  React.useEffect(() => {
    if (!url) return;
    fetch(url)
      .then(res => res.blob())
      .then(blob => {
        const reader = new FileReader();
        reader.onloadend = () => setBase64(reader.result);
        reader.readAsDataURL(blob);
      })
      .catch(err => console.error(err));
  }, [url]);
  return base64 || url;
}

export default function ShareCard`
  );
  
  // Add React import if needed
  if (!code.includes('import React')) {
    code = code.replace('import { useState', 'import React, { useState');
  }
}

// Replace bg.url with base64
code = code.replace(/const topTraits = (.*?);/s, `const topTraits = $1;\n  const bgBase64Url = useBase64Image(bg.url);`);
code = code.replace(/<img\s+src=\{bg\.url\}\s+alt=""\s+crossOrigin="anonymous"/g, `<img src={bgBase64Url} alt="" `);
// sometimes crossOrigin might be missing or on next line, replace just src={bg.url} if needed
if(code.includes('src={bg.url}')) {
  code = code.replace(/src=\{bg\.url\}/g, `src={bgBase64Url}`);
}
code = code.replace(/crossOrigin="anonymous"/g, "");

// Add AdventurerAvatar
if (!code.includes('AdventurerAvatar')) {
  code = code.replace(/avatarContent = \(\s*<img\s+src=\{mbtiSprite\}.*?\/>\s*\);/gs, `avatarContent = <AdventurerAvatar src={mbtiSprite} fallback={defaultSprite} />;`);
  
  code += `\nfunction AdventurerAvatar({ src, fallback }: { src: string, fallback: string }) {
  const [useFallback, setUseFallback] = React.useState(false);
  const currentUrl = useFallback ? fallback : src;
  const base64Url = useBase64Image(currentUrl);
  return (
    <img
      src={base64Url || src}
      onError={() => { if (!useFallback) setUseFallback(true); }}
      alt="Adventurer"
      className="h-28 w-28 object-contain"
      style={{ imageRendering: "pixelated" }}
    />
  );
}\n`;
}

// Update fixed clone visibility
code = code.replace(/opacity:\s*0\.01,\s*pointerEvents:\s*"none",\s*zIndex:\s*-100/g, 'opacity: 1, pointerEvents: "none", zIndex: -9999');

fs.writeFileSync(file, code);
console.log('Fixed Safari Base64');
