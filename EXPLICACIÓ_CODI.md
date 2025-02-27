# Documentació del Projecte Museu3D

## Taula de Continguts

1. [Estructura HTML](#estructura-html)
2. [Estils CSS](#estils-css)
3. [Funcionalitat JavaScript amb Three.js](#funcionalitat-javascript-amb-threejs)
4. [Integració i flux de dades](#integració-i-flux-de-dades)

---

## Estructura HTML

El fitxer `index.html` defineix l'estructura bàsica de la pàgina web.

### Capçalera (head)

```html
<head>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Sora:wght@100..800&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400..700;1,400..700&family=Sora:wght@100..800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <link rel="stylesheet" href="styles.css">
</head>
```

**Explicació:**
- Connectem amb Google Fonts per carregar les fonts "Sora" i "Lora"
- Importem la biblioteca Font Awesome per a les icones de les xarxes socials
- Enllacem el nostre fitxer CSS extern `styles.css`

### Estructura Principal del Cos (body)

```html
<body>
    <div class="header">
        <!-- Contingut de la capçalera -->
    </div>

    <div class="container">
        <div class="left-side">
            <!-- Informació i imatge de la peça -->
        </div>
        <div class="right-side">
            <!-- Controls i visor 3D -->
        </div>
    </div>

    <footer class="footer">
        <!-- Contingut del peu de pàgina -->
    </footer>
    
    <!-- Scripts -->
</body>
```

**Explicació:**
- L'estructura es divideix en tres parts principals: capçalera, contenidor principal i peu de pàgina
- El contenidor principal `container` està dividit en dues parts: 
  - La part esquerra `left-side` mostra una imatge i informació textual sobre l'artefacte
  - La part dreta `right-side` conté el visor 3D i els controls per manipular el model

### Capçalera (header)

```html
<div class="header">
    <div class="header-logo">El Museu 3D</div>
    <div class="header-links">
        <a href="https://jmuozan.github.io/three.js_workshop/">Home</a>
        <a target="_blank" href="https://github.com/jmuozan/three.js_workshop">Repo</a>
        <a href="#">Playground</a>
    </div>
</div>
```

**Explicació:**
- Conté el "logotip" del museu i enllaços de navegació

### Part Esquerra - Informació de l'Artefacte

```html
<div class="left-side">
    <img src="PAGE/IMG/Bizzarre helmet.jpg" alt="Bizarre helmet" class="left-image">
    <div class="artifact-info">
        <h2>Cavalry Helmet</h2>
        <div class="artifact-metadata">
            <p><strong>Year:</strong> XXXX</p>
            <p><strong>Artist:</strong> Lorem Ipsum</p>
            <p><strong>Collection:</strong> Lorem Ipsum</p>
        </div>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. vero earum tenetur quidem illo itaque praesentium quo, inventore, quam, totam reprehenderit!</p>
    </div>
</div>
```

**Explicació:**
- Mostrem la imatge
- Afegim metadata com el títol, any, artista i col·lecció
- Breu descripció de l'artefacte

### Part Dreta - Visor 3D i Controls

```html
<div class="right-side">
    <div class="material-controls">
        <div class="control-group">
            <label>
                Material:
                <select id="material-select">
                    <option value="standard">Standard</option>
                    <option value="metallic">Metallic</option>
                    <option value="plastic">Plastic</option>
                    <option value="toon">Toon</option>
                    <option value="wireframe">Wireframe</option>
                </select>
            </label>
        </div>
        <div class="control-group">
            <label>
                Color:
                <input type="color" id="color-picker" value="#808080">
            </label>
        </div>
    </div>
    <div id="viewer-container">
        <div id="error"></div>
    </div>
</div>
```

**Explicació:**
- Controls per canviar el material i el color del model 3D
- El selector de material ofereix 5 opcions diferents: Standard, Metallic, Plastic, Toon i Wireframe
- El selector de color permet escollir qualsevol color per aplicar-lo al model
- El contenidor `viewer-container` és on es renderitzarà el model 3D
- S'inclou un element per mostrar missatges d'error si hi ha problemes en carregar el model

### Peu de Pàgina (Footer)

```html
<footer class="footer">
    <div class="footer-content">
        <div class="footer-logos">
            <img src="PAGE/IMG/LOGOS/logoITICBCN.png" alt="ITIC BCN Logo" class="footer-logo-img">
            <img src="PAGE/IMG/LOGOS/logo_CEB.png" alt="CEB Logo" class="footer-logo-img">
            <img src="PAGE/IMG/LOGOS/footer-logos-white.svg" alt="CEB Logo" class="footer-logo-img">
        </div>
        <div class="social-links">
            <a href="https://github.com/jmuozan/itic_threejs_ws" class="social-link" target="_blank" rel="noopener noreferrer">
                <i class="fa-brands fa-github"></i>
            </a>
            <a href="https://www.linkedin.com/school/iticbcn/posts/?feedView=all" class="social-link" target="_blank" rel="noopener noreferrer">
                <i class="fa-brands fa-linkedin-in"></i>
            </a>
            <a href="https://www.instagram.com/iticbcn/?igsh=ZWdzZmwzaWM0M3Rk" class="social-link" target="_blank" rel="noopener noreferrer">
                <i class="fa-brands fa-instagram"></i>
            </a>
            <a href="https://agora.xtec.cat/iticbcn/" class="social-link" target="_blank" rel="noopener noreferrer">
                <i class="fa-brands fa-x-twitter"></i>
            </a>
        </div>
    </div>
</footer>
```

**Explicació:**
- Logos institucionals + enllaços a xarxes socials (GitHub, LinkedIn, Instagram, Twitter) amb ícones de Font Awesome

### Scripts

```html
<script async src="https://unpkg.com/es-module-shims"></script>
<script type="importmap">
{
    "imports": {
        "three": "https://unpkg.com/three@0.159.0/build/three.module.js",
        "three/addons/": "https://unpkg.com/three@0.159.0/examples/jsm/"
    }
}
</script>
<script type="module" src="script.js"></script>
```

**Explicació:**
- `es-module-shims`: Proporciona compatibilitat per a navegadors que no suporten mapes d'importació de manera nativa
- `importmap`: Defineix els mapes d'importació per carregar Three.js i els seus addons des de CDN
- Finalment, carreguem el nostre script JavaScript principal com a mòdul

---

## Estils CSS

El fitxer `styles.css` definirà l'aspecte visual de tots els elements de la pàgina.

### Estils Bàsics i del Cos

```css
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: Arial, sans-serif;
    background-color: #f0f0f0;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    margin: 0;
    position: relative;
}
```

**Explicació:**
- Resetegem els marges i paddings predeterminats
- Utilitzem `box-sizing: border-box` per a un control millor de les dimensions
- Configurem el cos amb un tipus de lletra sans-serif i un fons gris clar
- Utilitzem flexbox per a l'estructura principal

### Estructura de Contenidor

```css
.container {
    display: flex;
    min-height: calc(100vh - 120px);
    width: 100vw;
    padding-top: 60px;
}

.left-side {
    flex: 1;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    overflow: hidden;
    align-items: center;
    max-width: 500px;
}

.right-side {
    flex: 1.5;
    position: relative;
    background-color: #f0f0f0;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
}
```

**Explicació:**
- El contenidor principal utilitza flexbox per dividir la pantalla en dues parts
- `left-side` ocupa 1 part de l'espai amb un amplada màxima de 500px
- `right-side` ocupa 1.5 parts de l'espai amb més amplada per al visor 3D
- El contenidor principal té una altura mínima calculada (viewport height - 120px) per a deixar espai per al peu de pàgina

### Estils de la Part Esquerra

```css
.left-image {
    width: 100%;
    height: 400px;
    object-fit: cover;
    background-color: white;
}

.artifact-info {
    margin-top: 0.5rem;
    padding: 1rem;
    background-color: white;
    width: 100%;
    font-size: 0.9rem;
}

.artifact-info h2 {
    font-size: 1.5rem;
    color: #333;
    margin-bottom: 1rem;
}

.artifact-info p {
    color: #666;
    margin-bottom: 0.5rem;
    line-height: 1.6;
}

.artifact-metadata {
    font-size: 0.9rem;
    color: #888;
    margin-top: 1rem;
    padding-top: 1rem;
}
```

**Explicació:**
- La imatge té una altura fixa i cobreix tot l'ample disponible
- La secció d'informació té un fons blanc per a contrastar amb el fons gris general
- Els textos tenen mides i colors diferents per a establir una jerarquia visual

### Estils de la Part Dreta i Visor

```css
#viewer-container {
    width: 90%;
    height: 90%;
    position: relative;
}

#error {
    position: fixed;
    top: 10px;
    left: 10px;
    color: red;
    z-index: 1000;
}

.material-controls {
    margin-bottom: 0.5rem;
    width: 90%;
    display: flex;
    justify-content: flex-start;
    gap: 2rem;
    padding: 0.75rem;
    background-color: white;
}

.control-group {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.material-controls select {
    padding: 0.5rem;
    border-radius: 4px;
    border: 1px solid #ddd;
    background-color: white;
    cursor: pointer;
}

.material-controls label {
    display: flex;
    align-items: center;
    color: #333;
    font-weight: 500;
    gap: 0.5rem;
}

#color-picker {
    width: 50px;
    height: 30px;
    padding: 0;
    border: 1px solid #ddd;
    border-radius: 4px;
    cursor: pointer;
}
```

**Explicació:**
- El contenidor del visor ocupa gran part de l'espai disponible
- Les alertes d'error apareixen en vermell per sobre de tot
- Els controls de material tenen un fons blanc amb una disposició horitzontal
- S'utilitza flexbox per alinear els controls i els seus elements
- Estils específics per els controls 

### Estils de la Capçalera (header)

```css
.header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 60px;
    padding: 0 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 1000;
    background-color: rgba(240, 240, 240);
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.header-logo {
    font-size: 1.5rem;
    color: #333;
    font-weight: bold;
    margin-left: 1rem;
}

.header-links {
    display: flex;
    gap: 2rem;
}

.header-links a {
    color: #333;
    text-decoration: none;
}
```

**Explicació:**
- La capçalera està fixada a la part superior de la pantalla
- Utilitza flexbox per a col·locar el logotip a l'esquerra i els enllaços a la dreta
- Els enllaços estan separats 2rem entre ells i no tenen subratllat

### Estils del Peu de Pàgina (Footer)

```css
.footer {
    background-color: white;
    box-shadow: 0 -2px 4px rgba(0,0,0,0.1);
    padding: 0 2rem;
    height: 60px;
    width: 100%;
}

.footer-content {
    max-width: 1400px;
    margin: 0 auto;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.footer-logos {
    display: flex;
    align-items: center;
    gap: 2rem;
}

.footer-logo-img {
    height: 40px;
    width: auto;
    object-fit: contain;
}

.social-links {
    display: flex;
    gap: 1.5rem;
}

.social-link {
    color: #333;
    font-size: 1.2rem;
    text-decoration: none;
    transition: color 0.3s ease;
}

.social-link:hover {
    color: #666;
}
```

**Explicació:**
- El peu de pàgina té un fons blanc amb una ombra invertida
- Té una altura fixa de 60px
- El contingut té una amplada màxima per a pantalles grans
- Els logotips i els enllaços socials estan alineats en extrems oposats
- Els logotips tenen una mida fixa
- Els enllaços socials tenen una transició de color en passar-hi per sobre

---

## Funcionalitat JavaScript utilitzanf Three.js

El fitxer `script.js` conté tota la lògica per a carregar i manipular el model 3D utilitzant Three.js.

### Importacions i Configuració Inicial

```javascript
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
```

**Explicació:**
- Importem les biblioteques necessàries de Three.js:
  - `THREE`: Biblioteca principal
  - `OrbitControls`: Per rotació i zoom amb el ratolí
  - `OBJLoader`: Per carregar models 3D en format OBJ
- Configurem els components bàsics de Three.js:
  - `scene`: L'escena on s'afegeixen tots els objectes
  - `camera`: Una càmera de perspectiva amb paràmetres específics (FOV, aspect ratio, near plane, far plane)
  - `renderer`: El renderitzador WebGL amb fons transparent
- Afegim el canvas creat pel renderitzador al nostre contenidor HTML

### Configuració de Llums

```javascript
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
```

**Explicació:**
- Afegim una llum ambient per il·luminar uniformement tota l'escena
- Creem cinc llums direccionals col·locades en diferents posicions:
  - Davant (amb més intensitat)
  - Darrere
  - Esquerra
  - Dreta
  - A dalt
- Aquest arranjament proporciona una il·luminació adequada des de totes les direccions

### Configuració de Controls d'Orbital

```javascript
// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
```

**Explicació:**
- Instanciem els controls d'orbital, que permeten:
  - Rotar la càmera al voltant del model
  - Fer zoom
  - Moure la càmera
- Activem `enableDamping` per un moviment més suau i natural

### Creació de Materials

```javascript
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
```

**Explicació:**
- Definim una funció per crear diversos tipus de materials:
  - `standard`: Material PBR (Physically Based Rendering) amb propietats equilibrades
  - `metallic`: Material PBR amb propietats metàl·liques (baixa rugositat, alta metal·licitat)
  - `plastic`: Material Phong amb lluentor per a aparença plàstica
  - `toon`: Material de dibuix animat amb tons més plans
  - `wireframe`: Material bàsic que només mostra els vèrtexs i arestes
- Creem variables per emmagatzemar:
  - El model actual
  - Els materials disponibles (amb color gris per defecte)
  - El tipus de material seleccionat actualment

### Càrrega del Model 3D

```javascript
// Load model
new OBJLoader().load('PAGE/MODELS/HelmetMoustacheDecimated.OBJ', 
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
        
        // Flip the model upside down by rotating 180 degrees around X axis
        model.rotation.x = Math.PI;
        
        camera.position.z = Math.max(...Object.values(size)) * 2;
        controls.update();
    },
    undefined,
    error => document.getElementById('error').textContent = 'Error loading model'
);
```

**Explicació:**
- Utilitzem `OBJLoader` per carregar el model 3D
- Quan el model està carregat:
  1. L'assignem a la variable `currentModel`
  2. Apliquem el material estàndard a tots els elements de tipus Mesh
  3. Afegim el model a l'escena
  4. Calculem la caixa delimitadora del model
  5. Centrem el model restant la posició central de la caixa
  6. Movem el model cap amunt perquè la seva base estigui al centre
  7. Girem el model 180 graus al voltant de l'eix X per orientar-lo correctament
  8. Posicionem la càmera a una distància proporcional a la mida del model
- Si hi ha un error en la càrrega, mostrem un missatge d'error

### Gestió d'Esdeveniments per als Controls

```javascript
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
```

**Explicació:**
- **Gestor de canvi de material**:
  - Detecta canvis al selector de material
  - Actualitza la variable `currentMaterialType`
  - Aplica el nou material a tots els elements Mesh del model
- **Gestor de canvi de color**:
  - Detecta canvis al selector de color
  - Converteix el valor hexadecimal a un color de Three.js
  - Recrea tots els materials amb el nou color
  - Aplica el material del tipus seleccionat al model

### Animació i Gestió de Redimensionament

```javascript
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
```

**Explicació:**
- **Funció d'animació**:
  - Utilitza `requestAnimationFrame` per crear un bucle d'animació suau
  - Actualitza els controls per a una resposta més fluida
  - Renderitza l'escena en cada fotograma
- **Gestió de redimensionament**:
  - Detecta canvis en la mida de la finestra
  - Actualitza la relació d'aspecte de la càmera
  - Actualitza la matriu de projecció
  - Redimensiona el renderitzador per adaptar-se al nou tamany

---

## Integració i Flux de Dades

Aquest projecte mostra un exemple excel·lent d'integració entre HTML, CSS i JavaScript per crear una aplicació web interactiva en 3D:

1. **Estructura (HTML)**:
   - Defineix els elements de la interfície d'usuari
   - Proporciona els controls per a la interacció
   - Reserva espai per al renderitzat 3D
   - Carrega les biblioteques i recursos necessaris

2. **Presentació (CSS)**:
   - Defineix l'aparença visual de tots els elements
   - Crea una disposició adequada per als diferents components
   - Assegura que l'aplicació sigui atractiva i fàcil d'usar

3. **Funcionalitat (JavaScript/Three.js)**:
   - Inicialitza l'entorn 3D
   - Carrega i mostra el model 3D
   - Gestiona la interacció de l'usuari
   - Actualitza el model en temps real segons les seleccions

### Flux de dades:

1. L'usuari interactua amb els controls (canvi de material o color)
2. Els controladors d'esdeveniments JavaScript capturen aquestes interaccions
3. S'actualitzen els materials del model 3D
4. El bucle d'animació renderitza els canvis en temps real
5. L'usuari veu instantàniament els efectes de les seves interaccions

Aquest projecte demostra conceptes importants en Three.js:
- Configuració bàsica (escena, càmera, renderitzador)
- Càrrega de models 3D
- Iluminació avançada
- Materials i propietats de superfície
- Interacció amb l'usuari
- Controls de càmera
- Animació i renderització en temps real

També mostra bones pràctiques de desenvolupament com:
- Separació de preocupacions (HTML/CSS/JS)
- Gestió d'errors (missatges d'error en cas de problemes de càrrega)
- Codi reutilitzable (funció de creació de materials)
- Gestió del cicle de vida (neteja i redimensionament)