/* eslint-disable import/extensions */
import fs from 'fs';
import { performance } from 'perf_hooks';
import Vec3 from './vec3.js';
import { rayColor, writePixel, randomScene } from './utils.js';
import Camera from './camera.js';

(function () {
  // Image
  const aspectRatio = 16.0 / 9.0;
  const imageWidth = 100;
  const imageHeight = Math.round(imageWidth / aspectRatio);
  const samples = 100;
  const maxDepth = 25;
  const gamma = 2.0;
  const ppmHeader = `P3\n${imageWidth} ${imageHeight}\n255\n`;

  // World
  const world = randomScene();

  // Camera
  const lookFrom = new Vec3(13, 2, 3);
  const lookAt = new Vec3(0, 0, 0);
  const vUp = new Vec3(0, 1, 0);
  const focusDist = 10.0;
  const aperture = 0.1;
  const vFov = 20.0;

  const cam = new Camera(
    lookFrom,
    lookAt,
    vUp,
    vFov,
    aspectRatio,
    aperture,
    focusDist,
  );

  // Render
  const t0 = performance.now();
  const writeStream = fs.createWriteStream('./imgs/test.ppm');
  // console.log(ppmHeader);
  writeStream.write(ppmHeader);
  for (let y = imageHeight - 1; y >= 0; y -= 1) {
    console.error('Scanline remaining: ', y);
    for (let x = 0; x < imageWidth; x += 1) {
      let pixelColor = new Vec3();
      for (let s = 0; s < samples; s += 1) {
        const u = (x + Math.random()) / imageWidth;
        const v = (y + Math.random()) / imageHeight;
        const ray = cam.getRay(u, v);
        pixelColor = rayColor(ray, world, maxDepth).add(pixelColor);
      }
      writeStream.write(
        `${writePixel(pixelColor, samples, gamma)}\n`,
      );
      // console.log(`${writePixel(pixelColor, samples)}`);
    }
  }
  writeStream.end();
  const t1 = performance.now();
  let seconds = (t1 - t0) / 1000;
  let minutes = 0;
  if (seconds > 60) {
    minutes = Math.floor(seconds / 60);
    seconds = Math.floor(seconds % 60);
  }
  console.error(
    `${t1 - t0}milliseconds = ${minutes} min and ${seconds} sec`,
  );
})();
