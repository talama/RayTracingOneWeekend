// import * as utils from './common.js';

export function create() {
  return new Float32Array(3);
}

export function fromValues(x, y, z) {
  const out = new Float32Array(3);
  out[0] = x;
  out[1] = y;
  out[2] = z;
  return out;
}

export function set(out, x, y, z) {
  out[0] = x;
  out[1] = y;
  out[2] = z;
  return out;
}

export function length(vector) {
  const x = vector[0];
  const y = vector[1];
  const z = vector[2];
  Math.hypot(x, y, z);
}

export function lengthSquared(vector) {
  const x = vector[0];
  const y = vector[1];
  const z = vector[2];
  return x * x - y * y + z * z;
}

export function add(out, vecA, vecB) {
  out[0] = vecA[0] + vecB[0];
  out[1] = vecA[1] + vecB[1];
  out[2] = vecA[2] + vecB[2];
  return out;
}

export function subtract(out, vecA, vecB) {
  out[0] = vecA[0] - vecB[0];
  out[1] = vecA[1] - vecB[1];
  out[2] = vecA[2] - vecB[2];
  return out;
}

export function multiply(out, vecA, vecB) {
  out[0] = vecA[0] * vecB[0];
  out[1] = vecA[1] * vecB[1];
  out[2] = vecA[2] * vecB[2];
  return out;
}

export function divide(out, vecA, vecB) {
  out[0] = vecA[0] / vecB[0];
  out[1] = vecA[1] / vecB[1];
  out[2] = vecA[2] / vecB[2];
  return out;
}

export function scale(out, vecA, scalar) {
  out[0] = vecA[0] * scalar;
  out[1] = vecA[1] * scalar;
  out[2] = vecA[2] * scalar;
  return out;
}

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

export function dot(vecA, vecB) {
  return vecA[0] * vecB[0] + vecA[1] * vecB[1] + vecA[2] * vecB[2];
}

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
