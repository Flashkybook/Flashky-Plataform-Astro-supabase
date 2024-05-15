import { assert, describe, expect, test } from 'vitest';
import { Browser, BrowserErrorCaptureEnum } from 'happy-dom';






// https://docs.astro.build/en/guides/testing/
// https://github.com/capricorn86/happy-dom/wiki/Getting-started


// https://stackoverflow.com/questions/62588767/running-google-chrome-on-wsl-ubuntu-as-headless-no-sandbox-gives-multiple
// https://developer.chrome.com/blog/chrome-headless-shell?hl=es-419

describe('auth', async () => {
    const browser = new Browser({ settings: { errorCapture: BrowserErrorCaptureEnum.processLevel } });
    const page = browser.newPage();
    

    test('open browser', async () => {
        // Navigates page
        await page.goto('https://github.com/capricorn86');

        // Navigate the page to a URL
        // await page.goto('https://developer.chrome.com/');
        const element = await page.waitForSelector('title');

        console.log(element)

        expect(1).toBeDefined();
        page.close()

    })

    
})