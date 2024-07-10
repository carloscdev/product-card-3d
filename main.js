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
const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 10000);
camera.position.set(5, 2, 2);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 20);
directionalLight.position.set(0, 10, 10);
scene.add(directionalLight);
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableZoom = true;
controls.update();

const loadModel = () => {
  const gltfLoader = new GLTFLoader();
  gltfLoader.load('/static/scene.gltf', (gltf) => {
    const model = gltf.scene;
        // Escalar el modelo
        const scaleFactor = 500; // Ajusta este valor según sea necesario
        model.scale.set(scaleFactor, scaleFactor, scaleFactor);

        // Calcular el centro del modelo
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        model.position.sub(center); // Mover el modelo al origen

        // Crear un grupo y añadir el modelo
        const group = new THREE.Group();
        group.add(model);
        scene.add(group);
  });
};

function animate() {
  if (renderer) {
    // rotate y
    scene.rotation.y += 0.01;
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }
}

loadModel();
animate();


