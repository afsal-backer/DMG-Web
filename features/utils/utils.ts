/**
 * Custom click function that waits for an element to be displayed before clicking.
 * @param {WebdriverIO.Element} element - The WebdriverIO element to be clicked.
 */
export const click = async (element: WebdriverIO.Element) => {
    try {
        await element.waitForDisplayed({ timeout: 10000 });
        await element.click();
        await browser.pause(1000);
    } catch (error) {
        throw new Error(`Error clicking on ${element} ${error}`);
    }
};



/**
 * Waits for an element to disappear (not be displayed) within a given timeout.
 *  * @param {WebdriverIO.Element} element - The WebdriverIO element to be clicked.
 */
export const waitToDisappear = async (
    element: WebdriverIO.Element,
    timeout = 40000
) => {
    await element.waitForDisplayed({ timeout, reverse: true });
};

