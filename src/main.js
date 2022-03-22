import { rayColor, writePixel } from './utils.js';
import Vec3 from './vec3.js';
import Ray from './ray.js';
import Hittable from './hittable.js';
import HittableList from './hittableList.js';
import Sphere from './sphere.js';

(function () {
  //Image
  const aspectRatio = 16.0 / 9.0;
  const imageWidth = 400;
  const imageHeight = Math.round(imageWidth / aspectRatio);

  // World
  const world = new HittableList();
  const sphere1 = new Sphere(Vec3.fromValues(0, 0, -1), 0.5);
  const sphere2 = new Sphere(Vec3.fromValues(0, -100.5, -1), 100);
  world.add(sphere1);
  world.add(sphere2);

  // Camera
  const viewportHeight = 2.0;
  const viewportWidth = aspectRatio * viewportHeight;
  const focalLength = 1.0;

  const origin = Vec3.create();
  const horizontal = Vec3.fromValues(viewportWidth, 0, 0);
  const vertical = Vec3.fromValues(0, viewportHeight, 0);
  const halfHorizontal = horizontal.scale(Vec3.create(), 0.5);
  const halfvertical = vertical.scale(Vec3.create(), 0.5);

  const lowerLeft = origin
    .subtract(Vec3.create(), halfHorizontal)
    .subtract(Vec3.create(), halfvertical)
    .subtract(Vec3.create(), Vec3.fromValues(0, 0, focalLength));

  const ppmHeader = `P3\n${imageWidth} ${imageHeight}\n255\n`;

  // Render
  let t0 = performance.now();
  console.log(ppmHeader);
  for (let y = imageHeight - 1; y >= 0; y -= 1) {
    console.error('Scanline remaining: ', y);
    for (let x = 0; x < imageWidth; x += 1) {
      const u = x / (imageWidth - 1);
      const v = y / (imageHeight - 1);
      const xCoord = horizontal.scale(Vec3.create(), u);
      const yCoord = vertical.scale(Vec3.create(), v);
      const direction = lowerLeft
        .add(Vec3.create(), xCoord)
        .add(Vec3.create(), yCoord);
      const ray = new Ray(origin, direction);
      const pixelColor = rayColor(ray, world);
      console.log(writePixel(pixelColor));
    }
  }
  let t1 = performance.now();
  console.error(t1 - t0);
})();
