export class Header {
  constructor() {
    this.logo = '[data-testid="logo-img"]';
    this.appTitle = ".app-title";
    //this.logoutButton = "button.logout-link";
    this.logoutButtonXpath = "(//button[normalize-space()='Odhlásit se'])[1]";
  }

  logoIsVisible() {
    cy.get(this.logo).should("be.visible");
    return this;
  }

  headerHaveText(text) {
    cy.get(this.appTitle).should("have.text", text);
    return this;
  }

  logOutButtonHasText(text) {
    cy.xpath(this.logoutButtonXpath)
      .should("contain.text", text);
    return this;
  }

  logOutButtonShouldExist() {
    cy.xpath(this.logoutButtonXpath)
      .should("exist")
      .and("be.visible");
    return this;
  }
}
