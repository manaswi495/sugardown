import { Jimp } from 'jimp';

async function removeBackground() {
  const imagePath = 'public/logo.png';
  const image = await Jimp.read(imagePath);
  
  // Make white transparent
  image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
    const r = this.bitmap.data[idx + 0];
    const g = this.bitmap.data[idx + 1];
    const b = this.bitmap.data[idx + 2];

    // If pixel is very close to white, make it transparent
    if (r > 230 && g > 230 && b > 230) {
      this.bitmap.data[idx + 3] = 0; // alpha to 0
    }
  });

  // Autocrop the transparent area
  image.autocrop();
  
  await image.write(imagePath);
  console.log('Background removed and image cropped!');
}

removeBackground().catch(console.error);
