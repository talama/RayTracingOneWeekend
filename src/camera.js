import Ray from './ray.js';
import { degreeToRad } from './utils.js';
import Vec3 from './vec3.js';

/**
 *
 * @class Camera
 */
class Camera {
  /**
   *
   * @param {Vec3} lookFrom
   * @param {Vec3} lookAt
   * @param {Vec3} vUp
   * @param {Number} Fov - field of view angle in degrees
   * @param {Number} aspectRatio
   */
  constructor(lookFrom, lookAt, vUp, vFov, aspectRatio = 16 / 9) {
    const theta = degreeToRad(vFov);
    const h = Math.tan(theta / 2);
    this.aspectRatio = aspectRatio;
    this.viewPortHeight = 2.0 * h;
    this.viewPortWidth = this.aspectRatio * this.viewPortHeight;
    this.focalLength = 1.0;

    /** Create a ortonormal set of axis starting from the vector between
    lookFrom and LookAt and vUp (up) */

    // looking direction vector
    const w = lookFrom
      .subtract(Vec3.create(), lookAt)
      .normalize(Vec3.create());
    // horizontal direction vector
    const u = vUp.cross(Vec3.create(), w).normalize(Vec3.create());
    // vertical direction
    const v = w.cross(Vec3.create(), u);

    this.origin = lookFrom;
    this.horizontal = u.scale(Vec3.create(), this.viewPortWidth);
    this.vertical = v.scale(Vec3.create(), this.viewPortWidth);
    this.lowerLeft = this.origin
      .subtract(
        Vec3.create(),
        this.horizontal.scale(Vec3.create(), 0.5),
      )
      .subtract(
        Vec3.create(),
        this.vertical.scale(Vec3.create(), 0.5),
      )
      .subtract(Vec3.create(), w);
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
      .add(Vec3.create(), yCoord)
      .subtract(Vec3.create(), this.origin);
    return new Ray(this.origin, direction);
  }
}

export default Camera;
