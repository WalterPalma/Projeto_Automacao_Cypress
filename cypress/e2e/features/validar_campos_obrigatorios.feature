@CT01
Feature: Validar obrigatoriedade dos campos

  Scenario: Verificar obrigatoriedade dos campos
    Given que estou na página do formulário
    When tento submeter o formulário sem preencher os campos obrigatórios
    Then devo visualizar uma mensagem de erro para "First Name"
    And devo visualizar uma mensagem de erro para "Last Name"
    And devo visualizar uma mensagem de erro para "Gender"
    And devo visualizar uma mensagem de erro para "Mobile"