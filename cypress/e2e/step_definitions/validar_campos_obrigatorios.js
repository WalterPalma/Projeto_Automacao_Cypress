import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

When("tento submeter o formulário sem preencher os campos obrigatórios", () => {
  cy.get("#submit").click({ force: true });
});

Then("devo visualizar uma mensagem de erro para {string}", (campo) => {
  const selectors = {
    "First Name": "#firstName",
    "Last Name": "#lastName",
    "Mobile": "#userNumber",
    "Gender": 'input[name="gender"]'
  };

  if (selectors[campo]) {
    cy.get(selectors[campo]).then(($el) => {
      expect($el[0].checkValidity()).to.be.false;
    });
  }
});