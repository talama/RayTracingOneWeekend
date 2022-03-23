import Ray from './ray.js';
import Vec3 from './vec3.js';

/**
 *
 * @class Camera
 */
class Camera {
  constructor() {
    this.aspectRatio = 16 / 9;
    this.viewPortHeight = 2.0;
    this.viewPortWidth = this.aspectRatio * this.viewPortHeight;
    this.focalLength = 1.0;

    this.origin = Vec3.create();
    this.horizontal = Vec3.fromValues(this.viewPortWidth, 0, 0);
    this.vertical = Vec3.fromValues(0, this.viewPortHeight, 0);
    this.lowerLeft = this.origin
      .subtract(
        Vec3.create(),
        this.horizontal.scale(Vec3.create(), 0.5),
      )
      .subtract(
        Vec3.create(),
        this.vertical.scale(Vec3.create(), 0.5),
      )
      .subtract(
        Vec3.create(),
        Vec3.fromValues(0, 0, this.focalLength),
      );
  }

  /**
   *
   * @param {Number} u
   * @param {Number} v
   * @returns {Ray} - ray pointing from point on camera with coord [u, v] to corresponding point on pixel with coord [x, y]
   */
  getRay(u, v) {
    const xCoord = this.horizontal.scale(Vec3.create(), u);
    const yCoord = this.vertical.scale(Vec3.create(), v);
    const direction = this.lowerLeft
      .add(Vec3.create(), xCoord)
      .add(Vec3.create(), yCoord);
    return new Ray(this.origin, direction);
  }
}

export default Camera;
