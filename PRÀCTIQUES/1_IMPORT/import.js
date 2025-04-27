// import.js - Exemple d'importació d'un model OBJ amb Three.js
import * as THREE from 'three';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// Contenidor on es mostrarà el visor
const container = document.getElementById('viewer-container');

// Escena Three.js
const scene = new THREE.Scene();

// Càmera de perspectiva
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Renderitzador WebGL
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild(renderer.domElement);

// Llum ambiental suau
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

// Llum direccional per donar volum
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(1, 1, 1).normalize();
scene.add(directionalLight);

// Posició inicial de la càmera
camera.position.z = 5;

// Loader per a fitxers OBJ
const objLoader = new OBJLoader();

// Quan l'usuari selecciona un fitxer OBJ
// - Es llegeix el fitxer
// - Es carrega i centra el model
// - Es posiciona la càmera correctament
// - S'afegeix el model a l'escena
// - Es pot navegar amb el ratolí

document.getElementById('file-input').addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const contents = e.target.result;
            const object = objLoader.parse(contents);

            // Centrar el model
            const box = new THREE.Box3().setFromObject(object);
            const center = box.getCenter(new THREE.Vector3());
            const size = box.getSize(new THREE.Vector3());
            object.position.sub(center);
            object.position.y += size.y / 2;

            // Ajustar càmera segons la mida del model
            camera.position.set(0, size.y, size.z * 2);
            camera.lookAt(0, 0, 0);

            scene.add(object);
        };
        reader.readAsText(file);
    }
});

// Controls d'òrbita per moure la càmera amb el ratolí
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Actualitzar aspect ratio i mida del renderitzador si la finestra canvia
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Bucle d'animació
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

animate();