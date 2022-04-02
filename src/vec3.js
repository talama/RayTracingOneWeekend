/**
 * @class Vec3
 */
class Vec3 {
  /**
   *
   * @param {Number} x
   * @param {Number} y
   * @param {Number} z
   */
  constructor(x = 0, y = 0, z = 0) {
    this.data = [x, y, z];
  }

  /**
   * Getters and setters for the vector components
   */
  get x() {
    return this.data[0];
  }

  set x(x) {
    this.data[0] = x;
  }

  set y(y) {
    this.data[1] = y;
  }

  get y() {
    return this.data[1];
  }

  set z(z) {
    this.data[2] = z;
  }

  get z() {
    return this.data[2];
  }

  /**
   *
   * @param {Number} min
   * @param {Number} max
   * @returns {Vec3} - returns a random non nomrmalized vector with components in the interval [min, max]
   */
  static random(min = 0, max = 1) {
    return new Vec3(
      Math.random() * (max - min) + min,
      Math.random() * (max - min) + min,
      Math.random() * (max - min) + min,
    );
  }

  /**
   * Generates a random vector in a unit sphere.
   *
   * @returns {Vec3}
   */
  static randomUnitSphere() {
    let out = Vec3.random(-1, 1);
    while (out.lengthSquared() >= 1) {
      out = Vec3.random(-1, 1);
    }
    return out;
  }

  /**
   * Generates a random vector in a unit disk
   *
   * @returns {Vec3}
   */
  static randomUnitDisc() {
    let out = Vec3.random(-1, 1);
    out.data[2] = 0;
    while (out.lengthSquared() >= 1) {
      out = Vec3.random(-1, 1);
      out.data[2] = 0;
    }
    return out;
  }

  /**
   * Calculates the length squared of the vector
   *
   * @returns {Number} length squared
   */
  lengthSquared() {
    return (
      this.data[0] * this.data[0] +
      this.data[1] * this.data[1] +
      this.data[2] * this.data[2]
    );
  }

  /**
   * Calculates the length of the vector
   *
   * @returns {Number} vector length
   */
  length() {
    return Math.sqrt(this.lengthSquared());
  }

  /**
   * Adds two vectors and returns the resulting Vec3
   *
   * @param {Vec3} vector
   * @returns {Vec3} out
   */
  add(vector) {
    return new Vec3(
      this.data[0] + vector.data[0],
      this.data[1] + vector.data[1],
      this.data[2] + vector.data[2],
    );
  }

  /**
   * Subtracts two vectors and returns the resulting Vec3
   *
   * @param {Vec3} vector
   * @returns {Vec3}
   */
  subtract(vector) {
    return this.add(vector.negate());
  }

  /**
   * Multiply two vectors and returns the resulting Vec3
   *
   * @param {Vec3} vector
   * @returns {Vec3} out
   */
  multiply(vector) {
    return new Vec3(
      this.data[0] * vector.data[0],
      this.data[1] * vector.data[1],
      this.data[2] * vector.data[2],
    );
  }

  /**
   * Divide two vectors and returns the resulting Vec3
   *
   * @param {Vec3} vector
   * @returns {Vec3} out
   */
  divide(vector) {
    return this.multiply(1 / vector);
  }

  /**
   * Scales the vector by the input scalar.
   *
   * @param {Number} scalar
   * @returns {Vec3} out
   */
  scale(scalar) {
    return new Vec3(
      this.data[0] * scalar,
      this.data[1] * scalar,
      this.data[2] * scalar,
    );
  }

  /**
   * Negates the component of the vector.
   * @returns {Vec3}
   */
  negate() {
    return new Vec3(-this.data[0], -this.data[1], -this.data[2]);
  }

  /**
   * Normalize the vector and returns the result.
   *
   * @returns {Vec3} out
   */
  normalize() {
    const len = this.length();
    return new Vec3(
      this.data[0] / len,
      this.data[1] / len,
      this.data[2] / len,
    );
  }

  /**
   * Calculates the dot product of the two input Vec3
   *
   * @param {Vec3} vector
   * @returns {Number} the dot product
   */
  dot(vector) {
    return (
      this.data[0] * vector.data[0] +
      this.data[1] * vector.data[1] +
      this.data[2] * vector.data[2]
    );
  }

  /**
   * Calculates the cross product of two vectors
   *
   * @param {Vec3} out
   * @param {Vec3} vector
   * @returns {Vec3} out - the cross product
   */
  cross(vector) {
    return new Vec3(
      this.data[1] * vector.data[2] - this.data[2] * vector.data[1],
      this.data[2] * vector.data[0] - this.data[0] * vector.data[2],
      this.data[0] * vector.data[1] - this.data[1] * vector.data[0],
    );
  }

  /**
   * Reflects the vector on the normal axe.
   * @param {Vec3} normal
   * @returns {Vec3} - the reflected vector
   */
  reflect(normal) {
    return this.subtract(normal.scale(this.dot(normal) * 2));
  }

  /**
   * Refracts a vector around a normal.
   * @param {Vec3} normal
   * @param {Number} ior
   *
   * @returns {Vec3} - refracted vector
   */
  refract(normal, ior) {
    // cosine of the angle between the normal and the vector
    const cosTheta = Math.min(this.negate().dot(normal), 1.0);
    // perpendicular component of the refracted vector
    const outPerp = this.add(normal.scale(cosTheta)).scale(ior);

    // parallel component of the refracted vector.
    const outParallel = normal.scale(
      -Math.sqrt(Math.abs(1.0 - outPerp.lengthSquared())),
    );
    // refracted vector
    return outPerp.add(outParallel);
  }

  /**
   *
   * @returns {boolean} - returns true if the vector is close to zero in all directions.
   */
  nearZero() {
    const epsilon = 0.00000001;
    return (
      this.data[0] < epsilon &&
      this.data[1] < epsilon &&
      this.data[2] < epsilon
    );
  }
}

export default Vec3;
