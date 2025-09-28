const { DashboardPage } = require("../../../page-objects/dashboard_page");
const { LoginPage } = require("../../../page-objects/login_page");
import testData from "../../fixtures/atomic_test_data.json";

describe(
  "Collection of Atomic tests for Teg-B Dashboard",
  { testIsolation: false },
  () => {
    const username = Cypress.env("tegb_username");
    const password = Cypress.env("tegb_password");
    let dashboard;

    before(() => {
      cy.clearAllCookies();
      cy.clearAllLocalStorage();
      cy.clearAllSessionStorage();
      dashboard = new DashboardPage();
      new LoginPage()
        .openTegb()
        .typeUsername(username)
        .typePassword(password)
        .clickLogin();
    });

    context("Header tests", () => {
      it("Logo is visible", () => {
        dashboard.logoIsVisible();
      });

      it("Header has text", () => {
        dashboard.headerHaveText(testData.dashboard.headerText);
      });

      it("Logout button exists", () => {
        dashboard.logOutButtonShouldExist();
      });

      it("Logout button has text", () => {
        dashboard.logOutButtonHasText(testData.dashboard.logoutButtonText);
      });
    });

    context("Left Menu Tests", () => {
      it("Left sidebar menu has texts", () => {
        testData.leftMenu.forEach((item) => {
          dashboard.leftSidebarHasTexts(item);
        });
      });

      it.skip("Left sidebar menu buttons clickability - not yet functional, skipping for now", () => {
        //Placeholder text
      });
    });

    context("Dashboard Content Tests - other", () => {
      it("Edit Profile Button Exists", () => {
        dashboard.editProfileButtonExists();
      });

      it("Edit profile Button has text", () => {
        dashboard.editProfileButtonShouldHaveText("Upravit profil");
      });

      it("Edit profile Button is clickable", () => {
        dashboard.editProfileButtonisClickable();
      });
    });

    context("User Details Tests", () => {
      it("Profile details header is visible", () => {
        dashboard.profileDetailsHeaderIsVisible(
          testData.dashboard.profileDetailsHeader
        );
      });
      it("Profile details header has text", () => {
        dashboard.profileDetailsHeaderHasText(
          testData.dashboard.profileDetailsHeader
        );
      });
      it("First name validity", () => {
        dashboard.firstNameHasText(testData.dashboard.firstName);
      });
      it("Last name validity", () => {
        dashboard.lastNameHasText(testData.dashboard.lastName);
      });
      it("Email validity", () => {
        dashboard.emailHasText(testData.dashboard.email);
      });
      it("Telephone validity", () => {
        dashboard.telephonehasText(testData.dashboard.telephone);
      });
      it("Age validity", () => {
        dashboard.ageHasText(testData.dashboard.age);
      });
    });

    context("User Account Tests", () => {
      it("Account Header is visible", () => {
        dashboard.accountsHeaderHeaderisVisible(testData.account.accountHeader);
      });

      it("Account Header has text", () => {
        dashboard.accountsHeaderHasText(testData.account.accountHeader);
      });

      it.skip("Add Account button exists and is clickable - not yet functional, skipping for now", () => {
        //Placeholder text
      });

      it("Account Number Heading has text", () => {
        dashboard.accountNumberHeadingHasText(
          testData.account.accountNumberHeading
        );
      });

      it("Account Balance Heading has text", () => {
        dashboard.accountBalanceHeadingHasText(
          testData.account.accountBalanceHeading
        );
      });

      it("Account Type Heading has text", () => {
        dashboard.accountTypeHeadingHasText(
          testData.account.accountTypeHeading
        );
      });

      it("Account Number Checks", () => {
        dashboard.accountNumberCheckValueVisibility(
          testData.account.accountNumber
        );
      });

      it("Account Balance Checks", () => {
        dashboard.accountBalanceCheckValueVisibility(
          testData.account.expectedBalance
        );
      });

      it("Account type Checks", () => {
        dashboard.accountTypeCheckValueVisibility(testData.account.type);
      });
    });
  }
);
