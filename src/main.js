const fs = require("fs");
const util = require("util");
const writeFile = util.promisify(fs.writeFile);

const scrapeVideos = require("./puppeteer");
const parseVideoInformation = require("./parser");
const createMarkdown = require("./markdown");

async function main(options) {
  console.log(`[ ] Scraping Videos`);
  const rawData = await scrapeVideos(options);
  console.log(`[ ] Parsing Video Information`);
  const showInformation = parseVideoInformation(rawData, options);
  console.log(`[ ] Creating Markdown`);
  const markdownText = createMarkdown(showInformation, options);
  console.log("[ ] Writing to file", options.MARKDOWN_FILENAME);
  await writeFile(options.MARKDOWN_FULLPATH, markdownText);
  console.log("[ ] Complete");
}

module.exports = main;
