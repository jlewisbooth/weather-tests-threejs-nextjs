import * as THREE from 'three';
import GLTFLoader from 'three-gltf-loader';
import Rain from './weather-class/rain';
import Clouds from './weather-class/clouds';
import Lightning from './weather-class/lightning';
import Fog from './weather-class/fog';
import { Sky } from './sky';

export default class WeatherLoader {

    constructor(renderer,scene) {

      
        this.scene = scene;
        this.renderer = renderer;
        this.GLTFLoader = new GLTFLoader(); 
        this.addBridge();
        this.addSun();
        
    }

    toggleWeather(show) {
        if(show) {
            this.Rain = new Rain(this.scene,1);
            this.Clouds = new Clouds(this.scene,1,0.0001);
            this.Lightning = new Lightning(this.scene,0.8);
            this.Fog = new Fog(this.scene,0.005);
            this.addSky();
        } else {
            if(this.Rain) {
                this.Rain.remove();
            }
            if(this.Clouds) {
                this.Clouds.remove();
            }
            if(this.Lightning) {
                this.Lightning.remove();
            }
            if(this.sky) {
                this.scene.remove(this.sky);
                this.scene.remove( this.sunSphere );
                this.sunSphere = null;
            }
            if(this.Fog) {
                this.Fog.remove();
            }

            this.addSun();
        }
    }

    addBridge() {
        this.GLTFLoader.load('/static/models/suspension_bridge.glb', (model) => {
            model.scene.traverse( child => {
                child.receiveShadow = true;
                child.castShadow = true;
            });
            this.scene.add(model.scene);
        });
    }

    addSun() {

        if(this.sunSphere) {

            if(this.directionalLight) {
                this.scene.remove(this.directionalLight);
            }

            this.directionalLight = new THREE.DirectionalLight(0xffeedd);
            this.directionalLight.castShadow = true;
            this.directionalLight.shadow.camera.bottom = -100;
            this.directionalLight.shadow.camera.top = 100;
            this.directionalLight.shadow.camera.right = 100;
            this.directionalLight.shadow.camera.left = -100;
            this.directionalLight.shadow.camera.far = 500000;
            this.directionalLight.position.set(this.sunSphere.position.x,this.sunSphere.position.y,this.sunSphere.position.z);
            this.scene.add(this.directionalLight);

            
        } else {

            if(this.directionalLight) {
                this.scene.remove(this.directionalLight);
            }

            this.directionalLight = new THREE.DirectionalLight(0xffeedd);
            this.directionalLight.castShadow = true;
            this.directionalLight.shadow.camera.bottom = -100;
            this.directionalLight.shadow.camera.top = 100;
            this.directionalLight.shadow.camera.right = 100;
            this.directionalLight.shadow.camera.left = -100;
            this.directionalLight.shadow.camera.far = 500000;
            this.directionalLight.position.set(100,100,100);
            this.scene.add(this.directionalLight);
        }
        

        // let helper = new THREE.DirectionalLightHelper( this.directionalLight, 5 );
        // this.scene.add(helper);
    }

    addMoon() {
        this.direcrtionalLight = new THREE.DirectionalLight(0xffeedd);
        this.direcrtionalLight.position.set(0,0,1);
        this.scene.add(this.direcrtionalLight);
    }

    addSky() {
        this.sky = new Sky();
        this.sky.scale.setScalar(100000);
        this.scene.add(this.sky);

        var distance = 400000;

        this.sunSphere = new THREE.Mesh(
					new THREE.SphereBufferGeometry( 20000, 16, 8 ),
					new THREE.MeshBasicMaterial( { color: 0xffffff } )
        );
        this.sunSphere.position.y = - 700000;
        this.sunSphere.visible = true;
        this.scene.add( this.sunSphere );

        var effectController = {
					turbidity: 4,
					rayleigh: 2,
					mieCoefficient: 0.005,
					mieDirectionalG: 0.8,
					luminance: 1,
					inclination: 0.4, // elevation / inclination
					azimuth: 0.05, // Facing front,
        };
        
        var uniforms = this.sky.material.uniforms;
        uniforms[ "turbidity" ].value = effectController.turbidity;
        uniforms[ "rayleigh" ].value = effectController.rayleigh;
        uniforms[ "luminance" ].value = effectController.luminance;
        uniforms[ "mieCoefficient" ].value = effectController.mieCoefficient;
        uniforms[ "mieDirectionalG" ].value = effectController.mieDirectionalG;

        var theta = Math.PI * ( effectController.inclination - 0.5 );
        var phi = 2 * Math.PI * ( effectController.azimuth - 0.5 );
        this.sunSphere.position.x = distance * Math.cos( phi );
        this.sunSphere.position.y = distance * Math.sin( phi ) * Math.sin( theta );
        this.sunSphere.position.z = distance * Math.sin( phi ) * Math.cos( theta );

        uniforms[ "sunPosition" ].value.copy( this.sunSphere.position );

        this.addSun();
    }
}