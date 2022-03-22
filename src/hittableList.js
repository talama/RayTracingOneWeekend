/**
 * @class HittableList
 */

import HitRecord from './hitRecord.js';

class HittableList {
  /**
   *
   * @param {Array} objects - array of Hittable objects
   */
  constructor(objects = []) {
    this.objects = objects;
  }

  /**
   * Add object to the list.
   * @param {Hittable} object
   */
  add(object) {
    this.objects.push(object);
  }

  /**
   * Iterates through all the ojects in the list and returns
   * the HitRecord  with the smallest positive t in range [tMin, tMax] if any, null otherwise.
   *
   * @param {Ray} ray
   * @param {Number} tMin
   * @param {Number} tMax
   * @returns {HitRecord||null}
   */
  hit(ray, tMin, tMax) {
    let tmpRec = new HitRecord();
    let closest = tMax;
    const hitList = [];

    for (let i = 0, n = this.objects.length; i < n; i += 1) {
      tmpRec = this.objects[i].hit(ray, tMin, closest);
      if (tmpRec !== null) {
        closest = tmpRec.t;
        hitList.push(tmpRec);
      }
    }
    hitList.sort((a, b) => a.t - b.t);
    for (let i = 0, n = hitList.length; i < n; i += 1) {
      if (hitList[i].t > 0) return hitList[i];
    }
    return null;
  }
}

export default HittableList;
