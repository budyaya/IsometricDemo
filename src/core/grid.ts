import { Group } from "spritejs";

import { Gridtile } from "./gridtile";

export class Grid extends Group {
    tileSize:number = 100;
    public constructor() {
        super();
    }


    public Gen(r: number, c: number) {

        for (let i = 0; i < c; i++) {
            for (let j = 0; j < r; j++) {
                let tile = new Gridtile(this.tileSize, j, i);
                this.append(tile);
            }
        }
    }
}
