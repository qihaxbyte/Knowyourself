const { removeBackground } = require('@imgly/background-removal-node');
const fs = require('fs');
const path = require('path');

async function processWithAI() {
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
    { in: 'C:/Users/Jun/.gemini/antigravity-ide/brain/22c949d6-a6c8-4448-abb1-f24227a7163e/media__1783275023747.png', out: 'public/assets/sprites/griffin.png' },
    { in: 'src/imports/Knight.png', out: 'public/assets/sprites/knight.png' },
    { in: 'src/imports/Qilin.png', out: 'public/assets/sprites/qilin.png' },
    { in: 'src/imports/Wizard.png', out: 'public/assets/sprites/wizard.png' }
  ];

  for (const file of files) {
    if (!fs.existsSync(file.in)) continue;
    
    console.log(`Processing ${file.out} with AI...`);
    try {
      const bufferInput = fs.readFileSync(file.in);
      const blobInput = new Blob([bufferInput], { type: 'image/png' });
      const blob = await removeBackground(blobInput, {
        debug: false,
        model: "medium",
        output: {
           format: "image/png"
        }
      });
      
      const buffer = Buffer.from(await blob.arrayBuffer());
      fs.writeFileSync(file.out, buffer);
      console.log(`Successfully saved ${file.out}`);
    } catch (err) {
      console.error(`Failed on ${file.out}`, err);
    }
  }
}

processWithAI();
