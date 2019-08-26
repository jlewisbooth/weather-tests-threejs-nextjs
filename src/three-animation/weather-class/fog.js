import * as THREE from 'three';

export default class Fog {

    constructor(scene,fogParameter) {
        this.scene = scene;
        this.scene.fog = new THREE.FogExp2(0x777777, fogParameter || 0.006);
    }

    remove() {
        this.scene.fog = null;
    }
}