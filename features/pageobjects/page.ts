import { click } from '../utils/utils';

//selectors

const cookieButtonSelector = '//button[text()="Got it"]';

export default class Page {

    //helpers

    public acceptCookies = async () => {
        const cookieButton = await $(cookieButtonSelector);    
        await click(cookieButton);
    };

    public waitForPageLoad = async (): Promise<void> => {
        await browser.waitUntil(
            async () => {
                return await browser.execute(() => {
                    return document.readyState === 'complete';
                });
            },
            {
                timeout: 10000, // timeout after 10000 ms
                timeoutMsg: 'Page did not load in time'
            }
        );
    };
}

