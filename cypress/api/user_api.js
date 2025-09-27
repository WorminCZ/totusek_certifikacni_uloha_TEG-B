export class UserApi {
  register(username, password, email) {
    return cy.request({
      method: "POST",
      url: Cypress.env("tegb_api_url") + "tegb/register",
      body: {
        username: username,
        password: password,
        email: email,
      },
    });
  }

  login(username, password) {
    return cy.request({
      method: "POST",
      url: Cypress.env("tegb_api_url") + "tegb/login",
      body: {
        username: username,
        password: password,
      },
    });
  }
}
