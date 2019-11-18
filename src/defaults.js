const path = require("path");

// const yargs = require("yargs");

let now = new Date();
const date = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()} ${now.getHours()}-${now.getMinutes()}`; // prettier-ignore

const MARKDOWN_DATA_DIR = path.resolve(__dirname, "../data");
const MARKDOWN_FILENAME = `followshows-${date}.md`;

const SCREENSHOT_DATA_DIR = path.resolve(__dirname, "../screenshots");
const SCREENSHOT_FILENAME = `followshows-${date}.png`;

const options = {
  puppeteer: {
    TAKE_SCREENSHOT: false,

    WEB_URL: "https://followshows.com/",
    CHROME_EXECUTABLE_PATH: "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe", // prettier-ignore
    CHROME_DATA_DIR: path.resolve(__dirname, "../chromedata"),

    // CSS Selectors
    CSS_SELECTOR_VIDEO_GRID: ".videos-grid-container",
    CSS_SELECTOR_SHOW_ALL: ".videos-grid-show-more",
    CSS_SELECTOR_VIDEO_WRAPPER: ".video-wrapper",
    CSS_SELECTOR_VIDEO_TILE: ".video-tile",
    CSS_SELECTOR_VIDEO_INFOBAR: ".video-infos"
  },
  parser: {
    VERBOSE_PARSING: false
  },
  markdown: {
    FILTER_NEW_SEASON: true,
    FILTER_ONGOING_SEASON: true,
    FILTER_NEW_SERIES: true,
    // Does Match: s1e1 s1e01 s9e1 s9e01 s12e1 s12e01
    // Does Not Match: s1e2 s1e10 s9e2 s9e10 s12e2 s12e10
    NEW_SEASON_REGEX: /^s\d*e0?1$/
  },
  output: {
    WRITE_TO_FILE: false,
    WRITE_TO_CONSOLE: true,
    MARKDOWN_DATA_DIR,
    MARKDOWN_FILENAME,
    MARKDOWN_FULLPATH: path.join( MARKDOWN_DATA_DIR, MARKDOWN_FILENAME ), // prettier-ignore
    
    SCREENSHOT_DATA_DIR,
    SCREENSHOT_FILENAME,
    SCREENSHOT_FULLPATH: path.join( SCREENSHOT_DATA_DIR, SCREENSHOT_FILENAME ), // prettier-ignore
  }
};

module.exports = options;
