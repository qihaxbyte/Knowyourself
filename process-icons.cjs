const { removeBackground } = require('@imgly/background-removal-node');
const fs = require('fs');
const path = require('path');

async function processIcons() {
  const destDir = path.join(__dirname, 'public', 'assets', 'icons');
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  const files = [
    { in: 'C:/Users/Jun/.gemini/antigravity-ide/brain/22c949d6-a6c8-4448-abb1-f24227a7163e/icon_beranda_1783350782502.png', out: 'public/assets/icons/nav_beranda.png' },
    { in: 'C:/Users/Jun/.gemini/antigravity-ide/brain/22c949d6-a6c8-4448-abb1-f24227a7163e/icon_perjalanan_1783350791396.png', out: 'public/assets/icons/nav_perjalanan.png' },
    { in: 'C:/Users/Jun/.gemini/antigravity-ide/brain/22c949d6-a6c8-4448-abb1-f24227a7163e/icon_guide_1783350801866.png', out: 'public/assets/icons/nav_guide.png' },
    { in: 'C:/Users/Jun/.gemini/antigravity-ide/brain/22c949d6-a6c8-4448-abb1-f24227a7163e/icon_profil_1783350810895.png', out: 'public/assets/icons/nav_profil.png' },
    { in: 'C:/Users/Jun/.gemini/antigravity-ide/brain/22c949d6-a6c8-4448-abb1-f24227a7163e/icon_basis_1783350823165.png', out: 'public/assets/icons/nav_basis.png' }
  ];

  for (const file of files) {
    if (!fs.existsSync(file.in)) {
        console.error(`File not found: ${file.in}`);
        continue;
    }
    
    console.log(`Processing ${file.out} with AI...`);
    try {
      const bufferInput = fs.readFileSync(file.in);
      const blobInput = new Blob([bufferInput], { type: 'image/png' });
      const blob = await removeBackground(blobInput, {
        debug: false,
        model: "medium",
        output: { format: "image/png" }
      });
      
      const buffer = Buffer.from(await blob.arrayBuffer());
      fs.writeFileSync(file.out, buffer);
      console.log(`Successfully saved ${file.out}`);
    } catch (err) {
      console.error(`Failed on ${file.out}`, err);
    }
  }
}

processIcons();
