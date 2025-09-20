import { customElement } from "../helpers/custom_element";
import { Header } from "./common/header_section";
import { DashboardPage } from "./dashboard_page";

export class LoginPage extends Header {
  constructor() {
    super();
    this.url = "https://tegb-frontend-88542200c6db.herokuapp.com/";
    this.usernameInput = customElement('[data-testid="username-input"]');
    this.passwordInput = customElement('[data-testid="password-input"]');
    this.loginButton = customElement('[data-testid="submit-button"]');
    this.nameTitle = customElement("h1.title");
    cy.intercept("/tegb/profile").as("login_api");
    cy.intercept("/tegb/accounts").as("accounts_api");
    //cy.intercept("/auth/login").as("login_api");
  }

  openTegb() {
    cy.visit(this.url);
    return this;
  }

  typeUsername(username) {
    this.usernameInput.type(username);
    return this;
  }

  typePassword(password) {
    this.passwordInput.type(password);
    return this;
  }

  clickLogin() {
    this.loginButton.click();
    cy.wait("@login_api");
    cy.wait("@accounts_api");
    return new DashboardPage();
  }

  login(username, password) {
    this.typeUsername(username);
    this.typePassword(password);
    this.clickLogin();
    return this.clickLogin();
  }

  loginPageCheck() {
    this.nameTitle.isVisible().containsText("TEG#B");
    return this;
  }
}
