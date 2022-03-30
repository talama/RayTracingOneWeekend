/**
 * @class Sphere
 */

import HitRecord from './hitRecord.js';
import Hittable from './hittable.js';
import Vec3 from './vec3.js';
import Ray from './ray.js';
import Lambert from './lambert.js';

class Sphere extends Hittable {
  constructor(
    center = new Vec3(),
    radius = 1,
    material = new Lambert(new Vec3(0.5, 0.5, 0.5)),
  ) {
    super();
    this.center = center;
    this.radius = radius;
    this.material = material;
  }

  /**
   * Ray sphere intersection
   * @param {Ray} ray
   * @param {Number} tMin
   * @param {Number} tMax
   * @returns {HitRecord||null} - HitRecord of the intersection or null if no intersection
   */
  hit(ray, tMin, tMax) {
    const originCenter = ray.origin.subtract(this.center);
    const a = ray.direction.lengthSquared();
    const halfb = originCenter.dot(ray.direction);
    const c =
      originCenter.lengthSquared() - this.radius * this.radius;
    const discriminant = halfb * halfb - a * c;

    // if ray misses sphere -> no hit
    if (discriminant < 0) return null;

    // find the nearest root that lies in the acceptable range [tMin, tMax].
    // if no root is found in range -> no hit.
    const sqrtDisc = Math.sqrt(discriminant);
    let root = (-halfb - sqrtDisc) / a;
    if (root < tMin || root > tMax) {
      root = (-halfb + sqrtDisc) / a;
      if (root < tMin || root > tMax) return null;
    }

    // if hit
    // create and return the hitRecord for the hit
    const hitRec = new HitRecord();
    hitRec.t = root;
    hitRec.point = ray.pointAt(hitRec.t);
    // calculate normal and set face normal to make sure it always points outwards
    const outNormal = hitRec.point
      .subtract(this.center)
      .scale(1 / this.radius);
    hitRec.setFaceNormal(ray, outNormal);
    hitRec.material = this.material;
    return hitRec;
  }
}

export default Sphere;
