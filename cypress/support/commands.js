Cypress.Commands.add("fillForm", (data) => {
  cy.get("#firstName").type(data.firstName);
  cy.get("#lastName").type(data.lastName);
  cy.get("#userEmail").type(data.email);
  cy.get(`input[name="gender"][value="${data.gender}"]`).check({ force: true });
  cy.get("#userNumber").type(data.mobile);

  // Seleção da data de nascimento
  cy.get("#dateOfBirthInput").click();
  cy.get(".react-datepicker__month-select").select("October");
  cy.get(".react-datepicker__year-select").select("1990");
  cy.get(".react-datepicker__day--010:not(.react-datepicker__day--outside-month)").click();

  // Subjects
  data.subjects.forEach((subject) => {
    cy.get("#subjectsInput").type(`${subject}{enter}`);
  });

  // Hobbies
  data.hobbies.forEach((hobby) => {
    cy.contains("label", hobby).click();
  });

  // Endereço
  cy.get("#currentAddress").type(data.address);

  // Estado e cidade
  cy.get("#state").click();
  cy.get(".css-26l3qy-menu").contains(data.state).click();
  cy.get("#city").click();
  cy.get(".css-26l3qy-menu").contains(data.city).click();
});

Cypress.Commands.add("validateModal", (data) => {
  cy.get(".modal-content").should("be.visible");
  cy.get("td").contains("Student Name").next().should("contain", `${data.firstName} ${data.lastName}`);
  cy.get("td").contains("Student Email").next().should("contain", data.email);
  cy.get("td").contains("Gender").next().should("contain", data.gender);
  cy.get("td").contains("Mobile").next().should("contain", data.mobile);
  cy.get("td").contains("Date of Birth").next().should("contain", "10 October,1990");
  cy.get("td").contains("Subjects").next().should("contain", data.subjects.join(", "));
  cy.get("td").contains("Hobbies").next().should("contain", data.hobbies.join(", "));
  cy.get("td").contains("Address").next().should("contain", data.address);
  cy.get("td").contains("State and City").next().should("contain", `${data.state} ${data.city}`);
});