import Dielectric from './dielectric.js';
import HitRecord from './hitRecord.js';
import HittableList from './hittableList.js';
import Lambert from './lambert.js';
import Metal from './metal.js';
import Ray from './ray.js';
import Sphere from './sphere.js';
import Vec3 from './vec3.js';

const EPSILON = 0.000001;

const degree = Math.PI / 180;

// converts a angle in degrees to radians
function degreeToRad(angle) {
  return angle * degree;
}

/**
 *
 * @param {Number} num
 * @param {Number} min
 * @param {Number} max
 * @returns {Number} num clamped between min and max
 */
const clamp = function (num, min, max) {
  if (num < min) return min;
  if (num > max) return max;
  return num;
};

/**
 * Scales the color component from range [0 - 1] to range [0 - 255].
 *
 * @param {Number} num
 * @returns {Number}
 */
const ppmScale = function (num) {
  return Math.round(255 * clamp(num, 0, 1));
};

/**
 * Write a pixel to a string scaling its values
 * from the [0, 1] to the [0, 255] range
 * @param {Vec3} pixelColor
 * @returns {Strings}
 */
function writePixel(pixelColor, samples) {
  let r = pixelColor.x;
  let g = pixelColor.y;
  let b = pixelColor.z;

  // Divide the color by the number of spamples and gamma correct for gamma = 2.0
  // (color ^ 1/gamma  -> color ^ 1/2 -> sqrt(color))
  const scale = 1.0 / samples;
  r = Math.sqrt(scale * r);
  g = Math.sqrt(scale * g);
  b = Math.sqrt(scale * b);

  // write the value of each color component
  // scaled to the [0, 255] range

  return `${ppmScale(r)} ${ppmScale(g)} ${ppmScale(b)}`;
}

/**
 *
 * @param {Ray} ray
 * @param {HittableList} world
 * @returns {Vec3} - pixel color
 */
function rayColor(ray, world, depth) {
  const hitRec = world.hit(ray, EPSILON, Infinity);
  // if we reach the ray bounce limith return black (no more light is gathered).
  if (depth <= 0) return Vec3.create();
  if (hitRec !== null) {
    // if we get a hit start bouncing off based on the hitRecord material scatter() function.
    // and stop bouncing when we dont hit anything or when we reach the depth limit.
    // Diminish the color contribution of every bounce by the material attenuation.
    const scatter = hitRec.material.scatter(ray, hitRec);
    if (scatter !== null) {
      const attenuation = hitRec.material.color;
      return rayColor(scatter, world, depth - 1).multiply(
        Vec3.create(),
        attenuation,
      );
    }
    return Vec3.create();
  }

  // Blends white and blue depending on the height of the y coordinate after scaling the ray direction to unit length
  // (−1.0 < y < 1.0). Because we're looking at the y height after normalizing the vector, we will have a horizontal gradient
  // to the color in addition to the vertical gradient. We scale the result to the range (0.0 < t < 10).
  //
  // blendedValue=(1−t) * startValue + t * endValue
  const direction = ray.direction.normalize(Vec3.create());
  const t = 0.5 * (direction.y + 1.0);
  const comp1 = Vec3.fromValues(1.0, 1.0, 1.0).scale(
    Vec3.create(),
    1.0 - t,
  );
  const comp2 = Vec3.fromValues(0.5, 0.7, 1.0).scale(
    Vec3.create(),
    t,
  );
  return comp1.add(Vec3.create(), comp2);
}

/**
 * Creates a random scene
 *
 */
function randomScene() {
  const world = new HittableList();

  // ground
  const groundMat = new Lambert(Vec3.fromValues(0.5, 0.5, 0.5));
  const ground = new Sphere(
    Vec3.fromValues(0, -1000, 0),
    1000,
    groundMat,
  );
  world.add(ground);

  for (let a = -11; a < 11; a += 1) {
    for (let b = -11; b < 11; b += 1) {
      const chooseMat = Math.random();
      const center = Vec3.fromValues(
        a + 0.9 * Math.random(),
        0.2,
        b + 0.9 * Math.random(),
      );

      if (
        center
          .subtract(Vec3.create(), Vec3.fromValues(4, 0.2, 0))
          .length() > 0.9
      ) {
        let sphereMat = null;
        const color = Vec3.randomColor(Vec3.create()).multiply(
          Vec3.create(),
          Vec3.randomColor(Vec3.create()),
        );
        if (chooseMat < 0.7) {
          // diffuse
          sphereMat = new Lambert(color);
          world.add(new Sphere(center, 0.2, sphereMat));
        } else if (chooseMat < 0.9) {
          // metal
          const blur = Math.random() * 0.5;
          sphereMat = new Metal(color, blur);
          world.add(new Sphere(center, 0.2, sphereMat));
        } else {
          // glass
          const sphereMat = new Dielectric(
            Vec3.fromValues(1.0, 1.0, 1.0),
            1.52,
          );
          world.add(new Sphere(center, 0.2, sphereMat));
        }
      }
    }
  }
  const mat1 = new Dielectric();
  world.add(new Sphere(Vec3.fromValues(0, 1, 0), 1, mat1));
  const mat2 = new Lambert(Vec3.fromValues(0.4, 0.2, 0.1));
  world.add(new Sphere(Vec3.fromValues(-4, 1, 0), 1, mat2));
  const mat3 = new Metal(Vec3.fromValues(0.7, 0.6, 0.5), 0);
  world.add(new Sphere(Vec3.fromValues(4, 1, 0), 1, mat3));

  return world;
}

export { EPSILON, degreeToRad, writePixel, rayColor, randomScene };
