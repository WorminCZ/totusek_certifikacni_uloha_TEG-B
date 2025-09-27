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

    context("Set tests for header", () => {
      it("Logo is visible", () => {
        dashboard.logoIsVisible();
      });

      it("Header have text", () => {
        dashboard.headerHaveText(testData.dashboard.headerText);
      });

      it("Logout button exists and has text", () => {
        dashboard.logOutButtonExistsAndHasText(
          testData.dashboard.logoutButtonText
        );
      });
    });

    context("Left Menu Tests", () => {
      //Levé menu zatím není funkční?
      it("Left sidebar menu has texts", () => {
        testData.leftMenu.forEach((item) => {
          dashboard.leftSidebarHasTexts(item);
        });
      });

      context("Dashboard Content Texts - other", () => {
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

      context("User Tests", () => {
        it("Profile details header exists and has text", () => {
          dashboard.profileDetailsHeaderHasTextisVisible(
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

      context("Account tests", () => {
        it("Account Header is visible and has text", () => {
          dashboard.accountsHeaderHasTextisVisible(
            testData.account.accountHeader
          );
        });

        it.skip("Add Account button exists and is clickable - not yet functional, skipping for now", () => {
          //Placeholder text
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
    });
  }
);
