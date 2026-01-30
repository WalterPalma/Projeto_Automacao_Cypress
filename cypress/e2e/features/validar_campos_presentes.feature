@CT02
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