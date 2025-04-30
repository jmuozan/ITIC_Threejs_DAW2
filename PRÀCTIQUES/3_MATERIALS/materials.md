# Exemple de Materials amb Three.js

Aquest exemple mostra com utilitzar diferents materials en Three.js i permet canviar entre ells en temps real.

## Estructura del Codi

### `materials.html`
Aquest fitxer defineix l'estructura bàsica de la pàgina web:
- Inclou els scripts necessaris per carregar Three.js i els seus addons.
- Conté un contenidor `<div>` per al renderitzat de l'escena 3D.
- Proporciona controls per seleccionar el material del torus.

### `materials.js`
Aquest fitxer conté tota la lògica per inicialitzar i gestionar l'escena 3D:

1. **Configuració Inicial**:
   - Es crea una escena (`scene`), una càmera (`camera`) i un renderitzador (`renderer`).
   - Es defineix un torus com a objecte bàsic per mostrar els materials.
   - Es configura un fons de color rosa per a l'escena.

2. **Llums**:
   - `AmbientLight`: Proporciona una il·luminació uniforme a tota l'escena.
   - Diverses `DirectionalLight` es col·loquen en diferents posicions per il·luminar el torus des de múltiples angles.
   - Llums addicionals s'afegeixen per millorar la visibilitat dels materials.

3. **Controls de Navegació**:
   - S'afegeixen controls orbitals (`OrbitControls`) per permetre rotar, fer zoom i desplaçar la vista.

4. **Canvi de Materials**:
   - Es configuren tres tipus de materials:
     - **Metàl·lic**: Amb alta reflectivitat i baixa rugositat.
     - **Plàstic**: Amb colors vius i rugositat mitjana.
     - **Vidre**: Amb transparència i efecte de transmissió de llum.
   - Es gestionen esdeveniments per canviar el material seleccionat en temps real mitjançant radio buttons.

5. **Estils Tipogràfics**:
   - Es defineixen estils CSS dinàmics per aplicar les tipografies utilitzades a `index.html` als controls.

6. **Animació**:
   - Es crea un bucle d'animació amb `requestAnimationFrame` per renderitzar contínuament l'escena i actualitzar els controls.

7. **Gestió de Redimensionament**:
   - Es configura un gestor d'esdeveniments per ajustar la mida del renderitzador i l'aspecte de la càmera quan es redimensiona la finestra del navegador.
