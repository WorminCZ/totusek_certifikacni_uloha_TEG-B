import { customElement } from "../helpers/custom_element";

export class EditProfileSection {
  constructor() {
    this.firstNameInput = customElement("[data-testid='chage-name-input']");
    this.lastNameInput = customElement("[data-testid='chage-surname-input']");
    this.emailInput = customElement("[data-testid='chage-email-input']");
    this.telephoneInput = customElement("[data-testid='chage-phone-input']");
    this.ageInput = customElement("[data-testid='chage-age-input']");
    this.saveForm = customElement('[data-testid="save-changes-button"]');
    this.exitButton = customElement(
      "[data-testid='toggle-edit-profile-button']"
    );
  }

  typeFirstName(firstName) {
    this.firstNameInput.get().clear().type(firstName);
    return this;
  }

  typeLastName(lastName) {
    this.lastNameInput.get().clear().type(lastName);
    return this;
  }

  typeEmail(email) {
    this.emailInput.get().clear().type(email);
    return this;
  }

  typeTelephone(telephone) {
    this.telephoneInput.get().clear().type(telephone);
    return this;
  }

  typeAge(age) {
    this.ageInput.get().clear().type(age);
    return this;
  }

  clickSave() {
    this.saveForm.get().click();
    const { DashboardPage } = require("./dashboard_page");
    return new DashboardPage();
  }
}
