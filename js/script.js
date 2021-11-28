import { Figure } from './figure.js';
import { scene } from './scene.js';
import { PerspectiveCamera, WebGLRenderer, DirectionalLight, AmbientLight } from './three.module.js';

const canvas = document.getElementById('canvas');
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const camera = new PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000);
camera.position.z = 5;
scene.add(camera);

const renderer = new WebGLRenderer({ canvas });
const render = (renderer) => {
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix()
  render(renderer);
})

const lightAmbient = new AmbientLight('#9eaeff', 0.2);
scene.add(lightAmbient);

const lightDirectional = new DirectionalLight('#ffffff', 1);
scene.add(lightDirectional);
lightDirectional.position.set(5, 5, 5);

const figure = new Figure();
figure.init();

render(renderer);
