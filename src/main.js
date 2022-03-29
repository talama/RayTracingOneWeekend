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
  const leftMat = new Metal(Vec3.fromValues(0.8, 0.8, 0.8), 0.3);
  const glass = new Dielectric();
  const rightMat = new Metal(Vec3.fromValues(0.8, 0.6, 0.2), 0.0);

  const ground = new Sphere(
    Vec3.fromValues(0.0, -100.5, -1.0),
    100.0,
    groundMat,
  );
  const centerSphere = new Sphere(
    Vec3.fromValues(0.0, 0.0, -1.0),
    0.5,
    centerMat,
  );
  const leftSphere = new Sphere(
    Vec3.fromValues(-1.0, 0.0, -1.0),
    0.5,
    glass,
  );
  const leftSphereInner = new Sphere(
    Vec3.fromValues(-1.0, 0.0, -1.0),
    -0.4,
    glass,
  );
  const rightSphere = new Sphere(
    Vec3.fromValues(1.0, 0.0, -1.0),
    0.5,
    rightMat,
  );

  world.add(ground);
  world.add(centerSphere);
  world.add(leftSphere);
  world.add(leftSphereInner);
  world.add(rightSphere);

  // Camera
  const lookFrom = Vec3.fromValues(3, 3, 2);
  const lookAt = Vec3.fromValues(0, 0, -1);
  const vUp = Vec3.fromValues(0, 1, 0);
  const aperture = 2.0;
  const focusDist = lookFrom.subtract(Vec3.create(), lookAt).length();
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
  const writeStream = fs.createWriteStream('./imgs/dof.ppm');
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
