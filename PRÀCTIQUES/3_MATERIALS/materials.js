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

// Afegim un cilindre per provar diferents materials
const geometry = new THREE.CylinderGeometry(1, 1, 2, 32);
let material = new THREE.MeshStandardMaterial({ color: 0x0077ff, metalness: 1, roughness: 0 });
const cylinder = new THREE.Mesh(geometry, material);
scene.add(cylinder);

// Llum ambiental i direccional per veure els materials
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

// Controls d'òrbita per moure la càmera
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Posició inicial de la càmera
camera.position.z = 5;

// Funció per canviar el material segons el tipus seleccionat
function updateMaterial(type) {
    switch (type) {
        case 'metallic':
            material = new THREE.MeshStandardMaterial({ color: 0x0077ff, metalness: 1, roughness: 0 });
            break;
        case 'plastic':
            material = new THREE.MeshStandardMaterial({ color: 0xff7700, metalness: 0, roughness: 0.5 });
            break;
        case 'glass':
            material = new THREE.MeshPhysicalMaterial({ color: 0x77aaff, metalness: 0, roughness: 0, transmission: 0.9, opacity: 0.5, transparent: true });
            break;
    }
    cylinder.material = material;
}

// Escolta el canvi de material des dels radio buttons
const materialRadios = document.getElementsByName('material');
materialRadios.forEach(radio => {
    radio.addEventListener('change', (event) => {
        updateMaterial(event.target.value);
    });
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