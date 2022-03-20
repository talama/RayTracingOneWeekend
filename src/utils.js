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
 * Write a pixel to a string scaling its values from the [0, 1] to the [0, 255] range
 * @param {Vec3} pixelColor
 * @returns {Strings}
 */
function writePixel(pixelColor) {
  // Write the translated [0,255] value of each color component.
  const r = ppmScale(pixelColor.x);
  const g = ppmScale(pixelColor.y);
  const b = ppmScale(pixelColor.z);
  return `${r} ${g} ${b}`;
}

/**
 * Ray sphere intersection
1 * @param {Vec3} center
 * @param {Vec3} radius
 * @param {Ray} ray
 * @returns {Boolean} - true if the ray intersects the sphere.
 */
function hitSphere(center, radius, ray) {
  const originCenter = ray.origin.subtract(Vec3.create(), center);
  const a = ray.direction.dot(ray.direction);
  const b = 2 * originCenter.dot(ray.direction);
  const c = originCenter.dot(originCenter) - radius * radius;
  const discriminant = b * b - 4 * a * c;
  return discriminant > 0;
}

/**
 * Nearly blends white and blue depending on the height of the y coordinate after scaling the ray direction to unit length
 * (so −1.0 < y < 1.0). Because we're looking at the y height after normalizing the vector, we will have a horizontal gradient
 * to the color in addition to the vertical gradient. We scale the result to the range (0.0 < t < 10).
 *
 * blendedValue=(1−t) * startValue + t * endValue
 *
 * @param {Ray} ray
 * @returns {Vec3} - pixel color
 */
function rayColor(ray) {
  // if the reay hits the sphere return red color
  if (hitSphere(Vec3.fromValues(0, 0, -1), 0.5, ray))
    return Vec3.fromValues(1, 0, 0);
  const direction = ray.direction.normalize(Vec3.create());
  // remap y value from [-1, 1] to [1, 1] range
  const t = 0.5 * (direction.y + 1.0);

  // blends linearly between white [1, 1, 1] and [0.5, 0.7, 1.0]
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
