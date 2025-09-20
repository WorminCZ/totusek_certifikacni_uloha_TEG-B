export class AccountApi {
  createAccount(token, startBalance, type) {
    return cy.request({
      method: "POST",
      url: Cypress.env("tegb_api_url") + "tegb/accounts/create",
      headers: {
        authorization: "Bearer " + token,
      },
      body: {
        startBalance: startBalance,
        type: type,
      },
    });
  }
}
