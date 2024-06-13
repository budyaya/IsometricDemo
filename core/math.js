const DEFAULT_OPTIONS = {
  ratio: 0.5,
  origin: [0, 0],
  clamp: false,
};

function IsoMath(options) {
  if (options !== undefined && typeof options !== "object") {
    throw new Error("initialization options required");
  }

  const { ratio, origin, clamp } = { ...DEFAULT_OPTIONS, ...options };
  this.angle = Math.atan(ratio);
  this.origin = origin;
  this.angleCos = Math.cos(angle);
  this.angleSin = Math.sin(angle);
}

IsoMath.prototype.Convert = function (x, y, z) {
  // calculate the cartesion coordinates
  const cartX = (x - z) * this.angleCos;
  const cartY = y + (x + z) * this.angleSin;
  const targX = cartX + this.origin[0];
  const targY = -cartY + this.origin[1];

  return [
    clamp ? ~~(targX + (targX > 0 ? 0.5 : -0.5)) : targX,
    clamp ? ~~(targY + (targY > 0 ? 0.5 : -0.5)) : targY,
  ];
};
