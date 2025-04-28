# Estructura bàsica d'un projecte Three.js

Aquesta guia explica l'estructura mínima d'un projecte amb Three.js per a principiants. Pots utilitzar aquest esquema com a punt de partida per crear les teves pròpies escenes 3D.

## 1. Incloure Three.js

Pots afegir Three.js al teu projecte mitjançant CDN:

```html
<script src="https://unpkg.com/three@0.152.2/build/three.min.js"></script>
```

O bé, utilitzar mòduls ES6:

```html
<script type="module">
  import * as THREE from 'https://unpkg.com/three@0.152.2/build/three.module.js';
</script>
```

## 2. Estructura bàsica del codi

```js
// Crear l'escena
const scene = new THREE.Scene();

// Crear la càmera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

// Crear el renderitzador
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Afegir un objecte (exemple: cub)
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Posicionar la càmera
camera.position.z = 5;

// Animació
function animate() {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
}

animate();
```

## 3. Recomanacions
- Organitza el teu codi en fitxers separats (HTML, JS, CSS).
- Utilitza controls d'òrbita (`OrbitControls`) per facilitar la navegació.
- Consulta la [documentació oficial de Three.js](https://threejs.org/docs/) per a més exemples i recursos.
