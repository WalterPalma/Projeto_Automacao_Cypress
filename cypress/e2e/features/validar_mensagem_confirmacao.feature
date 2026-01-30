@CT04
Feature: Validar mensagem de confirmação

  Scenario: Verificar mensagem após submissão
    Given que estou na página do formulário
    And preencho todos os campos obrigatórios corretamente
    When submeto o formulário
    Then devo visualizar a mensagem "Thanks for submitting the form"
