export const customElement = (selector) => {
  const element = {
    isVisible() {
      cy.get(selector).should("be.visible");
      return this;
    },
    isNotVisible() {
      cy.get(selector).should("not.be.visible");
      return this;
    },
    haveText(text) {
      cy.get(selector).should("have.text", text);
      return this;
    },
    containsText(text) {
      cy.get(selector).should("contain.text", text);
      return this;
    },
    haveValue(value) {
      cy.get(selector).should("have.value", value);
      return this;
    },
    havePlaceholder(placeholder) {
      cy.get(selector).should("have.attr", "placeholder", placeholder);
      return this;
    },
    haveAttribute(attribute, value) {
      cy.get(selector).should("have.attr", attribute, value);
      return this;
    },
    click() {
      cy.get(selector).click();
      return this;
    },
    type(value) {
      cy.get(selector).type(value);
      return this;
    },
    clear() {
      cy.get(selector).clear();
      return this;
    },
    get() {
      return cy.get(selector);
    },
  };
  return element;
};
