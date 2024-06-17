// 创建游戏对象
import * as me from "melonjs";
import resources from "./resources.js";
import PlayerEntity from "./entities.js";

export default function onload() {
  // init the video
  if (!me.video.init(800, 600, { parent: "gameContainer", scale: "auto" })) {
    alert("Your browser does not support HTML5 canvas.");
    return;
  }
  // 加载图片资源
  console.log(resources, me.loader);
  me.loader.preload(resources, function () {
    // 创建Sprite对象
    var sprite = new PlayerEntity(0, 0);

    // 设置Sprite对象的中心点
    sprite.anchorPoint.set(0.5, 0.5);

    // 设置Sprite对象的位置
    sprite.pos.set(me.game.viewport.width / 2, me.game.viewport.height / 2);

    // disable gravity
    me.game.world.gravity.set(0, 0);

    // 将Sprite对象添加到游戏中
    me.game.world.addChild(sprite);
  });
}
