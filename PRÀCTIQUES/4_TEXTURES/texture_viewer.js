// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 1); // Increased intensity
scene.add(ambientLight);

const pointLight1 = new THREE.PointLight(0xffffff, 2); // Increased intensity
pointLight1.position.set(10, 10, 10);
scene.add(pointLight1);

const pointLight2 = new THREE.PointLight(0xffffff, 2); // Increased intensity
pointLight2.position.set(-10, -10, -10);
scene.add(pointLight2);

const pointLight3 = new THREE.PointLight(0xffffff, 2); // Additional light
pointLight3.position.set(0, 10, 0);
scene.add(pointLight3);

// Set background color to red
scene.background = new THREE.Color(0xff0000);

// Loaders
const mtlLoader = new THREE.MTLLoader();

// Set texture path and loading options
mtlLoader.setPath('OBJ/');
mtlLoader.setMaterialOptions({
    side: THREE.DoubleSide
});

// Log materials to debug texture application
mtlLoader.load('uploads_files_3745706_supreme+x+Nike+Air+More+Uptempo.mtl', (materials) => {
    console.log('Materials loaded:', materials);
    materials.preload();
    
    // Create a texture loader
    const textureLoader = new THREE.TextureLoader();
    textureLoader.setPath('OBJ/');
    
    // Manually load and apply texture if needed
    const texture = textureLoader.load('supremexNikeAirMoreUptempo.jpg', function(loadedTexture) {
        console.log('Texture loaded successfully:', loadedTexture);
        
        // Apply texture to materials if they're empty
        if (Object.keys(materials.materials).length > 0) {
            for (const key in materials.materials) {
                if (!materials.materials[key].map) {
                    materials.materials[key].map = loadedTexture;
                }
                materials.materials[key].side = THREE.DoubleSide;
                materials.materials[key].needsUpdate = true;
            }
        }
    });
    
    const objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.setPath('OBJ/');
    objLoader.load(
        'uploads_files_3745706_supreme+x+Nike+Air+More+Uptempo.obj',
        (object) => {
            console.log('Object loaded:', object);
            scene.add(object);

            // Center the camera on the object
            const box = new THREE.Box3().setFromObject(object);
            const center = box.getCenter(new THREE.Vector3());
            const size = box.getSize(new THREE.Vector3());

            const maxDim = Math.max(size.x, size.y, size.z);
            const fov = camera.fov * (Math.PI / 180);
            const cameraZ = Math.abs(maxDim / Math.sin(fov / 2));

            camera.position.set(center.x, center.y, cameraZ);
            camera.lookAt(center);
        },
        undefined,
        (error) => {
            console.error('An error occurred while loading the OBJ file:', error);
        }
    );
},
(error) => {
    console.error('An error occurred while loading the MTL file:', error);
});

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();
