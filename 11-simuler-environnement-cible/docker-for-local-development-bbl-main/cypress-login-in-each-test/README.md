# Learning Hour

---

## Cypress & Auth

---


---

## Connect

---

## Concept

--

### Run tests

<video controls src="assets/cypress-run-tests-with-login-in-each.mp4"/>
--

### Open Cypress

<video controls src="assets/cypress-open-tests-login-each-time.mp4"/>

---

### `cy.origin`

https://docs.cypress.io/api/commands/origin

```js
const sentArgs = {username, password}

// Page du frontend (5173) qui redirige vers la mire de login keycloak
cy.visit('http://kubernetes.docker.internal:5173')  

// On se positionne dans le contexte keycloak (8080)
cy.origin('http://kubernetes.docker.internal:8080',  
  // Send the args here...  
  {args: sentArgs},  
  // ...and receive them at the other end here!  
  ({username, password}) => {
    // Login de l'utilsateur dans la mire de login de keycloak
    cy.get('#username').type(username)  
    cy.get('#password').type(password)  
    cy.get("#kc-login").click();  
  }  
)  
// Une fois sorti du contexte de keycloak, il ne faut pas oublier de visiter à nouveau le frontend pour rétablir l'origine
cy.visit('http://kubernetes.docker.internal:5173')
```

--

### `cy.origin` — Configuration

```js
const {defineConfig} = require("cypress");  
  
module.exports = defineConfig({  
  e2e: {  
    experimentalSessionAndOrigin: true
  }
});
```

--

### `cy.session`

https://docs.cypress.io/api/commands/session

```js
// Mise en cache de la session  
cy.session("id-du-cache", () => {  
  cy.login({username, password});  
  // les cookies, localstorage, sessionStorage sont mis en cache
});

// ...

// Restauration du cache
cy.session("id-du-cache");

```

--

### `cy.session` — configuration


```js
const {defineConfig} = require("cypress");  
  
module.exports = defineConfig({  
  e2e: {  
    experimentalSessionAndOrigin: true
  }
});
```

--

### `before`

https://docs.cypress.io/guides/core-concepts/writing-and-organizing-tests#Hooks

```js
describe('Demo with keycloak', () => {  
  
  before(() => {  
    const username = "user";  
    const password = "user";  
  
    // Mise en cache de la session  
    cy.session(username, () => {  
      cy.login({username, password});  
    });  
  });
  // ...
});
```

--

### `beforeEach`

```js
// https://docs.cypress.io/guides/core-concepts/writing-and-organizing-tests#Hooks  
describe('Demo with keycloak', () => {  
  
  // before(() => {  ... })
  
  beforeEach(() => {  
    // restauration de la sessiop avant chaque test  
    cy.session("user")  
  });
  
  // ... tests
});
```

--

### Custom commands

https://docs.cypress.io/api/cypress-api/custom-commands

`cypress/support/command.js`

```js
function loginAs({username, password}) {  
  const sentArgs = {username, password}  
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
}
Cypress.Commands.add("login", (username, password) => {  
  loginAs(username, password);  
});
```

--

### ex — `cy.login`


```js
describe('Demo with keycloak', () => {  
  
  before(() => {  
    const username = "user";  
    const password = "user";  
  
    // Mise en cache de la session  
    cy.session(username, () => {  
      cy.login({username, password});  
    });  
  })  
  
  beforeEach(() => {  
    // restauration de la sessiop avant chaque test  
    cy.session("user")  
  })  
  
  it('Fetches protected data from backend', () => {  
    cy.visit('http://kubernetes.docker.internal:5173')  
    cy.contains("Fetch protected Data").click();  
    cy.contains("you got my private data!");  
  
  })  
  it('Navigates to Learning Hours from navigation', () => {  
    cy.visit('http://kubernetes.docker.internal:5173')  
    cy.contains("Learning hour").click();  
    cy.contains("AAAA");  
  })  
  
})
```

---

## Concrete

---

## Conclude

