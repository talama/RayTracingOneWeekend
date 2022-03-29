import { rayColor, writePixel, randomScene } from './utils.js';
import Vec3 from './vec3.js';
import HittableList from './hittableList.js';
import Sphere from './sphere.js';
import Camera from './camera.js';
import fs from 'fs';
import Lambert from './lambert.js';
import Metal from './metal.js';
import Dielectric from './dielectric.js';

(async function () {
  //Image
  const aspectRatio = 16.0 / 9.0;
  const imageWidth = 1200;
  const imageHeight = Math.round(imageWidth / aspectRatio);
  const samples = 100;
  const maxDepth = 50;
  const ppmHeader = `P3\n${imageWidth} ${imageHeight}\n255\n`;

  // World
  const world = randomScene();

  // Camera
  const lookFrom = Vec3.fromValues(13, 2, 3);
  const lookAt = Vec3.fromValues(0, 0, 0);
  const vUp = Vec3.fromValues(0, 1, 0);
  const focusDist = 10.0;
  const aperture = 0.0;

  const cam = new Camera(
    lookFrom,
    lookAt,
    vUp,
    20,
    aspectRatio,
    aperture,
    focusDist,
  );

  // Render
  let t0 = performance.now();
  const writeStream = fs.createWriteStream('./imgs/final.ppm');
  // console.log(ppmHeader);
  writeStream.write(ppmHeader);
  for (let y = imageHeight - 1; y >= 0; y -= 1) {
    console.error('Scanline remaining: ', y);
    for (let x = 0; x < imageWidth; x += 1) {
      let pixelColor = Vec3.create();
      for (let s = 0; s < samples; s += 1) {
        const u = (x + Math.random()) / imageWidth;
        const v = (y + Math.random()) / imageHeight;
        const ray = cam.getRay(u, v);
        pixelColor = pixelColor.add(
          Vec3.create(),
          rayColor(ray, world, maxDepth),
        );
      }
      writeStream.write(`${writePixel(pixelColor, samples)}\n`);
      // console.log(`${writePixel(pixelColor, samples)}`);
    }
  }
  writeStream.end();
  let t1 = performance.now();
  console.error(t1 - t0);
})();
