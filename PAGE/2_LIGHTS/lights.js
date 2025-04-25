import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// Configuració inicial
const container = document.getElementById('viewer-container');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild(renderer.domElement);

// Afegir una forma bàsica
const geometry = new THREE.SphereGeometry(1, 32, 32);
const material = new THREE.MeshStandardMaterial({ color: 0x0077ff });
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// Configuració de llums
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

// Controls orbitals
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Posicionar la càmera
camera.position.z = 5;

// Gestió d'esdeveniments per activar/desactivar llums
const ambientCheckbox = document.getElementById('ambient-light');
const directionalCheckbox = document.getElementById('directional-light');

ambientCheckbox.addEventListener('change', () => {
    ambientLight.visible = ambientCheckbox.checked;
});

directionalCheckbox.addEventListener('change', () => {
    directionalLight.visible = directionalCheckbox.checked;
});

// Animació
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

animate();

// Ajustar el renderitzador en redimensionar la finestra
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
