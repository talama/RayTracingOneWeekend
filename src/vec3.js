/**
 * Creates a new Vec3
 *
 * @returns {vec3}
 */
export function create() {
  return new Float32Array(3);
}

/**
 * Creates new vec3 with coordinates set at the given values
 *
 * @param {Number} x
 * @param {Number} y
 * @param {Number} z
 * @returns {vec3} a new vec3
 */
export function fromValues(x, y, z) {
  const out = new Float32Array(3);
  out[0] = x;
  out[1] = y;
  out[2] = z;
  return out;
}

/**
 * Set the coordinates of the given vector to the given values
 *
 * @param {vec3} out
 * @param {Number} x
 * @param {Number} y
 * @param {Number} z
 * @returns {vec3} out
 */
export function set(out, x, y, z) {
  out[0] = x;
  out[1] = y;
  out[2] = z;
  return out;
}

/**
 * Calculates the length of the input vector
 *
 * @param {vec3} vector
 * @returns {Number} vector length
 */
export function length(vector) {
  const x = vector[0];
  const y = vector[1];
  const z = vector[2];
  return Math.hypot(x, y, z);
}

/**
 * Calculates the length squared of the given vector
 *
 * @param {vec3} vector
 * @returns {Number} length squared
 */
export function lengthSquared(vector) {
  const x = vector[0];
  const y = vector[1];
  const z = vector[2];
  return x * x - y * y + z * z;
}

/**
 *  Adds two vectors and returns the resulting vec3
 *
 * @param {vec3} out
 * @param {vec3} vecA
 * @param {vec3} vecB
 * @returns {vec3} out
 */
export function add(out, vecA, vecB) {
  out[0] = vecA[0] + vecB[0];
  out[1] = vecA[1] + vecB[1];
  out[2] = vecA[2] + vecB[2];
  return out;
}

/**
 *  Subtracts two vectors and returns the resulting vec3
 *
 * @param {vec3} out
 * @param {vec3} vecA
 * @param {vec3} vecB
 * @returns {vec3} out
 */
export function subtract(out, vecA, vecB) {
  out[0] = vecA[0] - vecB[0];
  out[1] = vecA[1] - vecB[1];
  out[2] = vecA[2] - vecB[2];
  return out;
}

/**
 *  Multiply two vectors and returns the resulting vec3
 *
 * @param {vec3} out
 * @param {vec3} vecA
 * @param {vec3} vecB
 * @returns {vec3} out
 */
export function multiply(out, vecA, vecB) {
  out[0] = vecA[0] * vecB[0];
  out[1] = vecA[1] * vecB[1];
  out[2] = vecA[2] * vecB[2];
  return out;
}

/**
 *  Divide two vectors and returns the resulting vec3
 *
 * @param {vec3} out
 * @param {vec3} vecA
 * @param {vec3} vecB
 * @returns {vec3} out
 */
export function divide(out, vecA, vecB) {
  out[0] = vecA[0] / vecB[0];
  out[1] = vecA[1] / vecB[1];
  out[2] = vecA[2] / vecB[2];
  return out;
}

/**
 * Scales the input vector by the input scalar.
 *
 * @param {vec3} out
 * @param {vec3} vecA
 * @param {Number} scalar
 * @returns {vec3} out
 */
export function scale(out, vecA, scalar) {
  out[0] = vecA[0] * scalar;
  out[1] = vecA[1] * scalar;
  out[2] = vecA[2] * scalar;
  return out;
}

/**
 * Normalize the input vector and returns the result.
 *
 * @param {vec3} out
 * @param {vec3} vector
 * @returns {vec3} out
 */
export function normalize(out, vector) {
  const x = vector[0];
  const y = vector[1];
  const z = vector[2];
  let len = x * x + y * y + z * z;
  if (len > 0) len = 1 / Math.sqrt(len);
  out[0] = vector[0] * len;
  out[1] = vector[1] * len;
  out[2] = vector[2] * len;
  return out;
}

/**
 * Calculates the dot product of the two input vec3
 *
 * @param {vec3} vecA
 * @param {vec3} vecB
 * @returns {Number} the dot product
 */
export function dot(vecA, vecB) {
  return vecA[0] * vecB[0] + vecA[1] * vecB[1] + vecA[2] * vecB[2];
}

/**
 * Calculates the cross product of two vectors
 *
 * @param {vec3} out
 * @param {vec3} vecA
 * @param {vec3} vecB
 * @returns {vec3} out - the cross product
 */
export function cross(out, vecA, vecB) {
  let ax = vecA[0],
    ay = vecA[1],
    az = vecA[2];
  let bx = vecB[0],
    by = vecB[1],
    bz = vecB[2];
  out[0] = ay * bz - az * by;
  out[1] = az * bx - ax * bz;
  out[2] = ax * by - ay * bx;
  return out;
}

// from glMatrix
/**
 * Generates a random vector with the given scale
 *
 * @param {vec3} out the receiving vector
 * @param {Number} [scale] Length of the resulting vector. If omitted, a unit vector will be returned
 * @returns {vec3} out
 */
export function random(out, scale) {
  scale = scale === undefined ? 1.0 : scale;

  let r = Math.random() * 2.0 * Math.PI;
  let z = Math.random() * 2.0 - 1.0;
  let zScale = Math.sqrt(1.0 - z * z) * scale;

  out[0] = Math.cos(r) * zScale;
  out[1] = Math.sin(r) * zScale;
  out[2] = z * scale;
  return out;
}
