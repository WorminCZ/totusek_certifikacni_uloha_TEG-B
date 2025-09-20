const { LoginPage } = require("../../../page-objects/login_page.js");
import { fakerCS_CZ as faker } from "@faker-js/faker";
import { UserApi } from "../../api/user_api.js";
import { AccountApi } from "../../api/account_api.js";

describe("Tegb Login Tests", () => {
  let firstName;
  let lastName;
  let email;
  let telephone;
  let age;
  let username;
  let password;
  let accountNumber;
  let balance;

  firstName = faker.person.firstName();
  lastName = faker.person.lastName();
  email = faker.internet.exampleEmail({
    firstName: firstName,
    lastName: lastName,
  });
  telephone = faker.phone.number();
  age = faker.number.int({ min: 18, max: 80 });
  username = faker.internet.username({
    firstName: firstName,
    lastName: lastName,
  });
  password = faker.internet.password();

  before(() => {
    new LoginPage().openTegb();
  });

  //Registračka s API
  it("User registration with api", () => {
    const initialBalance = 10000;
    const type = "standard";
    const user = new UserApi();
    const accounts = new AccountApi();
    user.register(username, password, email);
    user.login(username, password).as("login_response");
    cy.get("@login_response").then((response) => {
      const token = response.body.access_token;
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
      });
    });
  });

  //Kontrola loginu nově založeného uživatele (s čekáním na API)
  it("Login in with the new user", () => {
    cy.intercept("GET", "/tegb/profile").as("getProfile");
    cy.intercept("GET", "/tegb/accounts").as("getAccounts");

    new LoginPage()
      .openTegb()
      .typeUsername(username)
      .typePassword(password)
      .clickLogin();

    cy.wait("@getProfile");
    cy.wait("@getAccounts");
  });

  //Kontrola editace profilu nově založeného uživatele
  it("Fill in the profile", () => {
    new LoginPage()
      .openTegb()
      .typeUsername(username)
      .typePassword(password)
      .clickLogin()
      .clickProfileEditButton()
      .typeFirstName(firstName)
      .typeLastName(lastName)
      .typeEmail(email)
      .typeTelephone(telephone)
      .typeAge(age)
      .clickSave();
  });

  //Kontrola propsání dat při editaci uživatele
  it("Check filled in profile data", () => {
    new LoginPage()
      .openTegb()
      .typeUsername(username)
      .typePassword(password)
      .clickLogin()
      .firstNameHasText(firstName)
      .lastNameHasText(lastName)
      .emailHasText(email)
      .telephonehasText(telephone)
      .ageHasText(age);
  });

  //Zkontrouji, že se uživateli správně propsala data
  it("Check filled in account data", () => {
    new LoginPage()
      .openTegb()
      .typeUsername(username)
      .typePassword(password)
      .clickLogin()
      .accountNumberCheckValueVisibility(accountNumber)
      .accountBalanceCheckValueVisibility(balance)
      .accountTypeCheckValueVisibility();
  });

  //Login a následný logout s kontrolou návratu na login page
  it("Login to logout", () => {
    new LoginPage()
      .openTegb()
      .typeUsername(username)
      .typePassword(password)
      .clickLogin()
      .clickLogout()
      .loginPageCheck();
  });
});
