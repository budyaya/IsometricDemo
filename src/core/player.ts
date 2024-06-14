/*角色类*/
import { Sprite } from "spritejs";

export class Player extends Sprite {
  private i: number;
  private _name: string;
  constructor(name: string) {
    super(name + "1.png");
    this.i = 0;
    this._name = name;
    this.attr({
      anchor: [0, 0],
      size: [250, 220],
      zIndex: 200,
    });

    setInterval(() => {
      this.runloop();
    }, 100);
  }

  get name() {
    return this._name;
  }

  set name(name: string) {
    this._name = name;
  }

  public runloop() {
    this.i = (this.i % 8) + 1;
    this.attributes.texture = this.name + this.i + ".png";
  }
}
