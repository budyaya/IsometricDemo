import { Scene, Group, Parallel } from "spritejs";

export class Grid extends Group{
    public constructor(x:number, y:number) {
        super();
        // 绘制网格
        for (let i=0;i < x; i++) {
            for (let j=0; j < y; j++) {
                const parallel = new Parallel({
                    normalize: true,
                    pos: [i*200, j*50],
                    sides: [100, 100],
                    angle: 30,
                    rotate: 0,
                    fillColor: "#c7c",
                    strokeColor: "#ccc",
                });
                this.append(parallel);
            }
        }
    }
}
