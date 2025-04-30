import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// Contenidor del visor
const container = document.getElementById('viewer-container');

// Escena principal
const scene = new THREE.Scene();

// Canviem el fons a rosa
scene.background = new THREE.Color(0xffc0cb);

// Càmera de perspectiva
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Renderitzador WebGL
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild(renderer.domElement);

// Canviem la geometria a un torus
const geometry = new THREE.TorusGeometry(1, 0.4, 16, 100);
let material = new THREE.MeshStandardMaterial({ color: 0x0077ff, metalness: 1, roughness: 0 });
const torus = new THREE.Mesh(geometry, material);
scene.add(torus);

// Llum ambiental i diverses llums direccionals per veure millor els materials
const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambientLight);

// Diverses llums direccionals des de diferents angles
const lights = [
    { position: [5, 5, 5], intensity: 0.7 },    // Dreta-frontal-superior
    { position: [-5, 5, 5], intensity: 0.5 },   // Esquerra-frontal-superior
    { position: [0, -5, 5], intensity: 0.4 },   // Frontal-inferior
    { position: [0, 0, -5], intensity: 0.3 },   // Posterior
    { position: [0, 10, 0], intensity: 0.3 }    // Superior
];

lights.forEach(light => {
    const dirLight = new THREE.DirectionalLight(0xffffff, light.intensity);
    dirLight.position.set(...light.position);
    scene.add(dirLight);
});

// Afegim més llums per millorar la il·luminació
const additionalLights = [
    { position: [10, 10, 10], intensity: 0.8 },  // Dreta-superior-frontal
    { position: [-10, 10, 10], intensity: 0.6 }, // Esquerra-superior-frontal
    { position: [10, -10, 10], intensity: 0.5 }, // Dreta-inferior-frontal
    { position: [-10, -10, -10], intensity: 0.4 } // Esquerra-inferior-posterior
];

additionalLights.forEach(light => {
    const dirLight = new THREE.DirectionalLight(0xffffff, light.intensity);
    dirLight.position.set(...light.position);
    scene.add(dirLight);
});

// Controls d'òrbita per moure la càmera
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Posició inicial de la càmera
camera.position.z = 5;

// Add this CSS dynamically to apply the typography from index.html to the controls
const style = document.createElement('style');
style.textContent = `
    #controls {
        font-family: 'Sora', 'Lora', Arial, sans-serif;
        font-size: 14px;
        color: #333;
    }
    #controls label {
        font-weight: 500;
    }
`;
document.head.appendChild(style);

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
    torus.material = material;
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