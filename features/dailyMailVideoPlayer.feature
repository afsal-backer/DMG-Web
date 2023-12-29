Feature: Daily Mail Video Player Functionality

  Scenario: Verify the video player functionality
    Given I navigate to Daily Mail Website and accept cookies
    When I view the first video
    And I play the video
    And I pause the video
    And I click on the skip button
    Then The video should change to the next one
    When I click on the previous button
    Then The video should change to the previous one
    And I click on the speaker icon to mute the video
    And I click on the speaker icon again to unmute the video
    Then The video is finished, next video should autoplay

