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
  constructor(color = new Vec3(0.5, 0.5, 0.5), blur = 0) {
    super();
    this.color = color;
    this.blur = blur < 1 ? blur : 1;
  }

  /**
   * Reflectance function
   * @param {Ray} ray
   * @param {HitRecord} hitRecord
   * @returns {Ray|null} -
   */
  scatter(ray, hitRecord) {
    // reflected vector
    let reflected = Vec3.reflect(
      ray.direction,
      hitRecord.normal,
    ).normalize();

    // add blur if any
    reflected = reflected.add(
      Vec3.randomUnitSphere().scale(this.blur),
    );

    // return reflected ray if any
    const scattered = new Ray(hitRecord.point, reflected);
    if (scattered.direction.dot(hitRecord.normal) > 0)
      return scattered;
    return null;
  }
}

export default Metal;
