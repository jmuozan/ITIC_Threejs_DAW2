import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// Contenidor del visor
const container = document.getElementById('viewer-container');

// Escena principal
const scene = new THREE.Scene();

// Càmera de perspectiva
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Renderitzador WebGL
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild(renderer.domElement);

// Afegim una esfera per veure l'efecte de la llum
const geometry = new THREE.SphereGeometry(1, 32, 32);
const material = new THREE.MeshStandardMaterial({ color: 0x0077ff });
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// Llum ambiental
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

// Llum direccional
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

// Llum puntual
const pointLight = new THREE.PointLight(0xffffff, 0.8);
pointLight.position.set(2, 2, 2);
scene.add(pointLight);

// Llum focal
const spotLight = new THREE.SpotLight(0xffffff, 0.8);
spotLight.position.set(-3, 5, 3);
spotLight.target = sphere; // Apunta cap a l'esfera
scene.add(spotLight);

// Controls d'òrbita
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Posició inicial de la càmera
camera.position.z = 5;

// Permet activar/desactivar cada llum amb checkbox
const ambientCheckbox = document.getElementById('ambient-light');
const directionalCheckbox = document.getElementById('directional-light');
const pointCheckbox = document.getElementById('point-light');
const spotCheckbox = document.getElementById('spot-light');

ambientCheckbox.addEventListener('change', () => {
    ambientLight.visible = ambientCheckbox.checked;
});

directionalCheckbox.addEventListener('change', () => {
    directionalLight.visible = directionalCheckbox.checked;
});

pointCheckbox.addEventListener('change', () => {
    pointLight.visible = pointCheckbox.checked;
});

spotCheckbox.addEventListener('change', () => {
    spotLight.visible = spotCheckbox.checked;
});

// Bucle d'animació
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

animate();

// Ajustar aspect ratio i mida del renderitzador si la finestra canvia
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});