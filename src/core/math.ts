export class IsoMath {
  ratio: number = 0.5;
  origin = [0, 0];
  clamp = false;
  angle: number;
  angleCos: number;
  angleSin: number;
  constructor(origin?: number[], ratio?: number, clamp?: boolean) {
    if (origin !== undefined) {
      this.origin = origin;
    }
    if (ratio !== undefined) {
      this.ratio = ratio;
    }
    if (clamp !== undefined) {
      this.clamp = clamp;
    }
    this.angle = Math.atan(this.ratio);
    this.angleCos = Math.cos(this.ratio);
    this.angleSin = Math.sin(this.ratio);
  }

  public Convert(x: number, y: number, z: number) {
    const cartX = (x - z) * this.angleCos;
    const cartY = y + (x + z) * this.angleSin;
    const targX = cartX + this.origin[0];
    const targY = -cartY + this.origin[1];

    return [
      this.clamp ? ~~(targX + (targX > 0 ? 0.5 : -0.5)) : targX,
      this.clamp ? ~~(targY + (targY > 0 ? 0.5 : -0.5)) : targY,
    ];
  }
}
