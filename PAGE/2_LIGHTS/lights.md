# Exemple de Llums amb Three.js

Aquest exemple mostra com utilitzar diferents tipus de llums en Three.js i permet activar o desactivar cadascuna d'elles.

## Estructura del Codi

### `lights.html`
Aquest fitxer defineix l'estructura bàsica de la pàgina web:
- Inclou els scripts necessaris per carregar Three.js i els seus addons.
- Conté un contenidor `<div>` per al renderitzat de l'escena 3D.
- Proporciona controls per activar o desactivar les llums.

### `lights.js`
Aquest fitxer conté tota la lògica per inicialitzar i gestionar l'escena 3D:

1. **Configuració Inicial**:
   - Es crea una escena (`scene`), una càmera (`camera`) i un renderitzador (`renderer`).
   - Es defineix una esfera com a objecte bàsic per mostrar les llums.

2. **Llums**:
   - `AmbientLight`: Proporciona una il·luminació uniforme a tota l'escena.
   - `DirectionalLight`: Simula una font de llum com el sol.
   - `PointLight`: Simula una font de llum puntual com una bombeta.

3. **Controls de Navegació**:
   - S'afegeixen controls orbitals (`OrbitControls`) per permetre rotar, fer zoom i desplaçar la vista.

4. **Gestió de Llums**:
   - Es configuren esdeveniments per activar o desactivar cada tipus de llum mitjançant caselles de selecció.

5. **Animació**:
   - Es crea un bucle d'animació amb `requestAnimationFrame` per renderitzar contínuament l'escena i actualitzar els controls.

6. **Gestió de Redimensionament**:
   - Es configura un gestor d'esdeveniments per ajustar la mida del renderitzador i l'aspecte de la càmera quan es redimensiona la finestra del navegador.
