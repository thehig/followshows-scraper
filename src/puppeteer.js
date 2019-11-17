const puppeteer = require("puppeteer");
const path = require("path");

// Open the browser, scrape the raw data into a JSON object
async function scrapeVideos({
  puppeteer: {
    CHROME_EXECUTABLE_PATH,
    CHROME_DATA_DIR,
    WEB_URL,
    CSS_SELECTOR_SHOW_ALL,
    CSS_SELECTOR_VIDEO_GRID,
    CSS_SELECTOR_VIDEO_WRAPPER,
    CSS_SELECTOR_VIDEO_TILE,
    CSS_SELECTOR_VIDEO_INFOBAR,
    SCREENSHOTS_DATA_DIR,
    TAKE_SCREENSHOT
  }
}) {
  console.log(`[ ] Puppeteer`);
  console.log(`[ ]      Opening Browser`);
  const browser = await puppeteer.launch({
    devtools: true,
    headless: true,
    executablePath: CHROME_EXECUTABLE_PATH,
    userDataDir: CHROME_DATA_DIR
  });

  const page = await browser.newPage();

  console.log(`[ ]      Navigating to ${WEB_URL}`);
  await page.goto(WEB_URL, {
    waitUntil: "networkidle2",
    timeout: 0
  });

  await page.bringToFront();

  console.log(`[ ]      Clicking ${CSS_SELECTOR_SHOW_ALL}`);
  await page.click(CSS_SELECTOR_SHOW_ALL);

  if (TAKE_SCREENSHOT) {
    console.log(`[ ]      Screenshotting ${CSS_SELECTOR_VIDEO_GRID}`);
    const videoGrid = await page.$(CSS_SELECTOR_VIDEO_GRID);
    await videoGrid.screenshot({
      path: path.join(SCREENSHOTS_DATA_DIR, "example.png")
    });
  }

  const videos = await page.$$(CSS_SELECTOR_VIDEO_WRAPPER);
  process.stdout.write(`[ ]      Scraping ${CSS_SELECTOR_VIDEO_WRAPPER} `);
  const shows = await Promise.all(
    videos.map(async video => {
      process.stdout.write(".");
      const tile = await video.$(CSS_SELECTOR_VIDEO_TILE);
      const tileInnerText = await tile.getProperty("innerText");
      const tileText = await tileInnerText.jsonValue();

      const info = await video.$(CSS_SELECTOR_VIDEO_INFOBAR);
      const infoInnerText = await info.getProperty("innerText");
      const infoText = await infoInnerText.jsonValue();

      return [tileText, infoText];
    })
  );
  process.stdout.write("\n");

  console.log("[ ]      Closing Browser");
  await browser.close();

  return shows;
}

module.exports = scrapeVideos;
