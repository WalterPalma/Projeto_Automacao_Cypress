import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Then('devo visualizar a mensagem "Thanks for submitting the form"', () => {
  cy.get(".modal-content").should("contain.text", "Thanks for submitting the form");
});