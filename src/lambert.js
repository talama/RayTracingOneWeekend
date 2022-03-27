/**
 * @class Lambert
 */

import Ray from './ray.js';
import Vec3 from './vec3.js';
import Material from './material.js';

class Lambert extends Material {
  /**
   *
   * @param {Vec3} color
   */
  constructor(color = Vec3.fromValues(0.5, 0.5, 0.5)) {
    super();
    this.color = color;
  }

  /**
   *
   * @param {Ray} ray
   * @param {HitRecord} hitRecord
   */
  scatter(ray, hitRecord) {
    // calculate scatter direction
    let scatterDirection = hitRecord.normal.add(
      Vec3.create(),
      Vec3.randomUnitSphere(),
    );

    // if the random vector is in the exact opposite direction of the normal vector
    // we would get a zero scatter direction vector.
    if (scatterDirection.nearZero())
      scatterDirection = hitRecord.normal;

    // return scattered ray
    return new Ray(hitRecord.point, scatterDirection);
  }
}

export default Lambert;
