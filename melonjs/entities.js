import * as me from "melonjs";

// a player entity
class PlayerEntity extends me.Sprite {
  constructor(x, y, settings) {
    // call the constructor
    let texture = new me.TextureAtlas([me.loader.getJSON("stand"), me.loader.getJSON("walk")]);
    super(
      x,
      y,
      Object.assign(
        {
          image: texture,
          region : "stand",
          // image: "stand",
          // framewidth: 250,
          // frameheight: 220,
        },
        settings
      )
    );
    // add a physic body with a diamond as a body shape
    this.body = new me.Body(this, new me.Rect(16, 16, 16, 16).toIso());
    // walking & jumping speed
    this.body.setMaxVelocity(2.5, 2.5);
    this.body.setFriction(0.4, 0.4);

    // set the display around our position
    me.game.viewport.follow(this, me.game.viewport.AXIS.BOTH);

    // enable keyboard
    me.input.bindKey(me.input.KEY.LEFT, "left");
    me.input.bindKey(me.input.KEY.RIGHT, "right");
    me.input.bindKey(me.input.KEY.UP, "up");
    me.input.bindKey(me.input.KEY.DOWN, "down");

    // define an additional basic walking animation
    let c = this.addAnimation("stand_down", [0, 1, 2, 3, 4, 5, 6, 7]);
    let name = "stand_down";
    let index = [0, 1, 2, 3, 4, 5, 6, 7];
    let animationspeed = 200;
    let counter = 0;
    console.log("-------------addAnimation", c, this.textureAtlas, texture instanceof me.TextureAtlas);
            // set each frame configuration (offset, size, etc..)
            for (let i = 0, len = index.length; i < len; i++) {
              let frame = index[i];
              let frameObject;
              if (typeof(frame) === "number" || typeof(frame) === "string") {
                  frameObject = {
                      name: frame,
                      delay: animationspeed || this.animationspeed
                  };
              }
              else {
                  frameObject = frame;
              }
              let frameObjectName = frameObject.name;
              
    console.log("----------addAnimation", frameObjectName, typeof(frameObjectName), this.textureAtlas[frameObjectName]);
              if (typeof(frameObjectName) === "number") {
                  if (typeof (this.textureAtlas[frameObjectName]) !== "undefined") {
                      // TODO: adding the cache source coordinates add undefined entries in webGL mode
                      this.anim[name].frames[i] = Object.assign(
                          {},
                          this.textureAtlas[frameObjectName],
                          frameObject
                      );
                      counter++;
                  }
              } else { // string
                  if (this.source.getFormat().includes("Spritesheet")) {
                      throw new Error(
                          "string parameters for addAnimation are not allowed for standard spritesheet based Texture"
                      );
                  } else {
                      this.anim[name].frames[i] = Object.assign(
                          {},
                          this.textureAtlas[this.atlasIndices[frameObjectName]],
                          frameObject
                      );
                      counter++;
                  }
              }
          }
          console.log("----------addAnimation counter", counter);
          this.anim[name].length = counter;
    this.addAnimation("stand_left", [8, 9, 10, 11, 12, 13, 14, 15]);
    this.addAnimation("stand_up", [16, 17, 18, 19, 20, 21, 22, 23]);
    this.addAnimation("stand_right", [24, 25, 26, 27, 28, 29, 30, 31]);

    this.addAnimation("walk_down", [32, 33, 34, 35, 36, 37]);
    this.addAnimation("walk_left", [37, 38, 39, 40, 41, 42]);
    this.addAnimation("walk_up", [43, 44, 45, 46, 47, 48]);
    this.addAnimation("walk_right", [49, 50, 51, 52, 53, 54]);

    // set default one
    this.setCurrentAnimation("stand_down");
  }

  /**
   * update the player pos
   */
  update(dt) {
    if (me.input.isKeyPressed("left")) {
      // update the entity velocity
      this.body.force.x = -this.body.maxVel.x;
      if (!this.isCurrentAnimation("walk_left")) {
        this.setCurrentAnimation("walk_left");
      }
    } else if (me.input.isKeyPressed("right")) {
      // update the entity velocity
      this.body.force.x = this.body.maxVel.x;
      if (!this.isCurrentAnimation("walk_right")) {
        this.setCurrentAnimation("walk_right");
      }
    } else {
      this.body.force.x = 0;
    }
    if (me.input.isKeyPressed("up")) {
      // update the entity velocity
      this.body.force.y = -this.body.maxVel.y;
      if (!this.isCurrentAnimation("walk_up") && this.body.vel.x === 0) {
        this.setCurrentAnimation("walk_up");
      }
    } else if (me.input.isKeyPressed("down")) {
      // update the entity velocity
      this.body.force.y = this.body.maxVel.y;
      if (!this.isCurrentAnimation("walk_down") && this.body.vel.x === 0) {
        this.setCurrentAnimation("walk_down");
      }
    } else {
      this.body.force.y = 0;
    }

    super.update(dt);
    return true;
  }

  /**
   * colision handler
   * (called when colliding with other objects)
   */
  onCollision(/*response, other*/) {
    // Make all other objects solid
    return true;
  }
}

export default PlayerEntity;
