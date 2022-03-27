import HitRecord from './hitRecord.js';
import Vec3 from './vec3.js';

/**
 * Abstract class for materials
 * @class Material
 */
class Material {
  /**
   *
   * @param {Vec3} color - Material color
   */
  constructor(color = Vec3.fromValues(0.5, 0.5, 0.5)) {
    this.color = color;
    if (this.constructor === 'Material')
      throw new Error('Abstract class cannot be instantiated.');
  }

  /**
   *
   * @param {Ray} ray
   * @param {HitRecord} hitRecord
   * @returns {Ray|null} - returns the scattered ray or null if none.
   */
  scatter(ray, hitRecord) {
    throw new Error(
      'Method scatter(ray, hitRecord, attenuation) must be implemented.',
    );
  }
}

export default Material;
