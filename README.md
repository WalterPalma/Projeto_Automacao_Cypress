# 📋 Cypress Cucumber Form

Projeto de testes automatizados usando **Cypress** com **Cucumber (BDD)** para validar o formulário de prática
disponível em [DemoQA](https://demoqa.com/automation-practice-form).

---

## 🚀 Tecnologias utilizadas

- [Cypress](https://www.cypress.io/) `^13.15.0`
- [@badeball/cypress-cucumber-preprocessor](https://github.com/badeball/cypress-cucumber-preprocessor) `^24.0.0`
- [@bahmutov/cypress-esbuild-preprocessor](https://github.com/bahmutov/cypress-esbuild-preprocessor) `^2.1.5`

---

## 📂 Estrutura do projeto

cypress/
e2e/
features/ # Arquivos .feature (cenários BDD)
step_definitions/ # Step definitions (Given, When, Then)
fixtures/
formData.json # Massa de dados para preenchimento do formulário
support/
commands.js # Comandos customizados (fillForm, validateModal)
cypress.config.js # Configuração do Cypress + Cucumber
package.json # Dependências e scripts


---

## ⚙️ Configuração

### `package.json`

```json
{
  "name": "cypress-cucumber-form",
  "version": "1.0.0",
  "devDependencies": {
    "cypress": "^13.15.0",
    "@badeball/cypress-cucumber-preprocessor": "^24.0.0",
    "@bahmutov/cypress-esbuild-preprocessor": "^2.1.5"
  },
  "scripts": {
    "test": "cypress run",
    "cypress:open": "cypress open"
  },
  "cypress-cucumber-preprocessor": {
    "stepDefinitions": [
      "cypress/e2e/step_definitions/**/*.{js,ts}"
    ]
  }
}

## cypress.config.js
const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const addCucumberPreprocessorPlugin = require("@badeball/cypress-cucumber-preprocessor").addCucumberPreprocessorPlugin;
const createEsbuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild").createEsbuildPlugin;

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://demoqa.com",
    specPattern: "cypress/e2e/features/**/*.feature",
    async setupNodeEvents(on, config) {
      await addCucumberPreprocessorPlugin(on, config);
      on(
        "file:preprocessor",
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      );
      return config;
    },
  },
});


---

🛠️ Comandos customizados

## fillForm
Preenche o formulário com dados vindos do formData.json.
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

## validateModal
Valida os dados exibidos no modal de confirmação após submissão.
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


📑 Massa de dados (formData.json)
{
  "firstName": "Walter",
  "lastName": "Palma",
  "email": "walter.palma@teste.com",
  "gender": "Male",
  "mobile": "1199999999",
  "dateOfBirth": "13 Dec 1996",
  "subjects": ["Maths", "English"],
  "hobbies": ["Sports", "Reading"],
  "address": "Rua Exemplo, 123 - São Paulo",
  "state": "NCR",
  "city": "Delhi"
}

🧪 Cenários BDD
1. Validar obrigatoriedade dos campos
Feature: Validar obrigatoriedade dos campos
  Scenario: Verificar obrigatoriedade dos campos
    Given que estou na página do formulário
    When tento submeter o formulário sem preencher os campos obrigatórios
    Then devo visualizar uma mensagem de erro para "First Name"
    And devo visualizar uma mensagem de erro para "Last Name"
    And devo visualizar uma mensagem de erro para "Gender"
    And devo visualizar uma mensagem de erro para "Mobile"

2. Validar presença dos campos
Feature: Validar presença dos campos no formulário
  Scenario: Verificar se todos os campos estão presentes
    Given que estou na página do formulário
    Then devo visualizar o campo "First Name"
    And devo visualizar o campo "Last Name"
    And devo visualizar o campo "Email"
    And devo visualizar o campo "Gender"
    And devo visualizar o campo "Mobile"
    And devo visualizar o campo "Date of Birth"
    And devo visualizar o campo "Subjects"
    And devo visualizar o campo "Hobbies"
    And devo visualizar o campo "Address"
    And devo visualizar o campo "State"
    And devo visualizar o campo "City"
    And devo visualizar o campo "Submit"

3. Validar dados exibidos no modal
Feature: Validar dados exibidos no modal
  Scenario: Verificar dados no modal de confirmação
    Given que estou na página do formulário
    And preencho todos os campos obrigatórios corretamente
    When submeto o formulário
    Then devo visualizar o modal de confirmação
    And os dados exibidos devem corresponder aos dados informados

4. Validar mensagem de confirmação
Feature: Validar mensagem de confirmação
  Scenario: Verificar mensagem após submissão
    Given que estou na página do formulário
    And preencho todos os campos obrigatórios corretamente
    When submeto o formulário
    Then devo visualizar a mensagem "Thanks for submitting the form"

---

▶️ Como executar
## Instalar dependências:
- npm install

## Abrir o Cypress em modo interativo:
-- npm run cypress:open

## Rodar os testes em modo headless:
-- npm test

---
✅ Resultado esperado :
- Validação de obrigatoriedade dos campos.
- Presença e visibilidade de todos os campos do formulário.
- Dados corretos exibidos no modal de confirmação.
- Mensagem de sucesso após submissão: "Thanks for submitting the form".
---