import Jimp from 'jimp';
import fs from 'fs';

async function makeTransparent(input, output) {
  try {
    const image = await Jimp.read(input);
    const width = image.bitmap.width;
    const height = image.bitmap.height;
    
    // Find the first white pixel
    let startX = -1, startY = -1;
    let found = false;
    for(let y=0; y<height && !found; y++) {
      for(let x=0; x<width && !found; x++) {
          const pColor = image.getPixelColor(x, y);
          const rgba = Jimp.intToRGBA(pColor);
          if(rgba.r > 240 && rgba.g > 240 && rgba.b > 240 && rgba.a > 0) {
              startX = x;
              startY = y;
              found = true;
          }
      }
    }
    
    if (!found) {
      console.log(`No white background found for ${input}, just copying...`);
      fs.copyFileSync(input, output);
      return;
    }

    const bgR = 255, bgG = 255, bgB = 255;
    console.log(`Found white background starting at ${startX},${startY} for ${input}`);

    const replacementColor = 0x00000000; 
    
    const queue = [[startX, startY]];
    const visited = new Set();
    
    image.setPixelColor(replacementColor, startX, startY);
    visited.add(`${startX},${startY}`);
    
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
            
            if (rgba.r > 240 && rgba.g > 240 && rgba.b > 240 && rgba.a > 0) {
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
