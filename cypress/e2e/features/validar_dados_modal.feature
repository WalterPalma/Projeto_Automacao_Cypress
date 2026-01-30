@CT03
Feature: Validar dados exibidos no modal

  Scenario: Verificar dados no modal de confirmação
    Given que estou na página do formulário
    And preencho todos os campos obrigatórios corretamente
    When submeto o formulário
    Then devo visualizar o modal de confirmação
    And os dados exibidos devem corresponder aos dados informados
