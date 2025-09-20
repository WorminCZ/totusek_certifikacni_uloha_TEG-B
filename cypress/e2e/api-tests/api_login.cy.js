const { LoginPage } = require("../../../page-objects/login_page");
const { UserApi } = require("../../api/user_api");

describe("Login API test", () => {
  beforeEach(() => {
    new LoginPage().openTegb();
  });

  it("check whether response and token are ok", () => {
    //Checkuju login, response i acces token
    const username = Cypress.env("tegb_username");
    const password = Cypress.env("tegb_password");
    const user = new UserApi();

    user.login(username, password).as("response_login");

    cy.get("@response_login").then((response) => {
      let accessToken;
      accessToken = response.body.access_token;
      expect(accessToken).to.not.be.empty;
      expect(response.status).to.eq(201);
    });
  });
});
