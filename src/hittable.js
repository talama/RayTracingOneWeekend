/**
 * Abstract class Hittable
 *
 * @class Hittable
 */
class Hittable {
  constructor() {
    if (this.constructor === Hittable)
      throw new Error('Abstract class cannot be instantiated.');
  }

  hit() {
    throw new Error(
      'Method hit(ray, tMin, tMax) must be implemented.',
    );
  }
}

export default Hittable;
