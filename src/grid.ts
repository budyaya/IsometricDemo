import { Group, Parallel } from "spritejs";

export class Grid extends Group {
    public constructor() {
        super();
    }


    public Gen(r: number, c: number) {

        // 绘制网格
        let w = 2 * Math.cos(30 * (Math.PI / 180)) * 100;
        let h = 100;
        for (let i = 0; i < c; i++) {
            for (let j = 0; j < r; j++) {
                let pos: Number[];
                if (i % 2 == 0) {
                    pos = [j * w, i * h / 2]
                } else {
                    pos = [j * w - w / 2, i * h / 2]
                }
                let parallel = new Parallel({
                    normalize: true,
                    pos: pos,
                    sides: [100, 100],
                    angle: 120,
                    rotate: 30,
                    fillColor: "#c7c",
                    strokeColor: "#ccc",
                });
                this.append(parallel);

                parallel.addEventListener("mouseenter", async (evt) => {
                    parallel.attr({
                        fillColor: "#fff",
                    });
                });

                parallel.addEventListener("mouseleave", async (evt) => {
                    parallel.attr({
                        fillColor: "#04773B",
                    });
                });

                parallel.addEventListener("click", (evt) => {
                    /* eslint-disable no-console */
                    console.log("parallel clicked");
                });

            }
        }
    }
}
