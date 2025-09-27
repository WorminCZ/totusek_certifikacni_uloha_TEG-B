import { customElement } from "../helpers/custom_element";
import { Header } from "./common/header_section";
import { ProfileEdit } from "./edit_profile_page";

export class DashboardPage extends Header {
  constructor() {
    super();
    //this.leftSidebarMenu = customElement(".dashboard-sidebar");
    this.leftSidebarMenuXpath = "(//aside[@class='dashboard-sidebar'])[1]";
    this.editProfileButton = '[data-testid="toggle-edit-profile-button"]';
    this.firstNameField = customElement('[data-testid="name"]');
    this.lastNameField = customElement("[data-testid='surname']");
    this.emailField = customElement("[data-testid='email']");
    this.telephoneField = customElement("[data-testid='phone']");
    this.ageField = customElement("[data-testid='age']");
    this.accountNumber = customElement('[data-testid="account-number"]');
    this.accountBalance = customElement('[data-testid="account-balance"]');
    this.accountType = customElement('[data-testid="account-type"]');
    this.logoutButtonXpath = "(//button[normalize-space()='Odhlásit se'])[1]";
    //this.logoutButton = customElement("button.logout-link");
    this.profileDetailsHeaderXpath =
      "(//h2[normalize-space()='Detaily Profilu'])[1]";
    this.AccountsHeaderXpath = "(//h2[contains(text(),'Účty')])[1]";
  }

  leftSidebarHasTexts(text) {
    cy.xpath(this.leftSidebarMenuXpath).should("contain.text", text);
    return this;
  }

  editProfileButtonExists() {
    cy.get(this.editProfileButton).should("exist");
    return this;
  }

  profileDetailsHeaderHasTextisVisible(text) {
    cy.xpath(this.profileDetailsHeaderXpath)
      .should("be.visible")
      .and("contain.text", text);
    return this;
  }

  editProfileButtonShouldHaveText(text) {
    cy.get(this.editProfileButton).should("have.text", text);
    return this;
  }

  editProfileButtonisClickable() {
    cy.get(this.editProfileButton).click();
    cy.get("[data-testid='profile-details-title']").should(
      "contain.text",
      "Detaily Profilu"
    );
    cy.get(this.editProfileButton).click();
    return this;
  }

  clickProfileEditButton() {
    cy.get(this.editProfileButton).click();
    return new ProfileEdit();
  }

  firstNameHasText(name) {
    this.firstNameField.get().should("contain.text", name);
    return this;
  }

  lastNameHasText(surname) {
    this.lastNameField.get().should("contain.text", surname);
    return this;
  }

  emailHasText(email) {
    this.emailField.get().should("contain.text", email);
    return this;
  }

  telephonehasText(telephone) {
    this.telephoneField.get().should("contain.text", telephone);
    return this;
  }

  ageHasText(age) {
    this.ageField.get().should("contain.text", age);
    return this;
  }

  accountsHeaderHasTextisVisible(text) {
    cy.xpath(this.AccountsHeaderXpath)
      .should("be.visible")
      .and("contain.text", text);
    return this;
  }

  accountNumberCheckValueVisibility(text) {
    this.accountNumber.get().should("contain", text).and("be.visible");
    return this;
  }

  accountBalanceCheckValueVisibility(balance) {
    this.accountBalance
      .get()
      .invoke("text")
      .then((text) => {
        const numericValue = parseFloat(text.replace(/[^\d.-]/g, ""));
        expect(numericValue).to.eq(balance);
      });
    this.accountBalance.get().should("be.visible");
    return this;
  }

  accountTypeCheckValueVisibility(text) {
    this.accountType.get().first().should("have.text", text).and("be.visible");
    return this;
  }

  clickLogout() {
    cy.xpath(this.logoutButtonXpath).click();
    const { LoginPage } = require("./login_page");
    return new LoginPage();
  }
}
