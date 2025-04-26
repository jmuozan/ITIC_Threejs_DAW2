# PRÀCTIQUES/4_TEXTURES

## Explicació dels scripts i funcionalitat

Aquest projecte mostra com carregar i visualitzar un model 3D (Air Jordan) amb textures utilitzant Three.js. El codi està separat en tres arxius principals:

---

### 1. `viewer.html`

- Defineix l'estructura bàsica de la pàgina.
- Inclou dos divs: un per mostrar l'estat de càrrega (`#loading`) i un altre amb instruccions d'ús (`#info`).
- Carrega l'estil des de `viewer.css` i el codi JavaScript des de `viewer.js`.
- Utilitza un importmap per carregar Three.js i els seus addons des d'UNPKG.

---

### 2. `viewer.css`

- Dona estil a la pàgina:
    - Elimina marges i fa que el fons sigui clar.
    - Centra el missatge de càrrega a la pantalla.
    - Dona estil a la caixa d'informació a la cantonada inferior esquerra.

---

### 3. `viewer.js`

- **Configuració de l'escena:**
    - Crea una escena Three.js amb un color de fons suau.
    - Configura la càmera i el renderitzador, i afegeix el canvas al body.
    - Afegeix tres llums: ambiental i dues direccionals per il·luminar el model.
    - Configura OrbitControls per permetre rotar, fer zoom i moure la càmera amb el ratolí.

- **Càrrega del model:**
    - Utilitza `MTLLoader` per carregar els materials (`air jordan.mtl`).
    - Si la càrrega té èxit, utilitza `OBJLoader` per carregar el model (`air jordan.obj`) i li aplica els materials.
    - Centra el model a l'escena i ajusta la càmera segons la mida del model.
    - Recorre cada mesh del model i li aplica un material estàndard (`MeshStandardMaterial`) i carrega les textures (BaseColor, Normal, Roughness, Metallic).
    - Si falla la càrrega dels materials, intenta carregar el model sense materials i aplica una textura bàsica.

- **Gestió d'errors i estat de càrrega:**
    - Mostra el progrés de càrrega i missatges d'error a l'usuari.

- **Animació i redimensionament:**
    - Implementa un bucle d'animació que actualitza els controls i renderitza l'escena contínuament.
    - Ajusta la mida del renderitzador i la càmera quan la finestra canvia de mida.
