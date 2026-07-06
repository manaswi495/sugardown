const sharp = require('sharp');
const path = require('path');

const input = 'd:/SG/logo.png';
const outputs = [
  'apps/frontend/public/logo.png',
  'apps/admin/public/logo.png'
];

async function removeWhiteBackground() {
  // Get raw pixel data
  const { data, info } = await sharp(input)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;

  // Make white/near-white pixels transparent with a higher threshold
  for (let i = 0; i < data.length; i += channels) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    // Remove white and all very light/near-white pixels
    if (r > 180 && g > 180 && b > 180) {
      data[i + 3] = 0; // alpha = 0 (transparent)
    }
  }

  const result = await sharp(data, {
    raw: { width, height, channels }
  }).png().toBuffer();

  for (const out of outputs) {
    require('fs').mkdirSync(require('path').dirname(out), { recursive: true });
    require('fs').writeFileSync(out, result);
    console.log('Written:', out);
  }
  console.log('Done!');
}

removeWhiteBackground().catch(console.error);
