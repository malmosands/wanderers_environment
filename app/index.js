/**
 * Application entry point
 */

// Load application styles
import 'scss/_index.scss';

// Imports
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as dat from 'dat.gui';

// Create the Scene
const scene = new THREE.Scene();

// dat.gui Debugging
const gui = new dat.GUI();

// Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.x = 1.5;
camera.position.y = 1;
camera.position.z = 3.5;

// dat.gui
gui.add(camera.position, 'x').min(-50).max(50);
gui.add(camera.position, 'y').min(-50).max(50);
gui.add(camera.position, 'z').min(-50).max(50);

// Lights
const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight( 0x404040, 55 );
scene.add( directionalLight );

// Renderer
const renderer = new THREE.WebGLRenderer({antialias: true, alpha:true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 3D Model
const loader = new GLTFLoader();

loader.load('../assets/models/wanderers/scene.gltf', function(gltf) {
  scene.scale.set(0.5,0.5,0.5);
  scene.add(gltf.scene);
}, undefined, function(error) {
  console.error(error);
});

// Animate
function animate() {
  requestAnimationFrame(animate);

  scene.rotation.y += -0.0001;

  renderer.render(scene,camera);
}

// GSAP
gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.create({
  trigger: "canvas",
  start: "top center",
  end: "bottom",
  onUpdate: self => {
    scene.position.z += 0.01
  }
});

animate();