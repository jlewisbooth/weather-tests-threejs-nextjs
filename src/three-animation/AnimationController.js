import * as THREE from 'three';
import OrbitControls from 'three-orbitcontrols';
import ModelLoader from './WeatherLoader';

export default class AnimationController {
    constructor() {
        
        this.camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
        this.camera.position.z = 100;
    
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color( 0xD3D3D3 );
    
        this.renderer = new THREE.WebGLRenderer( { antialias: true,
                                                    canvas: document.getElementById('animation-canvas') } );
        this.renderer.setSize( window.innerWidth, window.innerHeight );

        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableZoom = true;
        this.controls.maxDistance = 230;
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.2;
        this.controls.update();

        let ambientLight = new THREE.AmbientLight(0x555555);
        this.scene.add(ambientLight);

        this.WeatherLoader = new ModelLoader(this.renderer,this.scene);

        this.animate();
    }

    animate(timestamp) {
 
      requestAnimationFrame( this.animate.bind(this) );

      this.controls.update();
        
      if(this.WeatherLoader.Rain) {
        this.WeatherLoader.Rain.animate();
      }

      if(this.WeatherLoader.Clouds) {
        this.WeatherLoader.Clouds.animate(timestamp);
      }

      if(this.WeatherLoader.Lightning) {
        this.WeatherLoader.Lightning.animate();
      }
        
      
      this.renderer.render( this.scene, this.camera );
     
    }

    updateConfig(config) {
      this.WeatherLoader.toggleWeather(config.showWeatherReport);
    }
}

