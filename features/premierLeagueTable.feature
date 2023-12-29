Feature: Daily Mail Preimer League Table Functionality

  Scenario: Get position and points of a given team
    Given I navigate to Daily Mail Sports Website and accept cookies
    And I click on Sport menu and open the Premier League table
    And I click on the View Tables tab
    Then Position and points of a given team is shown
            | team      |
            | Man Utd   |
