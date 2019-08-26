import * as THREE from 'three';
import config from './weather.config';

export default class CloudManager {

    constructor(scene,cloudCover,velocity) {

        this.loader = new THREE.TextureLoader();
        this.cloudParticles = [];
        this.cloudTextures = [];
        this.scene = scene;
        this.velocity = velocity;
        this.numOfClouds = cloudCover * config.maxNumberOfClouds;

        this.loadTextures();
    }

    loadTextures() {

        const avalibleClouds = ['cloud-1.png','cloud-2.png','cloud-3.png'];
        let texturesLoaded = avalibleClouds.length;

        avalibleClouds.forEach( name => {
            this.loader.load(`/static/img/${name}`, (texture) => {
                    this.cloudTextures.push(texture);
                    texturesLoaded--;
                    if(texturesLoaded <= 0) {
                        this.addClouds();
                    }
            });
        })
    }

    addClouds() {

        for(let p=0; p<this.numOfClouds; p++) {
            let index = Math.floor(Math.random() * (this.cloudTextures.length));
            let scale = Math.floor(config.minSizeOfCloud + (Math.random() * (config.maxSizeOfCloud - config.minSizeOfCloud)));
            let cloud = new Cloud(scale,this.cloudTextures[index],this.velocity);
            this.cloudParticles.push(cloud);
            this.scene.add(cloud.getSprite());
        }
    }

    animate(timestamp) {
        this.cloudParticles.forEach(cloud => {
            cloud.update(timestamp);
        });
    }

    remove() {
        this.cloudParticles.forEach(cloud => {
            this.scene.remove(cloud.getSprite());
        });
        this.cloudParticles = [];
    }
}

class Cloud {

    constructor(scale,cloudTexture,velocity) {

        let cloudMaterial = new THREE.SpriteMaterial({
            map: cloudTexture,
            transparent: true,
            alphaTest: 0.2,
            depthTest: true
        });

        this.cloud = new THREE.Sprite(cloudMaterial);
        this.cloud.scale.set(scale,scale,1);

        let radius = 400;
        let minHeight = 100;
        this.time = 0;

        [this.initialX,this.initialY,this.initialZ] = this.randomSpherePoint(0,minHeight,0,radius);
        this.R = Math.sqrt(Math.pow(radius,2)-Math.pow(this.initialY,2));
        
        this.initialAngle = new THREE.Vector2(this.initialX,this.initialZ).normalize().angle();
        this.velocity = velocity * this.sigmoid(250,500,100,this.initialY);
        this.time = 0;

        this.cloud.position.set(
            this.initialX,
            this.initialY,
            this.initialZ
        );

        this.cloud.material.opacity = 0.5;
    }

    sigmoid(LB,UB,shift,y) {

        let sig = 1/(1+Math.exp((2/(UB-LB))*(y-shift)));
        return sig;
    }

    getSprite() {
        return this.cloud;
    }

    update(timestamp) {
        this.cloud.position.x = this.R * Math.cos((this.velocity * timestamp) + this.initialAngle);
        this.cloud.position.z = this.R * Math.sin((this.velocity * timestamp) + this.initialAngle);
    }

    randomSpherePoint(x0,y0,z0,radius){
        var u = Math.random();
        var v = Math.random();
        var theta = Math.PI * u;
        var phi = Math.acos(2 * v - 1);
        var x = x0 + (radius * Math.sin(phi) * Math.cos(theta));
        var y = y0 + (radius * Math.sin(phi) * Math.sin(theta));
        var z = z0 + (radius * Math.cos(phi));
        return [x,y,z];
    }
}