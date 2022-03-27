/**
 * @class Metal
 */

import Material from './material.js';
import Ray from './ray.js';
import Vec3 from './vec3.js';

class Metal extends Material {
  /**
   *
   * @param {Vec3} color
   */
  constructor(color = Vec3.fromValues(0.5, 0.5, 0.5)) {
    super();
    this.color = color;
  }

  /**
   * Reflectance function
   * @param {Ray} ray
   * @param {HitRecord} hitRecord
   * @returns {Ray|null} -
   */
  scatter(ray, hitRecord) {
    const reflected = Vec3.reflect(
      ray.direction,
      hitRecord.normal,
    ).normalize(Vec3.create());
    const scattered = new Ray(hitRecord.point, reflected);
    if (scattered.direction.dot(hitRecord.normal) > 0)
      return scattered;
    return null;
  }
}

export default Metal;
