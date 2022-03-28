import { rayColor, writePixel } from './utils.js';
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
  const imageWidth = 400;
  const imageHeight = Math.round(imageWidth / aspectRatio);
  const samples = 100;
  const maxDepth = 50;
  const ppmHeader = `P3\n${imageWidth} ${imageHeight}\n255\n`;

  // World
  const world = new HittableList();
  const groundMat = new Lambert(Vec3.fromValues(0.8, 0.8, 0.0));
  const centerMat = new Lambert(Vec3.fromValues(0.1, 0.2, 0.5));
  const leftMat = new Lambert(Vec3.fromValues(0, 0, 1));
  const glass = new Dielectric();
  const rightMat = new Lambert(Vec3.fromValues(1, 0, 0));

  const R = Math.cos(Math.PI / 4);
  const leftSphere = new Sphere(
    Vec3.fromValues(-R, 0, -1),
    R,
    leftMat,
  );
  const rightSphere = new Sphere(
    Vec3.fromValues(R, 0, -1),
    R,
    rightMat,
  );

  world.add(leftSphere);
  world.add(rightSphere);

  // Camera
  const cam = new Camera(90.0);
  // Render
  let t0 = performance.now();
  const writeStream = fs.createWriteStream('./imgs/fov.ppm');
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
