/* eslint-disable import/extensions */
/**
 * @class Dielectric
 */

import Material from './material.js';
import Ray from './ray.js';
import Vec3 from './vec3.js';

class Dielectric extends Material {
  /**
   *
   * @param {Vec3} color
   * @param {Number} ior
   */
  constructor(color = new Vec3(1.0, 1.0, 1, 0), ior = 1.52) {
    super();
    this.color = color;
    this.ior = ior;
  }

  /**
   *
   * @param {Ray} ray
   * @param {HitRecord} hitRec
   * @returns {Vec3} the refracted or reflected vector.
   */
  scatter(ray, hitRec) {
    const refractRatio = hitRec.frontFace ? 1.0 / this.ior : this.ior;
    const unitDirection = ray.direction.normalize();

    const cosTheta = Math.min(
      unitDirection.negate().dot(hitRec.normal),
      1.0,
    );
    const sinTheta = Math.sqrt();

    // if the ray can not be refracted its going to be reflected instead
    const cannotRefract = refractRatio * sinTheta > 1.0;
    let direction;
    if (
      cannotRefract ||
      this.reflectance(cosTheta, refractRatio) > Math.random()
    )
      direction = Vec3.reflect(unitDirection, hitRec.normal);
    else
      direction = Vec3.refract(
        unitDirection,
        hitRec.normal,
        refractRatio,
      );

    return new Ray(hitRec.point, direction);
  }

  /**
   * Uses Schlick's approximation to compute reflectance
   * @param {Number} cosTheta
   * @param {Number} refractRatio
   */
  reflectance(cosTheta, refractRatio) {
    let r = (1 - refractRatio) / (1 + refractRatio);
    r *= r;
    return r + (1 - r) * (1 - cosTheta) ** 5;
  }
}

export default Dielectric;
