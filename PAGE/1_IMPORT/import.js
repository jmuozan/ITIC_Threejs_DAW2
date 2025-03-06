// Global variables
let scene, camera, renderer, controls;
let currentModel = null;

// Initialize the scene
function init() {
    // Create scene
    scene = new THREE.Scene();
    
    // Create camera
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 5, 10);
    
    // Create renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x333333);
    document.getElementById('container').appendChild(renderer.domElement);
    
    // Add grid for reference
    const grid = new THREE.GridHelper(20, 20);
    scene.add(grid);
    
    // Add axes helper
    const axesHelper = new THREE.AxesHelper(2);
    scene.add(axesHelper);
    
    // Add lights
    addLights();
    
    // Setup orbit controls
    setupOrbitControls();
    
    // Add event listeners
    window.addEventListener('resize', onWindowResize);
    document.getElementById('load-button').addEventListener('click', () => {
        document.getElementById('file-input').click();
    });
    document.getElementById('file-input').addEventListener('change', loadOBJFile);
    document.getElementById('reset-button').addEventListener('click', resetCamera);
    
    // Start animation loop
    animate();
}

// Add lights to the scene
function addLights() {
    const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1).normalize();
    scene.add(directionalLight);
    
    const pointLight = new THREE.PointLight(0xff9900, 1, 50);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);
}

// Setup manual orbit controls
function setupOrbitControls() {
    controls = {
        target: new THREE.Vector3(0, 0, 0),
        rotateSpeed: 1.0,
        zoomSpeed: 1.2,
        isDragging: false,
        previousMousePosition: { x: 0, y: 0 },
        update: function() {
            camera.lookAt(this.target);
        }
    };
    
    // Mouse events for rotation
    renderer.domElement.addEventListener('mousedown', (e) => {
        controls.isDragging = true;
        controls.previousMousePosition = {
            x: e.clientX,
            y: e.clientY
        };
    });
    
    renderer.domElement.addEventListener('mousemove', (e) => {
        if (!controls.isDragging) return;
        
        const deltaMove = {
            x: e.clientX - controls.previousMousePosition.x,
            y: e.clientY - controls.previousMousePosition.y
        };
        
        if (deltaMove.x !== 0 || deltaMove.y !== 0) {
            const deltaRotationQuaternion = new THREE.Quaternion()
                .setFromEuler(new THREE.Euler(
                    toRadians(-deltaMove.y * 0.5),
                    toRadians(-deltaMove.x * 0.5),
                    0,
                    'XYZ'
                ));
            
            const cameraPosition = new THREE.Vector3().subVectors(
                camera.position, controls.target
            );
            cameraPosition.applyQuaternion(deltaRotationQuaternion);
            camera.position.copy(cameraPosition.add(controls.target));
        }
        
        controls.previousMousePosition = {
            x: e.clientX,
            y: e.clientY
        };
    });
    
    renderer.domElement.addEventListener('mouseup', () => {
        controls.isDragging = false;
    });
    
    // Zoom with mouse wheel
    renderer.domElement.addEventListener('wheel', (e) => {
        e.preventDefault();
        
        const zoomDirection = e.deltaY > 0 ? 1 : -1;
        const cameraPosition = new THREE.Vector3().subVectors(
            camera.position, controls.target
        );
        
        if (zoomDirection > 0) {
            cameraPosition.multiplyScalar(controls.zoomSpeed);
        } else {
            cameraPosition.divideScalar(controls.zoomSpeed);
        }
        
        camera.position.copy(cameraPosition.add(controls.target));
    });
}

// Handle window resize
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Convert degrees to radians
function toRadians(degrees) {
    return degrees * (Math.PI / 180);
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

// Load OBJ file
function loadOBJFile(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    document.getElementById('info').textContent = `Loading ${file.name}...`;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const contents = e.target.result;
            
            // Parse OBJ file
            const objData = parseOBJ(contents);
            
            if (objData.vertices.length === 0) {
                throw new Error("No vertices found in OBJ file");
            }
            
            // Create geometry
            const geometry = new THREE.BufferGeometry();
            geometry.setAttribute('position', new THREE.Float32BufferAttribute(objData.vertices, 3));
            
            if (objData.normals.length > 0) {
                geometry.setAttribute('normal', new THREE.Float32BufferAttribute(objData.normals, 3));
            } else {
                geometry.computeVertexNormals();
            }
            
            // Create material and mesh
            const material = new THREE.MeshPhongMaterial({ color: 0xcccccc });
            const mesh = new THREE.Mesh(geometry, material);
            
            // Remove previous model if exists
            if (currentModel) {
                scene.remove(currentModel);
            }
            
            // Add the mesh to the scene
            scene.add(mesh);
            currentModel = mesh;
            
            // Center and scale the model
            setTimeout(() => {
                centerModel(mesh);
                document.getElementById('info').textContent = `Loaded: ${file.name}`;
            }, 100);
        } catch (error) {
            document.getElementById('info').textContent = `Error: ${error.message}`;
            console.error(error);
        }
    };
    
    reader.readAsText(file);
}

// Center and scale the model
function centerModel(model) {
    if (!model) return;
    
    // Get the geometry
    const geometry = model.geometry;
    geometry.computeBoundingBox();
    const center = geometry.boundingBox.getCenter(new THREE.Vector3());
    
    // Center the vertices
    const positionAttr = geometry.attributes.position;
    for (let i = 0; i < positionAttr.count; i++) {
        positionAttr.setXYZ(
            i,
            positionAttr.getX(i) - center.x,
            positionAttr.getY(i) - center.y,
            positionAttr.getZ(i) - center.z
        );
    }
    positionAttr.needsUpdate = true;
    
    // Scale the model
    geometry.computeBoundingBox();
    const size = geometry.boundingBox.getSize(new THREE.Vector3());
    const maxDimension = Math.max(size.x, size.y, size.z);
    
    if (maxDimension > 0) {
        const scale = 5 / maxDimension;
        model.scale.set(scale, scale, scale);
    }
    
    // Update geometry
    geometry.computeBoundingSphere();
    
    // Reset camera
    resetCamera();
}

// Reset camera position
function resetCamera() {
    if (currentModel) {
        controls.target.set(0, 0, 0);
        
        const boundingBox = new THREE.Box3().setFromObject(currentModel);
        const size = boundingBox.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        
        camera.position.set(maxDim * 1.5, maxDim * 1.5, maxDim * 1.5);
    } else {
        camera.position.set(0, 5, 10);
        controls.target.set(0, 0, 0);
    }
    
    camera.lookAt(controls.target);
}

// Parse OBJ file
function parseOBJ(text) {
    const vertices = [];
    const normals = [];
    
    // Temporary arrays
    const tempVertices = [];
    const tempNormals = [];
    
    // Split into lines
    const lines = text.split('\n');
    
    // Process each line
    for (let line of lines) {
        line = line.trim();
        
        // Skip empty lines and comments
        if (line === '' || line.startsWith('#')) continue;
        
        const parts = line.split(/\s+/);
        const prefix = parts[0];
        
        if (prefix === 'v') {
            // Vertex
            tempVertices.push(
                parseFloat(parts[1]),
                parseFloat(parts[2]),
                parseFloat(parts[3])
            );
        } else if (prefix === 'vn') {
            // Vertex normal
            tempNormals.push(
                parseFloat(parts[1]),
                parseFloat(parts[2]),
                parseFloat(parts[3])
            );
        } else if (prefix === 'f') {
            // Face - only process if there are at least 3 vertices
            if (parts.length >= 4) {
                processFace(parts, tempVertices, tempNormals, vertices, normals);
            }
        }
    }
    
    return {
        vertices: vertices,
        normals: normals
    };
}

// Process face data
function processFace(parts, tempVertices, tempNormals, vertices, normals) {
    // Create triangles for polygons
    for (let i = 1; i <= parts.length - 3; i++) {
        const v1 = parts[1];  // First vertex is always the same
        const v2 = parts[i + 1];
        const v3 = parts[i + 2];
        
        // Skip if any vertex is undefined
        if (!v1 || !v2 || !v3) continue;
        
        processVertex(v1, tempVertices, tempNormals, vertices, normals);
        processVertex(v2, tempVertices, tempNormals, vertices, normals);
        processVertex(v3, tempVertices, tempNormals, vertices, normals);
    }
}

// Process a single vertex
function processVertex(vertexData, tempVertices, tempNormals, vertices, normals) {
    if (!vertexData) return;
    
    const vertexParts = vertexData.split('/');
    
    // Get vertex index (OBJ indices are 1-based)
    const vertexIndex = parseInt(vertexParts[0]) - 1;
    
    // Add vertex coordinates
    if (vertexIndex >= 0 && vertexIndex * 3 + 2 < tempVertices.length) {
        vertices.push(
            tempVertices[vertexIndex * 3],
            tempVertices[vertexIndex * 3 + 1],
            tempVertices[vertexIndex * 3 + 2]
        );
    }
    
    // Add normal if available
    if (vertexParts.length > 2 && vertexParts[2] !== '') {
        const normalIndex = parseInt(vertexParts[2]) - 1;
        if (normalIndex >= 0 && normalIndex * 3 + 2 < tempNormals.length) {
            normals.push(
                tempNormals[normalIndex * 3],
                tempNormals[normalIndex * 3 + 1],
                tempNormals[normalIndex * 3 + 2]
            );
        }
    }
}

// Start everything
init();