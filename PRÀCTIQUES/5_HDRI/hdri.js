import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { EXRLoader } from 'three/addons/loaders/EXRLoader.js';

// Escena
const scene = new THREE.Scene();

// Càmera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 1, 3);

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.0;
renderer.outputColorSpace = THREE.SRGBColorSpace;
document.body.appendChild(renderer.domElement);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Carrega HDRI
new EXRLoader()
    .load('ballawley_park_2k.exr', function (texture) {
        texture.mapping = THREE.EquirectangularReflectionMapping;
        scene.environment = texture;
        scene.background = texture;
        // Un cop carregat, renderitza una vegada per assegurar el fons
        renderer.render(scene, camera);
    });

// Crea un cilindre
const geometry = new THREE.CylinderGeometry(0.5, 0.5, 1.5, 64);
const material = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    metalness: 0.7,
    roughness: 0.2
});
const cylinder = new THREE.Mesh(geometry, material);
scene.add(cylinder);

// Llum suau per a més realisme
const ambient = new THREE.AmbientLight(0xffffff, 0.2);
scene.add(ambient);

// (Opcional) Elimina la llum ambiental per veure millor l'efecte HDRI
// scene.remove(ambient);

// Redimensionament
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Animació
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();