/*角色类*/
import { Sprite, Trasition } from "spritejs";

export class Player extends Sprite {
  private i: number;
  private num: number;
  //private _name: string;
  private _trans: Trasition;
  constructor(name: string) {
    super(name + "0.png");
    this.i = 0;
    this.num = 8;
    this.setAttribute("name", name);
    this.attr({
      anchor: [0.6, 0.8],
      size: [250, 220],
      zIndex: 200,
    });

    setInterval(() => {
      this.runloop();
    }, 100);
  }

  get name() {
    return this.getAttribute("name");
  }

  set name(name: string) {
    this.setAttribute("name", name);
    //this._name = name;
  }



  public walk(x: number, y: number) {
    if (this._trans) this._trans.end(); //this._trans.cancel(false);
    this.name = "walk0";
    this.num = 6
    this._trans = this.transition(1.0);
    this._trans.attr({
      name: "stand0",
      pos: [x, y],
    });
  }

  public runloop() {
    this.i = (this.i + 1) % this.num;
    this.attributes.texture = this.getAttribute("name") + this.i + ".png";
  }
}
