import { Browser, BrowserErrorCaptureEnum } from 'happy-dom';

const browser = new Browser({ settings: { errorCapture: BrowserErrorCaptureEnum.processLevel } });
const page = browser.newPage();

// Navigates page
await page.goto('https://127.0.0.1:4321/');

console.log(page.mainFrame.document.title);

// Aborts all ongoing operations and closes the browser
await browser.close();