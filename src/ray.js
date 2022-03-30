import Vec3 from './vec3.js';

/**
 * @class Ray
 */
class Ray {
  constructor(origin, direction) {
    this.origin = origin;
    this.direction = direction;
  }

  /**
   *
   * @param {Number} t
   * @returns {Vec3} - the point at t
   */
  pointAt(t) {
    return this.direction.scale(t).add(this.origin);
  }
}

export default Ray;
