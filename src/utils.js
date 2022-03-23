import HitRecord from './hitRecord.js';
import HittableList from './hittableList.js';
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

  // Divide the color by the number of spamples
  const scale = 1.0 / samples;
  r *= scale;
  g *= scale;
  b *= scale;

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
function rayColor(ray, world) {
  const hitRec = world.hit(ray, EPSILON, Infinity);
  if (hitRec !== null) {
    return hitRec.normal
      .add(Vec3.create(), Vec3.fromValues(1, 1, 1))
      .scale(Vec3.create(), 0.5);
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

export { EPSILON, degreeToRad, writePixel, rayColor };
