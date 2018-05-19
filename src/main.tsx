import * as THREE from 'three';
import * as $ from 'jquery';

class Viewer {
    _canvas: HTMLCanvasElement;
    _renderer: THREE.Renderer;
    _scene: THREE.Scene;
    _camera: THREE.Camera;

    constructor(canvas: HTMLCanvasElement) {
        this._canvas = canvas;
  
        window.onresize = () => {
            this.onWindowResize();
        };
        const width = canvas.width;
        const height = canvas.height;
        this._scene = new THREE.Scene();
        this._scene.background = new THREE.Color("black");

        let light = this.buildLights(this._scene);
        this._camera = this.buildCamera(width, height);
        this._renderer = this.buildRender(width, height);
    }
    buildLights(scene: THREE.Scene) {
        let light = new THREE.SpotLight("#fff", 0.8);
        light.position.y = 100;

        light.angle = 1.05;

        light.decay = 2;
        light.penumbra = 1;

        light.shadow.camera.near = 10;
        light.shadow.camera.far = 1000;
        light.shadow.camera.fov = 30;
        scene.add(light);
        return light;
    }

    buildCamera(width: number, height: number) {
        const aspectRatio = width / height;
        const fieldOfView = 60;
        const nearPlane = 1;
        const farPlane = 5000;
        let camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);
        camera.position.z = 100;
        return camera;
    }

    buildRender(width: number, height: number) {
        let renderer = new THREE.WebGLRenderer({ canvas: this._canvas, antialias: true, alpha: true });
        let DPR = (window.devicePixelRatio) ? window.devicePixelRatio : 1;
        renderer.setPixelRatio(DPR);
        renderer.setSize(width, height);
        return renderer;
    }

    onWindowResize() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        this._canvas.width = width;
        this._canvas.height = height;
        this._camera = this.buildCamera(width, height);
        this._renderer.setSize(width, height);
    }

    update() {
        this._renderer.render(this._scene, this._camera);
    }

    renderLoop() {
        var time = Date.now();
        var timeEpsilonObj = { timeEpsilon: Date.now() - time };
        var animateScene = () => {
            // update animations
            timeEpsilonObj.timeEpsilon = Date.now() - time;
            time = Date.now();
            this.update();
            window.requestAnimationFrame(animateScene);
        };
        animateScene();
    }
}


$(() => {
    let canvas = document.getElementById("viewer3d");
    let viewer = new Viewer(canvas as HTMLCanvasElement);
    viewer.onWindowResize();
    viewer.renderLoop();
});
