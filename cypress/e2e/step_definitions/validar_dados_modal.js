import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

When("submeto o formulário", () => {
  cy.get("form#userForm").within(() => {
    cy.get("#submit").click({ force: true });
  });
});

Then("devo visualizar o modal de confirmação", () => {
  cy.get(".modal-content").should("be.visible");
});

Then("os dados exibidos devem corresponder aos dados informados", () => {
  cy.fixture("formData").then((data) => {
    cy.validateModal(data);
  });
});