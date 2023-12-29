# DMG Web Testing

## Overview

DMG Web Testing is an automated testing suite for the Daily Mail website tests. It utilizes WebdriverIO with Cucumber and TypeScript. This project can run on BrowserStack Automate and on local.

One of the biggest challenges of automating this website was the video player with ads. The undelying logic of how or when an ad is displayed on the video player is unknown. It took a significant amount of time to learn the ad behaviour and then implement code to get past the ads to test the main player features.

### Scenarios covered to manage ads:

When the website loads, if an ad is displayed at the start, code identifies it and wait for it to finish
If the ad has skip button, it clicks on the skip button,
If an ad is automatically paused for any reason, the code plays the ad and waits for the skip button or the ad to finish.
Same logic is applied to ads that pop up when user changes the video.

## Prerequisites
Before setting up the project, ensure you have the following installed:

Node.js (v18 or newer)

## Installation

### Clone the Repository

git clone [Repository URL]
cd DMG Web Test 

### Install Dependencies

npm install

## Set Environment Variables

In the .env file, fill in the necessary environment variables:

BROWSERSTACK_USERNAME,
BROWSERSTACK_ACCESS_KEY,


## Running Tests

To execute the tests, use the following command:
npm run test

Based on how you configured the wdio.conf.ts file (to run on locally or on BrowserStack), this command will run the tests on BrowserStack or locally
Default setting is to run on local.
