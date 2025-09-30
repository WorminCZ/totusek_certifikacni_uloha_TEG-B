const { LoginPage } = require("../../../page-objects/login_page.js");
import { fakerCS_CZ as faker } from "@faker-js/faker";
import { UserApi } from "../../api/user_api.js";
import { AccountApi } from "../../api/account_api.js";

describe("Tegb Login Tests", () => {
  let accountNumber;
  let balance;

  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const email = faker.internet.exampleEmail({
    firstName: firstName,
    lastName: lastName,
  });
  const telephone = faker.phone.number();
  const age = faker.number.int({ min: 18, max: 80 });
  const username = faker.internet.username({
    firstName: firstName,
    lastName: lastName,
  });
  const password = faker.internet.password();

  it("User registration with api", () => {
    const initialBalance = 10000;
    const type = "standard";
    const user = new UserApi();
    const accounts = new AccountApi();
    user.register(username, password, email);
    user.login(username, password).as("login_response");
    cy.get("@login_response").then((login_response) => {
      const token = login_response.body.access_token;
      cy.setCookie("access_token", token);
      accounts.createAccount(token, initialBalance, type).as("account");
      cy.get("@account").then((accountResponse) => {
        accountNumber = accountResponse.body.accountNumber;
        balance = accountResponse.body.balance;
        cy.log(
          "Úspěšně založeno! Vznikl nám účet číslo " +
            accountNumber +
            " s počátečním zůstatkem " +
            balance
        );
        cy.log(
          "Jeho majitelem/majitelkou je " + firstName + " z rodu " + lastName
        );
        cy.intercept("GET", "/tegb/profile").as("getProfile");
        cy.intercept("GET", "/tegb/accounts").as("getAccounts");

        new LoginPage()
          .openTegb()
          .typeUsername(username)
          .typePassword(password)
          //clickLogin obsahuje API wait
          .clickLogin()
          //editace osobních údajů a uložení
          .clickProfileEditButton()
          .typeFirstName(firstName)
          .typeLastName(lastName)
          .typeEmail(email)
          .typeTelephone(telephone)
          .typeAge(age)
          .clickSave()
          //verifikace správného propsání a uložení osobních údajů
          .firstNameHasText(firstName)
          .lastNameHasText(lastName)
          .emailHasText(email)
          .telephonehasText(telephone)
          .ageHasText(age)
          //Verifikace hodnot v sekci Účty
          .accountNumberCheckValueVisibility(accountNumber)
          .accountBalanceCheckValueVisibility(balance)
          .accountTypeCheckValueVisibility(type)
          //Odhlášení se a kontrola
          .clickLogout()
          .loginPageCheck();
      });
    });
  });
});
