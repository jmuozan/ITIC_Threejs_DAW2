# PRÀCTIQUES/5_HDRI

### 1. `hdri.html`
- Defineix l'estructura bàsica de la pàgina.
- Carrega els mòduls de Three.js i el fitxer JavaScript principal (`hdri.js`).
- Aplica un estil senzill per eliminar marges i posar un fons fosc.

---

### 2. `hdri.js`
- **Escena i càmera:**
    - Crea una escena Three.js i una càmera de perspectiva.
- **Renderer:**
    - Inicialitza el renderitzador i l'afegeix al body.
- **Controls:**
    - Afegeix controls orbitals per moure la càmera amb el ratolí.
- **Càrrega HDRI:**
    - Utilitza `EXRLoader` per carregar la imatge HDRI `ballawley_park_2k.exr`.
    - Assigna la HDRI com a entorn (`scene.environment`) i fons (`scene.background`) per aconseguir reflexos realistes.
- **Cilindre:**
    - Crea un cilindre blanc amb material metàl·lic i rugositat baixa per aprofitar els reflexos de l'entorn.
- **Llum ambiental:**
    - Afegeix una llum ambiental suau per millorar la il·luminació general.
- **Redimensionament:**
    - Ajusta la càmera i el renderitzador quan la finestra canvia de mida.
- **Animació:**
    - Implementa un bucle d'animació per renderitzar l'escena contínuament i actualitzar els controls.

---

Aquesta pràctica serveix per entendre com utilitzar HDRI en escenes 3D per aconseguir il·luminació i reflexos realistes.
