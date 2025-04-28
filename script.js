import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';

// Setup
const container = document.getElementById('viewer-container');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, container.clientWidth/container.clientHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setClearColor(0xf5f5f5, 1);
container.appendChild(renderer.domElement);

// Enhanced lighting setup
scene.add(new THREE.AmbientLight(0xffffff, 0.4));

const lights = [
    { position: [0, 0, 5], intensity: 0.8 },   // Front
    { position: [0, 0, -5], intensity: 0.6 },  // Back
    { position: [-5, 0, 0], intensity: 0.6 },  // Left
    { position: [5, 0, 0], intensity: 0.6 },   // Right
    { position: [0, 5, 0], intensity: 0.6 }    // Top
];

lights.forEach(light => {
    const directionalLight = new THREE.DirectionalLight(0xffffff, light.intensity);
    directionalLight.position.set(...light.position);
    scene.add(directionalLight);
});

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Materials creator function
function createMaterials(color) {
    return {
        standard: new THREE.MeshStandardMaterial({
            color: color,
            roughness: 0.5,
            metalness: 0.5
        }),
        metallic: new THREE.MeshStandardMaterial({
            color: color,
            roughness: 0.2,
            metalness: 0.9
        }),
        plastic: new THREE.MeshPhongMaterial({
            color: color,
            shininess: 100,
            specular: 0x444444
        }),
        toon: new THREE.MeshToonMaterial({
            color: color
        }),
        wireframe: new THREE.MeshBasicMaterial({
            color: color,
            wireframe: true
        })
    };
}

let currentModel = null;
let materials = createMaterials(0x808080);
let currentMaterialType = 'standard';

// Load model
new OBJLoader().load('PAGE/MODELS/Helmet.OBJ', 
    model => {
        currentModel = model;
        model.traverse(child => {
            if (child instanceof THREE.Mesh) {
                child.material = materials.standard;
            }
        });
        
        scene.add(model);
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        
        // Center the model
        model.position.sub(center);
        
        // Move the model up by half its height
        model.position.y += size.y * 1;
        
        // Rotate the model 90 degrees around the X axis
        model.rotation.x = - Math.PI / 2;
        
        camera.position.z = Math.max(...Object.values(size)) * 2;
        controls.update();
    },
    undefined,
    error => document.getElementById('error').textContent = 'Error loading model'
);

// Material change handler
document.getElementById('material-select').addEventListener('change', (event) => {
    if (currentModel) {
        currentMaterialType = event.target.value;
        const newMaterial = materials[currentMaterialType];
        currentModel.traverse(child => {
            if (child instanceof THREE.Mesh) {
                child.material = newMaterial;
            }
        });
    }
});

// Color change handler
document.getElementById('color-picker').addEventListener('input', (event) => {
    if (currentModel) {
        const color = new THREE.Color(event.target.value);
        materials = createMaterials(color);
        currentModel.traverse(child => {
            if (child instanceof THREE.Mesh) {
                child.material = materials[currentMaterialType];
            }
        });
    }
});

// Animation
(function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
})();

// Handle resize
window.addEventListener('resize', () => {
    const container = document.getElementById('viewer-container');
    camera.aspect = container.clientWidth/container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
});