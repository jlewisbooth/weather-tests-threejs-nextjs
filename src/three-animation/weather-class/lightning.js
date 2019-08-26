import * as THREE from 'three';

export default class Lightning {

    constructor(scene, activity) {

        this.scene = scene;
        
        this.flash = new THREE.PointLight(0x062d89, 30, 500 ,1.7);
        this.flash.position.set(200,300,100);
        this.scene.add(this.flash);
        this.animating = true;
        /* activity is between 1 and 0 */
        this.activity = activity;
    }

    animate() {
        if(this.animating) {
            let power = 20 + Math.random() * 500;
            if(Math.random() > this.activity && power > 400) {
                this.flash.power = power;
                this.flash.position.set(
                    Math.random()*400,
                    300 + Math.random() *200,
                    100
                );
            } else {
                this.flash.power = 0;
            }
        }
    }

    remove() {
        this.animating = false;
        this.scene.remove(this.flash);
        this.flash = null;
    }
}