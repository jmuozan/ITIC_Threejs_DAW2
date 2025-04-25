# Exemple d'Importació amb Three.js

Aquest exemple mostra com utilitzar Three.js per importar i visualitzar models 3D en format `.obj`.

## Estructura del Codi

### `import.html`
Aquest fitxer defineix l'estructura bàsica de la pàgina web:
- Inclou els scripts necessaris per carregar Three.js i els seus addons.
- Conté un element `<input>` per seleccionar fitxers `.obj`.
- Configura un contenidor `<div>` per al renderitzat de l'escena 3D.

### `import.js`
Aquest fitxer conté tota la lògica per inicialitzar i gestionar l'escena 3D:

1. **Importacions**:
   - `THREE`: Biblioteca principal de Three.js.
   - `OBJLoader`: Per carregar models 3D en format `.obj`.
   - `OrbitControls`: Per permetre la navegació interactiva amb la càmera.

2. **Configuració Inicial**:
   - Es crea una escena (`scene`), una càmera (`camera`) i un renderitzador (`renderer`).
   - Es defineixen llums bàsics: una llum ambiental i una llum direccional.

3. **Gestió de Fitxers**:
   - Es configura un gestor d'esdeveniments per al `<input>` de fitxers.
   - Quan es selecciona un fitxer `.obj`, es llegeix el contingut i es carrega a l'escena utilitzant `OBJLoader`.

4. **Centrar el Model**:
   - Es calcula la caixa delimitadora (`BoundingBox`) del model per centrar-lo a l'escena.
   - Es posiciona la càmera per mirar directament al model.

5. **Controls de Navegació**:
   - S'afegeixen controls orbitals (`OrbitControls`) per permetre rotar, fer zoom i desplaçar la vista.

6. **Animació**:
   - Es crea un bucle d'animació amb `requestAnimationFrame` per renderitzar contínuament l'escena i actualitzar els controls.

7. **Gestió de Redimensionament**:
   - Es configura un gestor d'esdeveniments per ajustar la mida del renderitzador i l'aspecte de la càmera quan es redimensiona la finestra del navegador.

