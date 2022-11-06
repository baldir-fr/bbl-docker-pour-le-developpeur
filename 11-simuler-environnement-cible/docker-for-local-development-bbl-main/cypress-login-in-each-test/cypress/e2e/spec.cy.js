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
        // cy.visit('/realms/acme/protocol/openid-connect/auth?client_id=vue-app&redirect_uri=http%3A%2F%2Flocalhost%3A5173%2Fcallback.html&response_type=code&scope=openid%20profile&state=fc38731d58534123b33b8c45f5443f57&code_challenge=7OqUcl6m289U7K6CAAjFgd-0cicNImFvfrwQof6H0qI&code_challenge_method=S256&response_mode=query')
        cy.get('#username').type(username)
        cy.get('#password').type(password)
        cy.get("#kc-login").click();
      }
    )

    cy.visit('http://kubernetes.docker.internal:5173')
  })

}