#!/usr/bin/env node
const path = require("path");

// const yargs = require("yargs");

let now = new Date();
const date = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()} ${now.getHours()}-${now.getMinutes()}`; // prettier-ignore
const MARKDOWN_DATA_DIR = path.resolve(__dirname, "../data");
const MARKDOWN_FILENAME = `followshows-${date}.md`;

const options = {
  TAKE_SCREENSHOT: false,
  VERBOSE_PARSING: false,

  WEB_URL: "https://followshows.com/",

  // Files & Directories
  CHROME_EXECUTABLE_PATH: "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe", // prettier-ignore
  CHROME_DATA_DIR: path.resolve(__dirname, "../chromedata"),
  SCREENSHOTS_DATA_DIR: path.resolve(__dirname, "../screenshots"),

  // Filename
  MARKDOWN_DATA_DIR,
  MARKDOWN_FILENAME,
  MARKDOWN_FULLPATH: path.join( MARKDOWN_DATA_DIR, MARKDOWN_FILENAME ), // prettier-ignore

  // CSS Selectors
  CSS_SELECTOR_VIDEO_GRID: ".videos-grid-container",
  CSS_SELECTOR_SHOW_ALL: ".videos-grid-show-more",
  CSS_SELECTOR_VIDEO_WRAPPER: ".video-wrapper",
  CSS_SELECTOR_VIDEO_TILE: ".video-tile",
  CSS_SELECTOR_VIDEO_INFOBAR: ".video-infos",

  // Does Match: s1e1 s1e01 s9e1 s9e01 s12e1 s12e01
  // Does Not Match: s1e2 s1e10 s9e2 s9e10 s12e2 s12e10
  NEW_SEASON_REGEX: /^s\d*e0?1$/
};

const main = require('../src/main.js');

main(options);

// const groups = {
//   // Puppeteer Options
//   // Output Options
// };


// const usage = `Usage String goes Here`;

/**
 * https://github.com/yargs/yargs/blob/aa09faf708457bf46eb9b003ce168302763a7d9e/docs/api.md
 * 
 * alias: string or array of strings, alias(es) for the canonical option key, see alias()
 * array: boolean, interpret option as an array, see array()
 * boolean: boolean, interpret option as a boolean flag, see boolean()
 * choices: value or array of values, limit valid option arguments to a predefined set, see choices()
 * coerce: function, coerce or transform parsed command line values into another value, see coerce()
 * config: boolean, interpret option as a path to a JSON config file, see config()
 * configParser: function, provide a custom config parsing function, see config()
 * conflicts: string or array of strings, require certain keys not to be set, see conflicts()
 * count: boolean, interpret option as a count of boolean flags, see count()
 * default: value, set a default value for the option, see default()
 * defaultDescription: string, use this description for the default value in help content, see default()
 * demandOption: boolean or string, demand the option be given, with optional error message, see demandOption()
 * desc/describe/description: string, the option description for help content, see describe()
 * global: boolean, indicate that this key should not be reset when a command is invoked, see global()
 * group: string, when displaying usage instructions place the option under an alternative group heading, see group()
 * hidden: don't display option in help output.
 * implies: string or array of strings, require certain keys to be set, see implies()
 * nargs: number, specify how many arguments should be consumed for the option, see nargs()
 * normalize: boolean, apply path.normalize() to the option, see normalize()
 * number: boolean, interpret option as a number, number()
 * requiresArg: boolean, require the option be specified with a value, see requiresArg()
 * skipValidation: boolean, skips validation if the option is present, see skipValidation()
 * string: boolean, interpret option as a string, see string()
 * type: one of the following strings
 *        'array': synonymous for array: true, see array()
 *        'boolean': synonymous for boolean: true, see boolean()
 *        'count': synonymous for count: true, see count()
 *        'number': synonymous for number: true, see number()
 *        'string': synonymous for string: true, see string()
 */

// prettier-ignore
// const options = 
//         yargs.usage(usage)
//         .option("verbose", { alias: "v", describe: "Enable verbose logging", type: "boolean", default: false })
//         .argv;

// console.log(`Options: ${JSON.stringify(options)}`);
