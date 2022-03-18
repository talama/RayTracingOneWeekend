import * as vec3 from './vec3';

class ray {
  constructor(origin, direction) {
    this.origin = origin;
    this.direction = direction;
  }

  pointAt(t) {
    let point = vec3.create();
    point = vec3.scale(vec3.create(), this.direction, t);
    return vec3.add(vec3.create(), point, this.origin);
  }
}
