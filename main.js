import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
const container = document.getElementById('scene');

renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(0x000000, 0);

container.appendChild(renderer.domElement);


const scene = new THREE.Scene();
scene.rotation.x = 0.1;
const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 10000);
camera.position.set(5, 2, 0);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 25);
directionalLight.position.set(0, 10, 10);
scene.add(directionalLight);
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableZoom = false;
controls.update();

const loadModel = () => {
  const gltfLoader = new GLTFLoader();
  gltfLoader.load('./assets/scene.gltf', (gltf) => {
    const model = gltf.scene;
    // Escalar el modelo
    const scaleFactor = 700; // Ajusta este valor según sea necesario
    model.scale.set(scaleFactor, scaleFactor, scaleFactor);

    // Calcular el centro del modelo
    const box = new THREE.Box3().setFromObject(model);
    const center = box.getCenter(new THREE.Vector3());
    model.position.sub(center); // Mover el modelo al origen

    // Crear un grupo y añadir el modelo
    // const group = new THREE.Group();
    // group.add(model);
    scene.add(model);
  });
};
// resize canvas on resize window
window.addEventListener('resize', () => {
  renderer.setSize(container.clientWidth, container.clientHeight);
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();
});

function animate() {
  if (renderer) {
    // rotate y
    scene.rotation.y += 0.003;
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }
}

loadModel();
animate();


