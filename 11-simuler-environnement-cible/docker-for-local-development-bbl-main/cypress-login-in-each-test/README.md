# Learning Hour - Cypress OAuth

---

## Cypress E2E Login in each test

--

## Configuration

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

--

## Tests

```js
describe('Demo with keycloak', () => {

  it('Fetches protected data from backend', () => {
    loginAs({username: "user", password: "user"});
    cy.visit('http://kubernetes.docker.internal:5173')
    cy.contains("Fetch protected Data").click();
    cy.contains("you got my private data!");

  })
  it('Navigates to Learning Hours from navigation', () => {
    loginAs({username: "user", password: "user"});
    cy.visit('http://kubernetes.docker.internal:5173')
    cy.contains("Learning hour").click();
    cy.contains("AAAA");
  })

})

function loginAs({username, password}) {
  const sentArgs = {username, password}

  cy.session(username, () => {
    cy.visit('http://kubernetes.docker.internal:5173')
    cy.origin('http://kubernetes.docker.internal:8080',
      // Send the args here...
      {args: sentArgs},
      // ...and receive them at the other end here!
      ({username, password}) => {
        cy.get('#username').type(username)
        cy.get('#password').type(password)
        cy.get("#kc-login").click();
      }
    )
    cy.visit('http://kubernetes.docker.internal:5173')
  })
}
```

--

## Run tests

<video controls src="assets/cypress-run-tests-with-login-in-each.mp4"/>
--

## Open Cypress

<video controls src="assets/cypress-open-tests-login-each-time.mp4"/>

--
