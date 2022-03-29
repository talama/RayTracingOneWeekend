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
   * @param {Number} aperture
   * @param {Number} focusDist
   */
  constructor(
    lookFrom,
    lookAt,
    vUp,
    vFov,
    aspectRatio,
    aperture,
    focusDist,
  ) {
    const theta = degreeToRad(vFov);
    const halfHeight = Math.tan(theta / 2);
    const viewportHeight = halfHeight * 2.0;
    const viewportWidth = aspectRatio * viewportHeight;

    // implemnents defocus blur (depth of field)
    // everything lying on focus plane is in perfect focus.
    // aperture determines the amount of blur (sends rays from a disk centered around lookfrom)
    // a disk of size 0 means no defocus blur
    this.aperture = aperture;
    this.focusDist = focusDist;

    /** Create a ortonormal set of axis starting from the vector between
    lookFrom and LookAt and vUp (up) */
    this.origin = lookFrom;

    this.w = lookFrom
      .subtract(Vec3.create(), lookAt)
      .normalize(Vec3.create());

    this.u = vUp
      .cross(Vec3.create(), this.w)
      .normalize(Vec3.create());

    this.v = this.w.cross(Vec3.create(), this.u);

    this.origin = lookFrom;
    this.horizontal = this.u.scale(
      Vec3.create(),
      this.focusDist * viewportWidth,
    );
    this.vertical = this.v.scale(
      Vec3.create(),
      focusDist * viewportHeight,
    );
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
        this.w.scale(Vec3.create(), focusDist),
      );
  }

  /**
   *
   * @param {Number} s
   * @param {Number} t
   * @returns {Ray} - ray pointing from point on camera with coord [u, v] to corresponding point on pixel with coord [x, y]
   */
  getRay(s, t) {
    const rd = Vec3.randomUnitDisc().scale(
      Vec3.create(),
      this.aperture / 2,
    );
    const offset = this.u
      .scale(Vec3.create(), rd.x)
      .add(Vec3.create(), this.v.scale(Vec3.create(), rd.y));

    const direction = this.lowerLeft
      .add(Vec3.create(), this.horizontal.scale(Vec3.create(), s))
      .add(Vec3.create(), this.vertical.scale(Vec3.create(), t))
      .subtract(Vec3.create(), this.origin)
      .subtract(Vec3.create(), offset);
    return new Ray(this.origin.add(Vec3.create(), offset), direction);
  }
}

export default Camera;
