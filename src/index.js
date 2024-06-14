import { Scene, Path, Sprite, Label, Group } from "spritejs";
import { Player } from "./core/player.ts";
import { Keyboard } from "./core/keyboard.ts";
import { Grid } from "./core/grid.ts";

const container = document.getElementById("stage");
const scene = new Scene({
  container,
});
const birdsJsonUrl = "assets/character/stand.json";
const birdsRes = "assets/character/stand.png";

(async function () {
  await scene.preload([birdsRes, birdsJsonUrl]);

  // 角色
  const layer = scene.layer();
  layer.canvas.style.backgroundColor = "#1EAC61";
  
  const player = new Player("stand0");
  player.attr({
    pos: [512, 384],
  });
  layer.append(player);

  // 网格
  const bglayer = scene.layer("bglayer");
  const grid = new Grid()
  grid.Gen(30, 20)
  bglayer.append(grid);
  // layer.timeline.playbackRate = 1;
  // layer.tick((t, p) => {
  //   //player.runloop();
  // });

  // 前景
  const fglayer = scene.layer("fglayer");
  // 键盘
  const keyboard = new Keyboard(fglayer);

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
      player.name = "stand1";
    } else if (player.name == "stand1") {
      player.name = "stand2";
    } else if (player.name == "stand2") {
      player.name = "stand0";
    } else {
      player.name = "stand2";
    }
    //fglayer.removeAllChildren()
  });
})();
