const path = require("path");
const puppeteer = require("puppeteer");

const executablePath =
  "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe";
// const realUserDataDir = "C:\\Users\\makes\\AppData\\Local\\Google\\Chrome";
const userDataDir = path.resolve(__dirname, "../chromedata");

const SCREENSHOTS_DIR = path.resolve(__dirname, "../screenshots");
const WEB_URL = "https://followshows.com/";
const CSS_SELECTOR_SHOW_ALL = ".videos-grid-show-more";
const CSS_SELECTOR_VIDEO_GRID = ".videos-grid-container";

async function main() {
  console.log(`Opening Browser`);
  const browser = await puppeteer.launch({
    executablePath,
    headless: true,
    userDataDir
  });

  const page = await browser.newPage();

  console.log(`Opening ${WEB_URL}`);

  await page.goto(WEB_URL, {
    waitUntil: "networkidle2",
    timeout: 0
  });

  console.log(`Clicking ${CSS_SELECTOR_SHOW_ALL}`);

  await page.click(CSS_SELECTOR_SHOW_ALL);

  console.log(`Screenshotting ${CSS_SELECTOR_VIDEO_GRID}`);
  const videoGrid = await page.$(CSS_SELECTOR_VIDEO_GRID);
  await videoGrid.screenshot({
    path: path.join(SCREENSHOTS_DIR, "example.png")
  });

  console.log("Closing Browser");

  await browser.close();
}

main();
