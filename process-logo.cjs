const Jimp = require('jimp');
const fs = require('fs');
const path = require('path');

const srcDir = "C:\\Users\\Jun\\.gemini\\antigravity-ide\\brain\\22c949d6-a6c8-4448-abb1-f24227a7163e";
const destDir = "public/assets";

if (!fs.existsSync(destDir)){
    fs.mkdirSync(destDir, { recursive: true });
}

// Find logo
const files = fs.readdirSync(srcDir).filter(f => f.startsWith('app_logo_') && f.endsWith('.png'));

async function processLogo() {
  for (const file of files) {
    const p = path.join(srcDir, file);
    try {
      const img = await Jimp.read(p);
      
      let borderColors = {};
      const w = img.bitmap.width;
      const h = img.bitmap.height;
      for (let x = 0; x < w; x++) {
        let c1 = img.getPixelColor(x, 0);
        let c2 = img.getPixelColor(x, h-1);
        borderColors[c1] = (borderColors[c1] || 0) + 1;
        borderColors[c2] = (borderColors[c2] || 0) + 1;
      }
      for (let y = 0; y < h; y++) {
        let c1 = img.getPixelColor(0, y);
        let c2 = img.getPixelColor(w-1, y);
        borderColors[c1] = (borderColors[c1] || 0) + 1;
        borderColors[c2] = (borderColors[c2] || 0) + 1;
      }
      let bgColor = Object.keys(borderColors).reduce((a, b) => borderColors[a] > borderColors[b] ? a : b);
      bgColor = parseInt(bgColor, 10);
      
      img.scan(0, 0, img.bitmap.width, img.bitmap.height, function(x, y, idx) {
        const c = img.getPixelColor(x, y);
        if (Jimp.intToRGBA(c).r > 240 && Jimp.intToRGBA(c).g > 240 && Jimp.intToRGBA(c).b > 240) {
            this.bitmap.data[idx + 3] = 0;
        } else if (c === bgColor) {
            this.bitmap.data[idx + 3] = 0;
        }
      });
      
      await img.writeAsync(path.join(destDir, "logo.png"));
      console.log(`Processed logo`);
    } catch (e) {
      console.error("Error processing " + file, e);
    }
  }
}

processLogo();
