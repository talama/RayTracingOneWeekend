import * as utils from './utils.js';
import * as vec3 from './vec3.js';

(function () {
  const imageWidth = 256;
  const imageHeight = 256;
  const ppmHeader = `P3\n${imageWidth} ${imageHeight}\n255\n`;
  // Render
  console.log(ppmHeader);
  for (let y = imageHeight - 1; y >= 0; y -= 1) {
    console.error('Scanline remaining: ', y);
    for (let x = 0; x < imageWidth; x += 1) {
      const pixelColor = vec3.fromValues(
        x / (imageWidth - 1),
        y / (imageHeight - 1),
        0.25,
      );
      console.log(utils.writePixel(pixelColor));
    }
  }
})();
