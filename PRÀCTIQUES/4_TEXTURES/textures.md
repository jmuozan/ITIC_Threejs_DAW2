# Visualitzador de Textures

Aquest projecte utilitza Three.js per carregar i visualitzar un model 3D en format OBJ amb la seva textura corresponent.

## Com funciona

1. **HTML (`texture_viewer.html`)**:
   - Configura l'entorn bàsic per carregar els scripts necessaris de Three.js, OBJLoader i MTLLoader.
   - Inclou el fitxer `texture_viewer.js` per inicialitzar l'escena.

2. **JavaScript (`texture_viewer.js`)**:
   - Configura l'escena, càmera i renderer.
   - Afegeix llums ambientals i puntuals per il·luminar l'objecte.
   - Utilitza `MTLLoader` per carregar el fitxer `.mtl` i `OBJLoader` per carregar el fitxer `.obj`.
   - Centra la càmera automàticament en l'objecte carregat.

## Requisits

- Col·loca els fitxers `.obj`, `.mtl` i la textura `.jpg` a la carpeta `OBJ`.
- Obre `texture_viewer.html` en un navegador per veure el model.

## Dependències

- [Three.js](https://threejs.org/)
- [OBJLoader](https://threejs.org/docs/#examples/en/loaders/OBJLoader)
- [MTLLoader](https://threejs.org/docs/#examples/en/loaders/MTLLoader)
