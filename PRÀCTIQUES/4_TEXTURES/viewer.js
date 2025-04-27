import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';

// Scene setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf8f8f8);

// Camera setup
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Renderer setup
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

// Lighting setup
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight1 = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight1.position.set(1, 1, 1);
scene.add(directionalLight1);

const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight2.position.set(-1, -1, -1);
scene.add(directionalLight2);

// OrbitControls setup
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

// Model loading
function loadModel() {
    const mtlLoader = new MTLLoader();
    mtlLoader.setPath('MODEL/');
    mtlLoader.setMaterialOptions({
        side: THREE.DoubleSide,
        wrap: THREE.RepeatWrapping,
        normalizeRGB: true
    });

    mtlLoader.load('air jordan.mtl', function(materials) {
        materials.preload();
        const objLoader = new OBJLoader();
        objLoader.setMaterials(materials);
        objLoader.setPath('MODEL/');
        objLoader.load('air jordan.obj', function(object) {
            const box = new THREE.Box3().setFromObject(object);
            const center = box.getCenter(new THREE.Vector3());
            const size = box.getSize(new THREE.Vector3());
            object.position.x = -center.x;
            object.position.y = -center.y;
            object.position.z = -center.z;
            object.traverse(function(child) {
                if (child.isMesh) {
                    child.geometry.computeVertexNormals();
                    const newMaterial = new THREE.MeshStandardMaterial({
                        color: 0xffffff,
                        side: THREE.DoubleSide,
                        roughness: 0.5,
                        metalness: 0.1
                    });
                    child.material = newMaterial;
                    const textureLoader = new THREE.TextureLoader();
                    textureLoader.setPath('MODEL/');
                    textureLoader.load('air jordan_DefaultMaterial_BaseColor.png', function(texture) {
                        texture.flipY = false;
                        newMaterial.map = texture;
                        newMaterial.needsUpdate = true;
                    });
                    textureLoader.load('air jordan_DefaultMaterial_Normal.png', function(texture) {
                        texture.flipY = false;
                        newMaterial.normalMap = texture;
                        newMaterial.normalScale = new THREE.Vector2(1, 1);
                        newMaterial.needsUpdate = true;
                    });
                    textureLoader.load('air jordan_DefaultMaterial_Roughness.png', function(texture) {
                        texture.flipY = false;
                        newMaterial.roughnessMap = texture;
                        newMaterial.needsUpdate = true;
                    });
                    textureLoader.load('air jordan_DefaultMaterial_Metallic.png', function(texture) {
                        texture.flipY = false;
                        newMaterial.metalnessMap = texture;
                        newMaterial.needsUpdate = true;
                    });
                }
            });
            scene.add(object);
            const maxDim = Math.max(size.x, size.y, size.z);
            const fov = camera.fov * (Math.PI / 180);
            let cameraZ = Math.abs(maxDim / Math.sin(fov / 2));
            cameraZ *= 1.5;
            camera.position.z = cameraZ;
            const minDistance = maxDim / 2;
            const maxDistance = maxDim * 3;
            controls.minDistance = minDistance;
            controls.maxDistance = maxDistance;
            controls.update();
            document.getElementById('loading').style.display = 'none';
        }, function(xhr) {
            const percent = Math.round((xhr.loaded / xhr.total) * 100);
            document.getElementById('loading').textContent = `Loading model: ${percent}%`;
        }, function(error) {
            document.getElementById('loading').textContent = 'Error loading model. Check console for details.';
            tryLoadingWithoutMaterials();
        });
    }, undefined, function(error) {
        document.getElementById('loading').textContent = 'Error loading materials. Attempting to load model without materials...';
        tryLoadingWithoutMaterials();
    });
}

function tryLoadingWithoutMaterials() {
    const objLoader = new OBJLoader();
    objLoader.setPath('MODEL/');
    objLoader.load('air jordan.obj', function(object) {
        const box = new THREE.Box3().setFromObject(object);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        object.position.x = -center.x;
        object.position.y = -center.y;
        object.position.z = -center.z;
        object.traverse(function(child) {
            if (child.isMesh) {
                const material = new THREE.MeshStandardMaterial({
                    color: 0xffffff,
                    roughness: 0.5,
                    metalness: 0.1,
                    side: THREE.DoubleSide
                });
                child.material = material;
                const textureLoader = new THREE.TextureLoader();
                textureLoader.setPath('MODEL/');
                textureLoader.load('air jordan_DefaultMaterial_BaseColor.png', function(texture) {
                    material.map = texture;
                    material.needsUpdate = true;
                });
            }
        });
        scene.add(object);
        const maxDim = Math.max(size.x, size.y, size.z);
        const fov = camera.fov * (Math.PI / 180);
        let cameraZ = Math.abs(maxDim / Math.sin(fov / 2));
        cameraZ *= 1.5;
        camera.position.z = cameraZ;
        const minDistance = maxDim / 2;
        const maxDistance = maxDim * 3;
        controls.minDistance = minDistance;
        controls.maxDistance = maxDistance;
        controls.update();
        document.getElementById('loading').style.display = 'none';
    }, function(xhr) {
        const percent = Math.round((xhr.loaded / xhr.total) * 100);
        document.getElementById('loading').textContent = `Loading model without materials: ${percent}%`;
    }, function(error) {
        document.getElementById('loading').textContent = 'Failed to load model. Check file paths and try again.';
    });
}

window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

loadModel();
animate();