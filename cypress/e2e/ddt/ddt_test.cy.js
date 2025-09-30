import accountRemain from "../../fixtures/account_remain.json";
import { LoginPage } from "../../../page-objects/login_page";
import { fakerCS_CZ as faker } from "@faker-js/faker";
import { AccountApi } from "../../api/account_api";
import { UserApi } from "../../api/user_api";

describe("DDT - test account balance", () => {
  beforeEach(() => {
    new LoginPage().openTegb();
  });

  accountRemain.forEach((ListValue) => {
    it(`Should correctly display account balance after adding ${ListValue.balance} Kč`, () => {
      let accountNumber;
      let balance;
      const firstName = faker.person.firstName();
      const lastName = faker.person.lastName();
      const email = faker.internet.exampleEmail({ firstName, lastName });
      const username = faker.internet.username({ firstName, lastName });
      const password = faker.internet.password();
      const value = ListValue.balance;
      const type = "VIP Client";
      const user = new UserApi();
      const accounts = new AccountApi();

      user.register(username, password, email);
      user.login(username, password).as("login_response");
      cy.get("@login_response").then((login_response) => {
        const token = login_response.body.access_token;
        cy.setCookie("access_token", token);

        accounts.createAccount(token, value, type).as("account");
        cy.get("@account").then((accountResponse) => {
          accountNumber = accountResponse.body.accountNumber;
          balance = accountResponse.body.balance;
          cy.log(accountNumber);
          cy.log(balance);

          cy.intercept("GET", "/tegb/profile").as("getProfile");
          cy.intercept("GET", "/tegb/accounts").as("getAccounts");

          new LoginPage()
            .typeUsername(username)
            .typePassword(password)
            //API waity jsou clickLogin()
            .clickLogin()
            .accountBalanceCheckValueVisibility(balance);
        });
      });
    });
  });
});
