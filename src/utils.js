import * as vec3 from './vec3.js';
import { ray } from './ray.js';

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
  const r = ppmScale(pixelColor[0]);
  const g = ppmScale(pixelColor[1]);
  const b = ppmScale(pixelColor[2]);
  return `${r} ${g} ${b}`;
}

function rayColor(ray) {
  const direction = vec3.normalize(vec3.create(), ray.direction);
  const t = 0.5 * (direction[1] + 1.0);
  let comp1 = vec3.scale(
    vec3.create(),
    vec3.fromValues(1.0, 1.0, 1.0),
    1.0 - t,
  );
  let comp2 = vec3.scale(
    vec3.create(),
    vec3.fromValues(0.5, 0.7, 1.0),
    t,
  );
  return vec3.add(vec3.create(), comp1, comp2);
}

export { EPSILON, ARRAY_TYPE, degreeToRad, writePixel, rayColor };
