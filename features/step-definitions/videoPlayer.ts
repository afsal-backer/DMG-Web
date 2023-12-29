import { Given, When, Then } from '@wdio/cucumber-framework';
import videoPage from '../pageobjects/video.page';

let firstVideoTitle: string;
let secondVideoTitle: string;
let previousVideoTitle: string;
let autoPlayedVideoTitle: string;

Given('I navigate to Daily Mail Website and accept cookies', async () => {
    await videoPage.openVideoPlayerPage();
    await videoPage.acceptCookies(); 
});

When('I view the first video', async () => {
    await videoPage.assertFirstVideoDisplayed();
    firstVideoTitle = await videoPage.getVideoTitle();
});

When('I play the video', async () => {
    await videoPage.playVideo();
    await videoPage.assertVideoIsPlaying();
});

When('I pause the video', async () => {
    await videoPage.pauseVideo();
    await videoPage.assertVideoIsPaused();
});

When('I click on the skip button', async () => {
    await videoPage.nextVideo();
    secondVideoTitle = await videoPage.getVideoTitle();
});

Then('The video should change to the next one', () => {
    videoPage.assertVideoChanged(firstVideoTitle, secondVideoTitle);
});

When('I click on the previous button', async () => {
    await videoPage.previousVideo();
    previousVideoTitle = await videoPage.getVideoTitle();
});

Then('The video should change to the previous one', () => {
    videoPage.assertVideoChanged(previousVideoTitle, secondVideoTitle);
});

When('I click on the speaker icon to mute the video', async () => {
    await videoPage.muteVideo();
    await videoPage.assertVideoIsMuted();
});

When('I click on the speaker icon again to unmute the video', async () => {
    await videoPage.unmuteVideo();
    await videoPage.assertVideoIsUnmuted();
});

Then('The video is finished, next video should autoplay', async () => {
    await videoPage.moveSliderTo(94.65, 4000);
    autoPlayedVideoTitle = await videoPage.getVideoTitle();
    videoPage.assertVideoChanged(previousVideoTitle, autoPlayedVideoTitle);
    await videoPage.assertVideoIsPlaying();
});

