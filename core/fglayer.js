async function fglayer(scene) {
  //const layer = scene.layer();
  const layer = scene.layer();
  layer.canvas.style.backgroundColor = "#1EAC61";
  const player = new Player("stand0")
  layer.append(player.sprite);

  const fglayer = scene.layer("fglayer");
  setInterval(() => {
    player.runloop();
  }, 100);

  const button = new Group();
  button.attr({
    anchor: 0.5,
    pos: [512, 384],
  });
  fglayer.append(button);

  const buttonNormal = new Label("Get Started");
  buttonNormal.attr({
    anchor: 0.5,
    font: '40px "宋体"',
    fillColor: "#04773B",
    lineHeight: 96,
    textAlign: "center",
    size: [320, 96],
    border: [4, "#178C4E"],
    borderRadius: 48,
  });
  button.append(buttonNormal);

  const buttonHover = new Sprite();
  buttonHover.attr({
    anchor: 0.5,
    bgcolor: "#208B50",
    height: 100,
    width: 96,
    opacity: 0,
    borderRadius: 48,
    zIndex: -1,
  });
  button.append(buttonHover);

  let hoverAnim = null;

  let touched = false;

  buttonNormal.addEventListener("mouseenter", async (evt) => {
    if (touched) return;
    fglayer.canvas.style.cursor = "pointer";
    buttonNormal.attr({
      fillColor: "#fff",
    });
    if (hoverAnim) {
      hoverAnim.cancel();
      hoverAnim = null;
    }
    hoverAnim = buttonHover.animate(
      [
        { width: 96, opacity: 0 },
        { width: 324, opacity: 1 },
      ],
      {
        duration: 300,
        fill: "forwards",
        easing: "ease-in",
      }
    );
    await hoverAnim.finished;
    hoverAnim = null;
  });

  buttonNormal.addEventListener("mouseleave", async (evt) => {
    if (touched) return;
    fglayer.canvas.style.cursor = "default";
    buttonNormal.attr({
      fillColor: "#04773B",
    });
    if (hoverAnim) {
      hoverAnim.cancel();
      hoverAnim = null;
    }
    hoverAnim = buttonHover.animate(
      [
        { width: 324, opacity: 1 },
        { width: 96, opacity: 0 },
      ],
      {
        duration: 500,
        fill: "forwards",
        easing: "ease-out",
      }
    );
    await hoverAnim.finished;
    hoverAnim = null;
  });

  buttonNormal.addEventListener("touchstart", (evt) => {
    touched = true;
    if (hoverAnim) {
      hoverAnim.cancel();
      hoverAnim = null;
    }
    buttonNormal.attr({
      fillColor: "#fff",
    });
    buttonHover.attr({
      width: 324,
    });
  });

  buttonNormal.addEventListener("touchend", (evt) => {
    if (hoverAnim) {
      hoverAnim.cancel();
      hoverAnim = null;
    }
    buttonNormal.attr({
      fillColor: "#04773B",
    });
    buttonHover.attr({
      width: 0,
    });
  });

  buttonNormal.addEventListener("mousedown", (evt) => {
    button.attr({
      scale: 0.9,
    });
  });

  buttonNormal.addEventListener("mouseup", (evt) => {
    button.attr({
      scale: 1.0,
    });
  });

  buttonNormal.addEventListener("click", (evt) => {
    /* eslint-disable no-console */
    console.log("button clicked");
    if (player.name == "stand0") {
      player.setname("stand1");
    } else {
      player.setname("stand2");
    }
    //fglayer.removeAllChildren()
  });
}

/*角色类*/
function Player (name) {
  this.sprite = new Sprite(name+"0.png")
  this.i = 0;
  this.name = name;
  this.sprite.attr({
    anchor: [0, 0],
    size: [250, 220],
    zIndex: 200,
  });
}

Player.prototype.runloop = function () {
  this.i = ((this.i+1) % 8);
  this.sprite.attributes.texture = this.name + this.i + ".png";
}
Player.prototype.setname = function (name) {
  this.name = name;
}
