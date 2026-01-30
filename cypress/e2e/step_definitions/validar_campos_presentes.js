import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("que estou na página do formulário", () => {
  cy.visit("/automation-practice-form");
});

Given("preencho todos os campos obrigatórios corretamente", () => {
  cy.fixture("formData").then((data) => {
    cy.fillForm(data);
  });
});

Then("devo visualizar o campo {string}", (campo) => {
  const selectors = {
    "First Name": "#firstName",
    "Last Name": "#lastName",
    "Email": "#userEmail",
    "Gender": 'input[name="gender"]',
    "Mobile": "#userNumber",
    "Date of Birth": "#dateOfBirthInput",
    "Subjects": "#subjectsInput",
    "Hobbies": "#hobbiesWrapper",
    "Address": "#currentAddress",
    "State": "#state",
    "City": "#city",
    "Submit": "#submit"
  };

  if (campo === "Gender") {
    // Deve haver pelo menos 3 radios (Male, Female, Other)
    cy.get(selectors[campo]).should("have.length.at.least", 3);
  } else if (campo === "Hobbies") {
    // Deve haver pelo menos 3 checkboxes (Sports, Reading, Music)
    cy.get("#hobbiesWrapper input[type=checkbox]").should("have.length.at.least", 3);
  } else {
    // Para os demais campos: presença + visibilidade
    cy.get(selectors[campo]).should("exist").and("be.visible");
  }
});
