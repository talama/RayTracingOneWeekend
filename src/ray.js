import Vec3 from './vec3.js';

class ray {
  constructor(origin, direction) {
    this.origin = origin;
    this.direction = direction;
  }

  pointAt(t) {
    return this.direction
      .scale(Vec3.create(), t)
      .add(Vec3.create(), this.origin);
  }
}

export { ray };
