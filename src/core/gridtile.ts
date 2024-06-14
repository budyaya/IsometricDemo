import { Parallel } from "spritejs";

export class Gridtile extends Parallel {
    tileSize:number = 100;
    x:number;
    y:number;
    public constructor(tileSize:number, x:number, y:number) {

        // 绘制网格
        let w = 2 * Math.cos(30 * (Math.PI / 180)) * tileSize;
        let h = tileSize;
        let pos: Number[];
        if (y % 2 == 0) {
            pos = [x * w, y * h / 2]
        } else {
            pos = [x * w - w / 2, y * h / 2]
        }
        super({
            normalize: true,
            pos: pos,
            sides: [tileSize, tileSize],
            angle: 120,
            rotate: 30,
            fillColor: "#c7c",
            strokeColor: "#ccc",
            opacity: 0.5,
        });
        this.tileSize = tileSize;
        this.x = x;
        this.y = y;

        this.addEventListener("mouseenter", async (evt) => {
            this.attr({
                fillColor: "#fff",
            });
        });

        this.addEventListener("mouseleave", async (evt) => {
            this.attr({
                fillColor: "#04773B",
            });
        });

        this.addEventListener("click", (evt) => {
            /* eslint-disable no-console */
            console.log("tile clicked", this.attr("pos"));
        });
    }

    public getPos(): any {
       let pos = this.attr("pos")
       return [pos[0] * this.tileSize, pos[1] * this.tileSize]
    }
}
