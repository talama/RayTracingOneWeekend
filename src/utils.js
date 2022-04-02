import Dielectric from './dielectric.js';
import HittableList from './hittableList.js';
import Lambert from './lambert.js';
import Metal from './metal.js';
import Sphere from './sphere.js';
import Vec3 from './vec3.js';

const EPSILON = 0.00001;

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
function writePixel(pixelColor, samples, gamma) {
  let r = pixelColor.x;
  let g = pixelColor.y;
  let b = pixelColor.z;

  // Divide the color by the number of spamples and gamma correct for gamma = 2.0
  // (color ^ 1/gamma  -> color ^ 1/2 -> sqrt(color))
  const scale = 1.0 / samples;
  if (gamma === 2) {
    r = Math.sqrt(r * scale);
    g = Math.sqrt(g * scale);
    b = Math.sqrt(b * scale);
  } else {
    r = (r * scale) ** (1 / gamma);
    g = (g * scale) ** (1 / gamma);
    b = (b * scale) ** (1 / gamma);
  }

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
  const hitRec = world.hit(ray, 0.1, Infinity);
  // if we reach the ray bounce limith return black (no more light is gathered).
  if (depth <= 0) return new Vec3();
  if (hitRec !== null) {
    // if we get a hit start bouncing off based on the hitRecord material scatter() function.
    // and stop bouncing when we dont hit anything or when we reach the depth limit.
    // Diminish the color contribution of every bounce by the material attenuation.
    const scatter = hitRec.material.scatter(ray, hitRec);
    if (scatter !== null) {
      const attenuation = hitRec.material.color;
      return rayColor(scatter, world, depth - 1).multiply(
        attenuation,
      );
    }
    return new Vec3();
  }

  // Blends white and blue depending on the height of the y coordinate after scaling the ray direction to unit length
  // (−1.0 < y < 1.0). Because we're looking at the y height after normalizing the vector, we will have a horizontal gradient
  // to the color in addition to the vertical gradient. We scale the result to the range (0.0 < t < 10).
  //
  // blendedValue=(1−t) * startValue + t * endValue
  const direction = ray.direction.normalize();
  const t = 0.5 * (direction.y + 1.0);
  const comp1 = new Vec3(1.0, 1.0, 1.0).scale(1.0 - t);
  const comp2 = new Vec3(0.5, 0.7, 1.0).scale(t);
  return comp1.add(comp2);
}

/**
 * Creates a random scene
 *
 */
function randomScene() {
  const world = new HittableList();

  // ground
  const groundMat = new Lambert(new Vec3(0.5, 0.5, 0.5));
  const ground = new Sphere(new Vec3(0, -1000, 0), 1000, groundMat);
  world.add(ground);

  for (let a = -11; a < 11; a += 1) {
    for (let b = -11; b < 11; b += 1) {
      const chooseMat = Math.random();
      const center = new Vec3(
        a + 0.9 * Math.random(),
        0.2,
        b + 0.9 * Math.random(),
      );

      if (center.subtract(new Vec3(4, 0.2, 0)).length() > 0.9) {
        let sphereMat = null;
        const color = Vec3.random().multiply(Vec3.random());
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
          sphereMat = new Dielectric(new Vec3(1.0, 1.0, 1.0), 1.52);
          world.add(new Sphere(center, 0.2, sphereMat));
        }
      }
    }
  }
  const mat1 = new Dielectric();
  world.add(new Sphere(new Vec3(0, 1, 0), 1, mat1));
  const mat2 = new Lambert(new Vec3(0.4, 0.2, 0.1));
  world.add(new Sphere(new Vec3(-4, 1, 0), 1, mat2));
  const mat3 = new Metal(new Vec3(0.7, 0.6, 0.5), 0);
  world.add(new Sphere(new Vec3(4, 1, 0), 1, mat3));

  return world;
}

export { EPSILON, degreeToRad, writePixel, rayColor, randomScene };
