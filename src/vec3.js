/**
 * @class Vec3
 */
class Vec3 {
  constructor() {
    this.data = new Float32Array(3);
  }

  get x() {
    return this.data[0];
  }

  get y() {
    return this.data[1];
  }

  get z() {
    return this.data[2];
  }

  set x(x) {
    this.data[0] = x;
  }

  set y(y) {
    this.data[1] = y;
  }

  set z(z) {
    this.data[2] = z;
  }

  static create() {
    return new Vec3();
  }
  /**
   * Creates new Vec3 with coordinates set at the given values
   *
   * @param {Number} x
   * @param {Number} y
   * @param {Number} z
   * @returns {Vec3} a new Vec3
   */
  static fromValues(x, y, z) {
    const out = Vec3.create();
    out.x = x;
    out.y = y;
    out.z = z;
    return out;
  }

  // from glMatrix
  /**
   * Generates a random vector with the given scale
   *
   * @param {Vec3} out the receiving vector
   * @param {Number} [scale] Length of the resulting vector. If omitted, a unit vector will be returned
   * @returns {Vec3} out
   */
  static random(out, scale) {
    scale = scale === undefined ? 1.0 : scale;

    let r = Math.random() * 2.0 * Math.PI;
    let z = Math.random() * 2.0 - 1.0;
    let zScale = Math.sqrt(1.0 - z * z) * scale;

    out.x = Math.cos(r) * zScale;
    out.y = Math.sin(r) * zScale;
    out.z = z * scale;
    return out;
  }
  /**
   * Calculates the length of the vector
   *
   * @returns {Number} vector length
   */
  length() {
    const x = this.x;
    const y = this.y;
    const z = this.z;
    return Math.hypot(x, y, z);
  }

  /**
   * Calculates the length squared of the vector
   *
   * @returns {Number} length squared
   */
  lengthSquared() {
    const x = this.x;
    const y = this.y;
    const z = this.z;
    return x * x + y * y + z * z;
  }

  /**
   *  Adds two vectors and returns the resulting Vec3
   *
   * @param {Vec3} out
   * @param {Vec3} vecB
   * @returns {Vec3} out
   */
  add(out, vecB) {
    out.x = this.x + vecB.x;
    out.y = this.y + vecB.y;
    out.z = this.z + vecB.z;
    return out;
  }

  /**
   *  Subtracts two vectors and returns the resulting Vec3
   *
   * @param {Vec3} out
   * @param {Vec3} vecB
   * @returns {Vec3} out
   */
  subtract(out, vecB) {
    out.x = this.x - vecB.x;
    out.y = this.y - vecB.y;
    out.z = this.z - vecB.z;
    return out;
  }

  /**
   *  Multiply two vectors and returns the resulting Vec3
   *
   * @param {Vec3} out
   * @param {Vec3} vecB
   * @returns {Vec3} out
   */
  multiply(out, vecB) {
    out.x = this.x * vecB.x;
    out.y = this.y * vecB.y;
    out.z = this.z * vecB.z;
    return out;
  }

  /**
   *  Divide two vectors and returns the resulting Vec3
   *
   * @param {Vec3} out
   * @param {Vec3} vecB
   * @returns {Vec3} out
   */
  divide(out, vecB) {
    out.x = this.x / vecB.x;
    out.y = this.y / vecB.y;
    out.z = this.z / vecB.z;
    return out;
  }

  /**
   * Scales the vector by the input scalar.
   *
   * @param {Vec3} out
   * @param {Number} scalar
   * @returns {Vec3} out
   */
  scale(out, scalar) {
    out.x = this.x * scalar;
    out.y = this.y * scalar;
    out.z = this.z * scalar;
    return out;
  }

  /**
   * Negates the component of the vector.
   * @param {Vec3} out
   * @returns {Vec3}
   */
  negate(out) {
    out.x = -this.x;
    out.y = -this.y;
    out.z = -this.z;
    return out;
  }

  /**
   * Normalize the vector and returns the result.
   *
   * @param {Vec3} out
   * @returns {Vec3} out
   */
  normalize(out) {
    const x = this.x;
    const y = this.y;
    const z = this.z;
    let len = x * x + y * y + z * z;
    if (len > 0) len = 1 / Math.sqrt(len);
    out.x = this.x * len;
    out.y = this.y * len;
    out.z = this.z * len;
    return out;
  }

  /**
   * Calculates the dot product of the two input Vec3
   *
   * @param {Vec3} vecB
   * @returns {Number} the dot product
   */
  dot(vecB) {
    return this.x * vecB.x + this.y * vecB.y + this.z * vecB.z;
  }

  /**
   * Calculates the cross product of two vectors
   *
   * @param {Vec3} out
   * @param {Vec3} vecB
   * @returns {Vec3} out - the cross product
   */
  cross(out, vecB) {
    let ax = this.x,
      ay = this.y,
      az = this.z;
    let bx = vecB.x,
      by = vecB.y,
      bz = vecB.z;
    out.x = ay * bz - az * by;
    out.y = az * bx - ax * bz;
    out.z = ax * by - ay * bx;
    return out;
  }
}

export default Vec3;
