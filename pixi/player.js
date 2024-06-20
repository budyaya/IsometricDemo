import stand from './stand.js';
import walk from './walk.js';

export class Player extends PIXI.Container {
    anims = {};
    status = 0;
    async create() {
        this.anims["stand"] = await stand.create();
        this.anims["walk"] = await walk.create();
        this.on('pointerdown', (event) => { 
            console.log(event);
            if (this.status == 1) {
                this.status = 0;
                this.stand();
            } else {
                this.status = 1;
                this.walk();
            }
         });
        this.eventMode = 'static';
    }
    stand() {
        this.removeChild(this.anims["walk"]);
        this.addChild(this.anims["stand"]);
        this.anims["walk"].stop()
        this.anims["stand"].play()
    }
    walk() {
        this.removeChild(this.anims["stand"]);
        this.addChild(this.anims["walk"]);
        this.anims["stand"].stop()
        this.anims["walk"].play()
    }
}