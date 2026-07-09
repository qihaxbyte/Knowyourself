const Jimp = require('jimp');
const fs = require('fs');

async function makeTransparent(input, output) {
  try {
    const image = await Jimp.read(input);
    const width = image.bitmap.width;
    const height = image.bitmap.height;
    
    const bgColor = image.getPixelColor(0, 0);
    const bgR = Jimp.intToRGBA(bgColor).r;
    const bgG = Jimp.intToRGBA(bgColor).g;
    const bgB = Jimp.intToRGBA(bgColor).b;

    if (bgR < 240 || bgG < 240 || bgB < 240) {
      console.log(`Background doesn't look white for ${input}, skipping flood fill...`);
      fs.copyFileSync(input, output);
      return;
    }

    const replacementColor = 0x00000000; 
    
    const queue = [[0, 0]];
    const visited = new Set();
    
    image.setPixelColor(replacementColor, 0, 0);
    visited.add('0,0');
    
    const dirs = [[1,0], [-1,0], [0,1], [0,-1]];
    let head = 0;
    
    while (head < queue.length) {
      const [x, y] = queue[head++];
      
      for (const [dx, dy] of dirs) {
        const nx = x + dx;
        const ny = y + dy;
        
        if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
          const key = `${nx},${ny}`;
          if (!visited.has(key)) {
            visited.add(key);
            const pColor = image.getPixelColor(nx, ny);
            const rgba = Jimp.intToRGBA(pColor);
            
            if (Math.abs(rgba.r - bgR) < 15 && Math.abs(rgba.g - bgG) < 15 && Math.abs(rgba.b - bgB) < 15 && rgba.a > 0) {
              image.setPixelColor(replacementColor, nx, ny);
              queue.push([nx, ny]);
            }
          }
        }
      }
    }
    
    await image.writeAsync(output);
    console.log(`Processed ${output}`);
  } catch (err) {
    console.error(`Error processing ${input}:`, err);
  }
}

async function main() {
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
  
  for (const file of files) {
    await makeTransparent(file.in, file.out);
  }
}

main();
