import Vec3 from './vec3.js';
import { EPSILON } from './utils.js';

/**
 * @class HitRecord
 */
class HitRecord {
  constructor() {
    this.point = Vec3.create();
    this.normal = Vec3.create();
    this.material = null;
    this.t = 0.0;
    this.frontFace = true;
  }

  /**
   *  Sets the normal at the point of intersection with the ray to be always pointing outwards.
   * (if the normal and the ray point in the opposite direciton the ray came from outside, if they point the same direction the
   * ray came  from inside.)
   *
   * @param {Ray} ray
   * @param {Vec3} outwardNormal
   */
  setFaceNormal(ray, outwardNormal) {
    this.frontFace = ray.direction.dot(outwardNormal) < EPSILON;
    if (this.frontFace) this.normal = outwardNormal;
    else this.normal = outwardNormal.negate(Vec3.create());
  }
}

export default HitRecord;
