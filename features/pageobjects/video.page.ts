import { $, browser } from '@wdio/globals'
import Page from './page';
import { assert } from 'chai';
import { click } from '../utils/utils';

// Selectors

const firstVideoSelector = '//video[@class="vjs-tech"]';
const videoTitleSelector = '//div[@class="vjs-title-text"]';
const playButtonSelector = '//span[text()="Play"]/ancestor::div[@class="vjs-play-control vjs-control "]';
const videoPausedSelector = '//span[text()="More videos"]';
const adPausedSelector = '//div[@class="vjs-play-control vjs-control  vjs-paused"]';
const pauseButtonSelector = '//span[text()="Pause"]/ancestor::div[@class="vjs-play-control vjs-control  vjs-playing"]';
const nextButtonSelector = '(//span[text()="Skip"]/ancestor::div[@class="mol-skip-control vjs-control"])[1]';
const previousButtonSelector = '(//span[text()="Previous"]/ancestor::div[@class="mol-previous-control vjs-control"])[1]';
const muteButtonSelector = '//span[text()="Mute"]/ancestor::div[@class="vjs-volume-menu-button vjs-menu-button vjs-control vjs-vol-3"]';
const unmuteButtonSelector = '//span[text()="Unmute"]/ancestor::div[@class="vjs-volume-menu-button vjs-menu-button vjs-control vjs-vol-0"]';
const skipAdSelector = '(//button[@data-ck-tag="skip"])[1]';


export class VideoPage extends Page {


    // Actions

    public getVideoTitle = async () => {
        const videoTitle = await $(videoTitleSelector); 
        await videoTitle.waitForDisplayed();    
        return videoTitle.getText();
    };

    public async isAdDisplayed(): Promise<boolean> {
        const adIndicatorSelector = '.vjs-social-icon.vjs-embed-button-icon';
        const adIndicatorElement = await $(adIndicatorSelector);
        const isPresentInDOM = await adIndicatorElement.isExisting();
        const isVisible = await adIndicatorElement.isDisplayed();
        return isPresentInDOM && isVisible;
    }
    

    public async playVideo() {
        const playButton = await $(playButtonSelector);
        await click(playButton); 
        await browser.pause(4000);

        const adDisplayed = await this.isAdDisplayed();
        if (!adDisplayed) {
            await this.waitForAdToDisappear();
        }
    }

    public async pauseVideo() {
        const pauseVideoButton = await $(pauseButtonSelector);
        await click(pauseVideoButton);
    }

    public async nextVideo() {
        const nextButton = await $(nextButtonSelector);
        await click(nextButton);
        await browser.pause(2000);
        
        const adDisplayed = await this.isAdDisplayed();
        if (!adDisplayed) {
            await this.waitForAdToDisappear();
        }
    }

    public async previousVideo() {
        const previousButton = await $(previousButtonSelector);
        await click(previousButton);
        await browser.pause(2000);

        const adDisplayed = await this.isAdDisplayed();

        if (!adDisplayed) {
            await this.waitForAdToDisappear();
        }
    }

    public async openVideoPlayerPage() {
        browser.url('https://www.dailymail.co.uk/video/index.html');
        await this.waitForPageLoad();
    }

    public async muteVideo() {
        const muteButton = await $(muteButtonSelector);
        await click(muteButton); 
    }

    public async unmuteVideo() {
        const unmuteButton = await $(unmuteButtonSelector);
        await click(unmuteButton); 
    }

    public async moveSliderTo(percentage: number, waitTime: number) {
        const sliderHandle = await $(`//div[contains(@class, 'vjs-seek-handle vjs-slider-handle')]`);
        const sliderBar = await $(`//div[contains(@class, 'vjs-progress-holder vjs-slider')]`);
        const sliderBarSize = await sliderBar.getSize();
        const xOffset = Math.round(sliderBarSize.width * (percentage / 100) - (await sliderHandle.getSize()).width / 2);
        await sliderHandle.dragAndDrop({ x: xOffset, y: 0 });
        await browser.pause(waitTime);
    }

    public async waitForAdToDisappear() {

        // If ad is present, check if it is paused
        await browser.pause(3000);
        const adPausedButton = await $(adPausedSelector);
        const isAdPaused = await adPausedButton.isDisplayed();
        if (isAdPaused) {
            await click(adPausedButton);// If it is paused, play ad
        }

        await browser.pause(5000); // Wait for 5 seconds for the skip button if available


        // Switch to the iframe
        const iframeSelector = '(//iframe[contains(@id,"goog_")])[1]';
        const iframes = await $$(iframeSelector);
        if (iframes.length > 0) {
            await browser.switchToFrame(iframes[0]);
        }
    
        // Check for skip ad button
        let adDisappeared = false;
        const skipAdButton = await $(skipAdSelector);
        const isSkipAdPresent = await skipAdButton.isExisting();
    
        if (isSkipAdPresent) {
            try {
                await skipAdButton.click();
                adDisappeared = true; // ad will disappear after clicking skip
                await browser.pause(2000);
            } catch (error) {
                console.error("Error clicking Skip button:", error);
            }
        }

        await browser.switchToParentFrame(); // Switch back to the main content
        
        if (!adDisappeared) { // Final check and wait for the ad to disappear if not already
            const adIndicatorSelector = '.vjs-social-icon.vjs-embed-button-icon';
            const adIndicatorElement = await $(adIndicatorSelector);
            
            // Wait until the ad indicator (social media buttons) element is displayed.
            await adIndicatorElement.waitUntil(async () => {
                return await adIndicatorElement.isDisplayed();
            }, {
                timeout: 35000, // Adjust the timeout as needed
                timeoutMsg: 'Ad did not appear in the expected time'
             });
        }
    }
    
    

    // Asserts 

    public assertVideoChanged(videoTitle1: string, videoTitle2: string) {
        assert.notStrictEqual(videoTitle1,videoTitle2);
    }

    public async assertVideoIsPlaying() {
        await $(pauseButtonSelector).waitForDisplayed({timeout: 5000}); 
    }

    public async assertVideoIsPaused() {
        const videoPaused = await $(videoPausedSelector);
        await videoPaused.waitForDisplayed({timeout: 5000}); 
    }

    public async assertVideoIsMuted() {
        await $(unmuteButtonSelector).waitForDisplayed({timeout: 5000}); 
    }

    public async assertVideoIsUnmuted() {
        await $(muteButtonSelector).waitForDisplayed({timeout: 5000}); 
    }

    public assertFirstVideoDisplayed = async () => {
        const firstVideo = await $(firstVideoSelector); 
        await firstVideo.waitForDisplayed();    
    };
}

export default new VideoPage();
