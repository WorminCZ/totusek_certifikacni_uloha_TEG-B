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

  logOutButtonExistsAndHasText(expectedText) {
    cy.xpath(this.logoutButtonXpath)
      .should("exist")
      .and("be.visible")
      .invoke("text")
      .then((actualText) => {
        expect(actualText.trim()).to.eq(expectedText);
      });
    return this;
  }
}
