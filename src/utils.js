import Vec3 from './vec3.js';

const EPSILON = 0.000001;
let ARRAY_TYPE = Float32Array !== undefined ? Float32Array : Array;

const degree = Math.PI / 180;
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

function writePixel(pixelColor) {
  // Write the translated [0,255] value of each color component.
  const r = ppmScale(pixelColor.x);
  const g = ppmScale(pixelColor.y);
  const b = ppmScale(pixelColor.z);
  return `${r} ${g} ${b}`;
}

function rayColor(ray) {
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

export { EPSILON, ARRAY_TYPE, degreeToRad, writePixel, rayColor };
