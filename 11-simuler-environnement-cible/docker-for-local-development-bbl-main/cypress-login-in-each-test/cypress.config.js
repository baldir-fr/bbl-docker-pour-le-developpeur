const {defineConfig} = require("cypress");

module.exports = defineConfig({
  e2e: {
    experimentalSessionAndOrigin: true,
    experimentalStudio: true,
    video: false,
  },
});
