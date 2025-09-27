const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {},
    env: {
      // ? Alternativa k cypress.env.json
      teg_b: "https://tegb-frontend-88542200c6db.herokuapp.com/",
      teg_b_api: "https://tegb-backend-877a0b063d29.herokuapp.com/",
    },
    watchForFileChanges: false,
    defaultCommandTimeout: 10000,
  },
});
