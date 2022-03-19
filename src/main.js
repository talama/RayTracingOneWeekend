import { rayColor, writePixel } from './utils.js';
import * as vec3 from './vec3.js';
import { ray } from './ray.js';

(function () {
  //Image
  const aspectRatio = 16.0 / 9.0;
  const imageWidth = 400;
  const imageHeight = Math.round(imageWidth / aspectRatio);

  // Camera
  const viewportHeight = 2.0;
  const viewportWidth = aspectRatio * viewportHeight;
  const focalLength = 1.0;
  const origin = vec3.create();
  const horizontal = vec3.fromValues(viewportWidth, 0, 0);
  const vertical = vec3.fromValues(0, viewportHeight, 0);

  let lowerLeft = vec3.subtract(
    vec3.create(),
    origin,
    vec3.scale(vec3.create(), horizontal, 0.5),
  );

  lowerLeft = vec3.subtract(
    vec3.create(),
    lowerLeft,
    vec3.scale(vec3.create(), vertical, 0.5),
  );
  lowerLeft = vec3.subtract(
    vec3.create(),
    lowerLeft,
    vec3.fromValues(0, 0, focalLength),
  );

  const ppmHeader = `P3\n${imageWidth} ${imageHeight}\n255\n`;
  // Render
  console.log(ppmHeader);
  for (let y = imageHeight - 1; y >= 0; y -= 1) {
    console.error('Scanline remaining: ', y);
    for (let x = 0; x < imageWidth; x += 1) {
      const u = x / (imageWidth - 1);
      const v = y / (imageHeight - 1);
      const xComp = vec3.scale(vec3.create(), horizontal, u);
      const yComp = vec3.scale(vec3.create(), vertical, v);
      let direction = vec3.add(vec3.create(), lowerLeft, xComp);
      direction = vec3.add(vec3.create(), direction, yComp);
      direction = vec3.subtract(vec3.create(), direction, origin);
      const r = new ray(origin, direction);
      const pixelColor = rayColor(r);
      console.log(writePixel(pixelColor));
    }
  }
})();
