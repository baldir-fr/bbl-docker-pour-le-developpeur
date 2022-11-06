# Cypress E2E Login in each test

```js
const {defineConfig} = require("cypress");

module.exports = defineConfig({
  e2e: {
    experimentalSessionAndOrigin: true, // Permet de changer d'origine de et conserver des cookies entre plusieurs tests
    experimentalStudio: true, // Permet de modifier les test depuis l'interface de Cypress
    video: false, // Désactive les vidéos (actif par défaut)
  },
});
```

