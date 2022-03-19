import * as vec3 from './vec3.js';

class ray {
  constructor(origin, direction) {
    this.origin = origin;
    this.direction = direction;
  }

  pointAt(t) {
    const point = vec3.scale(vec3.create(), this.direction, t);
    return vec3.add(vec3.create(), point, this.origin);
  }
}

export { ray };
