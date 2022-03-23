import { rayColor, writePixel } from './utils.js';
import Vec3 from './vec3.js';
import Ray from './ray.js';
import HittableList from './hittableList.js';
import Sphere from './sphere.js';
import Camera from './camera.js';

(function () {
  //Image
  const aspectRatio = 16.0 / 9.0;
  const imageWidth = 400;
  const imageHeight = Math.round(imageWidth / aspectRatio);
  const samples = 100;
  const ppmHeader = `P3\n${imageWidth} ${imageHeight}\n255\n`;

  // World
  const world = new HittableList();
  const sphere1 = new Sphere(Vec3.fromValues(0, 0, -1), 0.5);
  const sphere2 = new Sphere(Vec3.fromValues(0, -100.5, -1), 100);
  world.add(sphere1);
  world.add(sphere2);

  // Camera
  const cam = new Camera();

  // Render
  let t0 = performance.now();
  console.log(ppmHeader);
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
          rayColor(ray, world),
        );
      }
      // console.error(writePixel(pixelColor, samples));
      console.log(writePixel(pixelColor, samples));
    }
  }
  let t1 = performance.now();
  console.error(t1 - t0);
})();
