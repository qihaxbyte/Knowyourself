const { Jimp } = require('jimp');
const path = require('path');

async function fixVampire() {
  const file = path.join(__dirname, 'public', 'assets', 'sprites', 'vampire.png');
  
  try {
    const img = await Jimp.read(file);
    const w = img.bitmap.width;
    const h = img.bitmap.height;
    
    let whitePixelsReplaced = 0;
    
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const idx = (y * w + x) * 4;
        
        // Skip already transparent pixels
        if (img.bitmap.data[idx + 3] === 0) continue;
        
        const r = img.bitmap.data[idx];
        const g = img.bitmap.data[idx + 1];
        const b = img.bitmap.data[idx + 2];
        
        // Check for pure or near-pure white (background artifacts)
        // Background gaps left by AI are usually pure white > 240
        if (r > 240 && g > 240 && b > 240) {
          const max = Math.max(r, g, b);
          const min = Math.min(r, g, b);
          // Ensure it has very low saturation (it's grayscale white, not just a bright color)
          if (max - min < 15) {
             img.bitmap.data[idx + 3] = 0; // Make transparent
             whitePixelsReplaced++;
          }
        }
      }
    }
    
    // Feather the edges of the newly created gaps to make it smooth
    let edges = [];
    for (let y = 1; y < h - 1; y++) {
      for (let x = 1; x < w - 1; x++) {
        const pIdx = (y * w + x) * 4;
        if (img.bitmap.data[pIdx + 3] > 0) {
          const r = img.bitmap.data[pIdx];
          const g = img.bitmap.data[pIdx + 1];
          const b = img.bitmap.data[pIdx + 2];
          
          if (r > 150 && g > 150 && b > 150) { // If it's a light fringe
            let hasTransparentNeighbor = false;
            if (img.bitmap.data[((y)*w + x+1)*4 + 3] === 0) hasTransparentNeighbor = true;
            if (img.bitmap.data[((y)*w + x-1)*4 + 3] === 0) hasTransparentNeighbor = true;
            if (img.bitmap.data[((y+1)*w + x)*4 + 3] === 0) hasTransparentNeighbor = true;
            if (img.bitmap.data[((y-1)*w + x)*4 + 3] === 0) hasTransparentNeighbor = true;
            
            if (hasTransparentNeighbor) {
               edges.push(pIdx);
            }
          }
        }
      }
    }
    
    for (const pIdx of edges) {
       // Reduce opacity of the light fringes
       img.bitmap.data[pIdx + 3] = 100;
    }

    await img.write(file);
    console.log(`Successfully fixed vampire.png! Removed ${whitePixelsReplaced} white pixels.`);
  } catch (err) {
    console.error("Error:", err);
  }
}

fixVampire();
