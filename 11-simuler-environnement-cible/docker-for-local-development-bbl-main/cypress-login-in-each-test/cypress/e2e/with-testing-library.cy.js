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