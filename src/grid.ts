import { Scene, Group, Parallel } from "spritejs";
import { IsoMath } from "./core/math";

export class Grid extends Group{
    public constructor(r:number, c:number) {
        super();
        // 绘制网格
        let w = 2*Math.cos(30 * (Math.PI / 180))*100;
        let h = 100;
        for (let i=0;i < c; i++) {
            for (let j=0; j < r; j++) {
                if (i % 2 == 0) {
                    const parallel = new Parallel({
                        normalize: true,
                        pos: [j*w, i*h/2],
                        sides: [100, 100],
                        angle: 120,
                        rotate: 30,
                        fillColor: "#c7c",
                        strokeColor: "#ccc",
                    });
                    this.append(parallel);
                } else {
                    const parallel = new Parallel({
                        normalize: true,
                        pos: [j*w-w/2, i*h/2],
                        sides: [100, 100],
                        angle: 120,
                        rotate: 30,
                        fillColor: "#c7c",
                        strokeColor: "#ccc",
                    });
                    this.append(parallel);

                }
            }
        }
    }
}
