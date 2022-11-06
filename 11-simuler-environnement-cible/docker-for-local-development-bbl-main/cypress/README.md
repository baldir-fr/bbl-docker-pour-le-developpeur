# Cypress E2E Login in each test

```js
const {defineConfig} = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here

    },
    animationDistanceThreshold: 5,
    // arch: 'arm64',
    // baseUrl: null,
    // blockHosts: null,
    // browsers: [
    //   {
    //     name: 'firefox',
    //     family: 'firefox',
    //     channel: 'stable',
    //     displayName: 'Firefox',
    //     version: '106.0.1',
    //     path: '/Applications/Firefox.app/Contents/MacOS/firefox',
    //     minSupportedVersion: 86,
    //     majorVersion: '106',
    //   },
    //   {
    //     name: 'electron',
    //     channel: 'stable',
    //     family: 'chromium',
    //     displayName: 'Electron',
    //     version: '106.0.5249.51',
    //     path: '',
    //     majorVersion: 106,
    //   },
    // ],
    chromeWebSecurity: false,
    // clientCertificates: [],
    // defaultCommandTimeout: 4000,
    // downloadsFolder: 'cypress/downloads',
    // env: {},
    // excludeSpecPattern: '*.hot-update.js',
    // execTimeout: 60000,
    // experimentalFetchPolyfill: false,
    // experimentalInteractiveRunEvents: false,
    // experimentalModifyObstructiveThirdPartyCode: false,
    experimentalSessionAndOrigin: true,
    // experimentalSingleTabRunMode: false,
    // experimentalSourceRewriting: false,
    experimentalStudio: true,
    // experimentalWebKitSupport: false,
    // fileServerFolder: '',
    // fixturesFolder: 'cypress/fixtures',
    // hosts: null,
    // includeShadowDom: false,
    // isInteractive: true,
    // keystrokeDelay: 0,
    // modifyObstructiveCode: true,
    // nodeVersion: null,
    // numTestsKeptInMemory: 50,
    // pageLoadTimeout: 60000,
    // platform: 'darwin',
    // port: null,
    // projectId: null,
    // redirectionLimit: 20,
    // reporter: 'spec',
    // reporterOptions: null,
    // requestTimeout: 5000,
    // resolvedNodePath: null,
    // resolvedNodeVersion: null,
    // responseTimeout: 30000,
    // retries: {
    //   runMode: 0,
    //   openMode: 0,
    // },
    // screenshotOnRunFailure: true,
    // screenshotsFolder: 'cypress/screenshots',
    // scrollBehavior: 'top',
    // slowTestThreshold: 10000,
    // specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    // supportFile: 'cypress/support/e2e.{js,jsx,ts,tsx}',
    // supportFolder: false,
    // taskTimeout: 60000,
    // testIsolation: null,
    // trashAssetsBeforeRuns: true,
    // userAgent: null,
    video: false,
    // videoCompression: 32,
    // videosFolder: 'cypress/videos',
    // videoUploadOnPasses: true,
    // viewportHeight: 660,
    // viewportWidth: 1000,
    // waitForAnimations: true,
    // watchForFileChanges: true,

  },

});

```

