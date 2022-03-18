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

export { EPSILON, ARRAY_TYPE, degreeToRad, writePixel };
