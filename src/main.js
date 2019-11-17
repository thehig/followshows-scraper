const path = require("path");
const puppeteer = require("puppeteer");
const fs = require("fs");
const util = require("util");
const writeFile = util.promisify(fs.writeFile);
const prettier = require("prettier");

const TAKE_SCREENSHOT = false;
const VERBOSE_PARSING = false;

const WEB_URL = "https://followshows.com/";

// Files & Directories
const CHROME_EXECUTABLE_PATH =
  "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe";
const CHROME_DATA_DIR = path.resolve(__dirname, "../chromedata");
const MARKDOWN_DATA_DIR = path.resolve(__dirname, "../data");
const SCREENSHOTS_DATA_DIR = path.resolve(__dirname, "../screenshots");

// Filename
let now = new Date();
const date = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()} ${now.getHours()}-${now.getMinutes()}`; // prettier-ignore
const MARKDOWN_FILENAME = path.join( MARKDOWN_DATA_DIR, `followshows-${date}.md` ); // prettier-ignore

// CSS Selectors
const CSS_SELECTOR_VIDEO_GRID = ".videos-grid-container";
const CSS_SELECTOR_SHOW_ALL = ".videos-grid-show-more";
const CSS_SELECTOR_VIDEO_WRAPPER = ".video-wrapper";
const CSS_SELECTOR_VIDEO_TILE = ".video-tile";
const CSS_SELECTOR_VIDEO_INFOBAR = ".video-infos";

// Open the browser, scrape the raw data into a JSON object
async function scrapeVideos() {
  console.log(`[ ]      Opening Browser`);
  const browser = await puppeteer.launch({
    devtools: true,
    headless: true,
    executablePath: CHROME_EXECUTABLE_PATH,
    userDataDir: CHROME_DATA_DIR
  });

  const page = await browser.newPage();

  console.log(`[ ]      ${WEB_URL}`);
  await page.goto(WEB_URL, {
    waitUntil: "networkidle2",
    timeout: 0
  });

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

// Turn the scraped data into parsed, usable information
const parseVideoInformation = videos => {
  process.stdout.write(`[ ]      Got ${videos.length} videos `);
  const write = VERBOSE_PARSING ? process.stdout.write : f => f;

  const result = videos.map(([tileText, infoText]) => {
    if (!VERBOSE_PARSING) process.stdout.write(".");

    //     tileText => ["The Good Place", "Employee of the Bearimy (25 min)"]
    const [showName, episodeNameAndDuration] = tileText.split("\n");
    write(`[ ]  - "${showName}"`);
    //     "Employee of the Bearimy (25 min)" => "25 min"
    const durationTxt = episodeNameAndDuration.match(/\((.*)\)/)[1];
    //     "Employee of the Bearimy (25 min)" => "Employee of the Bearimy"
    const nextEpisodeName = episodeNameAndDuration.split(" (")[0];
    //    "25 min" => ["25", "min"]
    const [num, unitTxt] = durationTxt.split(" ");
    let unit;
    switch (unitTxt) {
      case "min":
        unit = 1;
        break;
      // Note: I don't know what syntax they use for hours so this is my best guess
      case "hour":
      case "hr":
        unit = 60;
        break;
      default:
        throw new Error(`Unknown duration string: "${unitTxt}"`);
    }
    //    "25 min" => 25
    //    "2" hr" => 120
    const duration = parseInt(num) * unit;

    //    infoText => ["Season 4 Episode 5.", "4 episodes to watch."]
    const [nextEpisodeRaw, remainingEpisodesTxt] = infoText.split("\n\n");
    //    "Season 4 Episode 5." => "s4e5"
    const nextEpisode = nextEpisodeRaw
      .replace("Season ", "s")
      .replace(" Episode ", "e")
      .slice(0, -1);
    write(`, ${nextEpisode}`);

    //    "4 episodes to watch." => "4"
    const [numEpisodesTxt] = remainingEpisodesTxt.split(" ");
    //    "4" => 4
    const numEpisodes = parseInt(numEpisodesTxt);

    // #theydidthemath
    const remainingWatchTimeMins = duration * numEpisodes;
    const watchTime =
      remainingWatchTimeMins <= 180
        ? `${remainingWatchTimeMins} mins`
        : `${Math.floor(remainingWatchTimeMins / 60)} hours`;
    write(`, ${watchTime} remaining`);

    return {
      showName,
      numEpisodes,
      watchTime,
      nextEpisode,
      nextEpisodeName
    };
  });

  process.stdout.write("\n");

  return result;
};

// Convert a JSON object array into a markdown table (assuming they all have the same keys) and format using prettier
const createMarkdownTable = dataArray => {
  // Use the first item in the array to determine the keys
  const keys = Object.keys(dataArray[0]);

  return [
    `| ${keys.join(" | ")} |`, // Table Header
    `| ${" :---: |".repeat(keys.length)}`, // Table Alignment Indicators
    dataArray
      .map(obj => `| ${keys.map(key => obj[key]).join(" | ")} |`) // Table Row
      .join("\n")
  ].join("\n");
};

async function main() {
  console.log(`[ ] Scraping Videos`);
  const rawData = await scrapeVideos();
  console.log(`[ ] Parsing Video Information`);
  const showInformation = parseVideoInformation(rawData);
  console.log(`[ ] Creating Markdown`);

  // s1e1
  const newSeries = showInformation.filter(show => show.nextEpisode === "s1e1"); // prettier-ignore
  // sNe1 except s1e1
  const newSeason = showInformation.filter(
    show => show.nextEpisode != "s1e1" && /^s\d*e0?1/.test(show.nextEpisode)
  );
  //sNeN
  const ongoingSeason = showInformation.filter( show => show.nextEpisode != "s1e1" ); // prettier-ignore

  const markdownText = prettier.format(
    `
  # Ongoing Season
  
  ${createMarkdownTable(ongoingSeason)}
  
  # New Season
  
  ${createMarkdownTable(newSeason)}

  # New Series
  
  ${createMarkdownTable(newSeries)}
  `,
    { parser: "markdown" }
  );

  console.log("[ ] Writing to file", MARKDOWN_FILENAME);
  await writeFile(MARKDOWN_FILENAME, markdownText);
  console.log("[ ] Complete");
}

main();
