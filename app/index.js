/**
 * Application entry point
 */

// Load application styles
import 'scss/_index.scss';

// Imports
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Create the Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.y = 7;
camera.position.z = 15;

// Lights
const ambientLight = new THREE.AmbientLight(0x404040, 15);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0x404040, 55);
scene.add(directionalLight);

// Renderer
const renderer = new THREE.WebGLRenderer({antialias: true, alpha:true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 3D Model
const loader = new GLTFLoader();

loader.load('../assets/models/futuristic_building/scene.gltf', function(gltf) {
  scene.scale.set(0.5,0.5,0.5);
  scene.add(gltf.scene);
}, undefined, function(error) {
  console.error(error);
});

// Animate
function animate() {
  requestAnimationFrame(animate);

  renderer.render(scene,camera);
}

// GSAP
gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.create({
  trigger: "body",
  start: "top center",
  end: "bottom",
  onUpdate: self => {
    if(self.direction == 1) {
      scene.rotation.y += 0.1;
    } else if(self.direction == -1) {
      scene.rotation.y += -0.1;
    }
  }
});

animate();