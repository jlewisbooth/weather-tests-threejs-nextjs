import * as THREE from 'three';
import config from './weather.config';

export default class Rain {

    constructor(scene,density,heavyness) {

        if(density < 0 || density > 1) {
            console.log("density needs to be between 0 and 1.")
            density = null;
        }

        let numOfRain = Math.round(density*config.maxNumberOfRainDrops) || 1500;

        this.rainGeo = new THREE.Geometry();
        this.scene = scene;
        
        for(let i=0;i<numOfRain;i++) {
            let rainDrop = new THREE.Vector3(
                Math.random() * 400 -200,
                Math.random() * 500 - 250,
                Math.random() * 400 - 200
            );
            rainDrop.velocity = {};
            rainDrop.velocity = 0;
            this.rainGeo.vertices.push(rainDrop);
            }
            let rainMaterial = new THREE.PointsMaterial({
            color: 0x000000,
            size: heavyness || 0.15,
            transparent: true
        });
        this.rain = new THREE.Points(this.rainGeo,rainMaterial);
        this.scene.add(this.rain);
        this.animating = true;
    }

    animate() {
        if(this.animating) {
            this.rainGeo.vertices.forEach(p => {
                p.velocity -= 0.1 + Math.random() * 0.1;
                p.y += p.velocity;
                if (p.y < -200) {
                  p.y = 200;
                  p.velocity = 0;
                }
              });
              this.rainGeo.verticesNeedUpdate = true;
              this.rain.rotation.y +=0.002;
        }
    }

    remove() {
        console.log("REMOVING RAIN");
        this.animating = false;
        this.scene.remove(this.rain);
        this.rain = null;
    }
}