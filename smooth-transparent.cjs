const Jimp = require('jimp');
const fs = require('fs');
const path = require('path');

function colorDistance(c1, c2) {
  const r1 = (c1 >> 24) & 255;
  const g1 = (c1 >> 16) & 255;
  const b1 = (c1 >> 8) & 255;
  
  const r2 = (c2 >> 24) & 255;
  const g2 = (c2 >> 16) & 255;
  const b2 = (c2 >> 8) & 255;
  
  return Math.sqrt(Math.pow(r1 - r2, 2) + Math.pow(g1 - g2, 2) + Math.pow(b1 - b2, 2));
}

async function makeTransparent(input, output) {
  try {
    const img = await Jimp.read(input);
    const w = img.bitmap.width;
    const h = img.bitmap.height;

    // Find background color
    let borderColors = {};
    for (let x = 0; x < w; x++) {
      let c1 = img.getPixelColor(x, 0);
      let c2 = img.getPixelColor(x, h - 1);
      borderColors[c1] = (borderColors[c1] || 0) + 1;
      borderColors[c2] = (borderColors[c2] || 0) + 1;
    }
    for (let y = 0; y < h; y++) {
      let c1 = img.getPixelColor(0, y);
      let c2 = img.getPixelColor(w - 1, y);
      borderColors[c1] = (borderColors[c1] || 0) + 1;
      borderColors[c2] = (borderColors[c2] || 0) + 1;
    }
    let bgColorStr = Object.keys(borderColors).reduce((a, b) => borderColors[a] > borderColors[b] ? a : b);
    let bgColor = parseInt(bgColorStr, 10);

    let visited = new Uint8Array(w * h);
    let queue = [];

    // Step 1: Strict flood fill to remove pure background
    function tryEnqueue(x, y) {
      if (x < 0 || x >= w || y < 0 || y >= h) return;
      const idx = y * w + x;
      if (visited[idx]) return;
      
      const c = img.getPixelColor(x, y);
      const rgba = Jimp.intToRGBA(c);
      const isWhite = rgba.r > 240 && rgba.g > 240 && rgba.b > 240;
      
      // Strict distance
      if (colorDistance(c, bgColor) < 20 || isWhite) {
        visited[idx] = 1;
        queue.push({ x, y });
      }
    }

    for (let x = 0; x < w; x++) {
      tryEnqueue(x, 0);
      tryEnqueue(x, h - 1);
    }
    for (let y = 0; y < h; y++) {
      tryEnqueue(0, y);
      tryEnqueue(w - 1, y);
    }

    let qIdx = 0;
    while (qIdx < queue.length) {
      const { x, y } = queue[qIdx++];
      const pIdx = (y * w + x) * 4;
      img.bitmap.data[pIdx + 3] = 0; // alpha = 0

      tryEnqueue(x + 1, y);
      tryEnqueue(x - 1, y);
      tryEnqueue(x, y + 1);
      tryEnqueue(x, y - 1);
    }

    // Step 2: Edge feathering (alpha blending)
    // Find all non-transparent pixels that border a transparent pixel
    for (let pass = 0; pass < 2; pass++) {
      let edges = [];
      for (let y = 1; y < h - 1; y++) {
        for (let x = 1; x < w - 1; x++) {
          const pIdx = (y * w + x) * 4;
          if (img.bitmap.data[pIdx + 3] > 0) { // If visible
            let hasTransparentNeighbor = false;
            if (img.bitmap.data[((y)*w + x+1)*4 + 3] === 0) hasTransparentNeighbor = true;
            if (img.bitmap.data[((y)*w + x-1)*4 + 3] === 0) hasTransparentNeighbor = true;
            if (img.bitmap.data[((y+1)*w + x)*4 + 3] === 0) hasTransparentNeighbor = true;
            if (img.bitmap.data[((y-1)*w + x)*4 + 3] === 0) hasTransparentNeighbor = true;
            
            if (hasTransparentNeighbor) {
              edges.push({x, y, pIdx});
            }
          }
        }
      }

      // Smooth the edges based on brightness
      for (const {x, y, pIdx} of edges) {
        const r = img.bitmap.data[pIdx];
        const g = img.bitmap.data[pIdx + 1];
        const b = img.bitmap.data[pIdx + 2];
        const luminance = (r + g + b) / 3;
        
        // If the edge pixel is very light (white/gray fringe), make it highly transparent
        if (luminance > 120) {
           // map luminance 120->255 to alpha 255->0
           let alpha = Math.max(0, 255 - ((luminance - 120) * 2));
           img.bitmap.data[pIdx + 3] = alpha;
        }
      }
    }

    await img.writeAsync(output);
    console.log(`Processed ${output}`);
  } catch (e) {
    console.error(`Error processing ${input}:`, e);
  }
}

async function main() {
  const destDir = path.join(__dirname, 'public', 'assets', 'sprites');
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  const files = [
    { in: 'C:/Users/Jun/.gemini/antigravity-ide/brain/22c949d6-a6c8-4448-abb1-f24227a7163e/media__1783274839146.png', out: 'public/assets/sprites/golem.png' },
    { in: 'C:/Users/Jun/.gemini/antigravity-ide/brain/22c949d6-a6c8-4448-abb1-f24227a7163e/media__1783274839200.png', out: 'public/assets/sprites/vampire.png' },
    { in: 'C:/Users/Jun/.gemini/antigravity-ide/brain/22c949d6-a6c8-4448-abb1-f24227a7163e/media__1783274839238.png', out: 'public/assets/sprites/werewolf.png' },
    { in: 'C:/Users/Jun/.gemini/antigravity-ide/brain/22c949d6-a6c8-4448-abb1-f24227a7163e/media__1783274839296.png', out: 'public/assets/sprites/angel.png' },
    { in: 'C:/Users/Jun/.gemini/antigravity-ide/brain/22c949d6-a6c8-4448-abb1-f24227a7163e/media__1783274839331.png', out: 'public/assets/sprites/barbarian.png' },
    { in: 'C:/Users/Jun/.gemini/antigravity-ide/brain/22c949d6-a6c8-4448-abb1-f24227a7163e/media__1783274997423.png', out: 'public/assets/sprites/tree.png' },
    { in: 'C:/Users/Jun/.gemini/antigravity-ide/brain/22c949d6-a6c8-4448-abb1-f24227a7163e/media__1783275004205.png', out: 'public/assets/sprites/ghost.png' },
    { in: 'C:/Users/Jun/.gemini/antigravity-ide/brain/22c949d6-a6c8-4448-abb1-f24227a7163e/media__1783275023747.png', out: 'public/assets/sprites/griffin.png' }
  ];
  
  files.push({ in: 'src/imports/Knight.png', out: 'public/assets/sprites/knight.png' });
  files.push({ in: 'src/imports/Qilin.png', out: 'public/assets/sprites/qilin.png' });
  files.push({ in: 'src/imports/Wizard.png', out: 'public/assets/sprites/wizard.png' });

  for (const file of files) {
    if (fs.existsSync(file.in)) {
      await makeTransparent(file.in, file.out);
    }
  }
}

main();
