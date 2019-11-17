const puppeteer = require("./puppeteer");
const parser = require("./parser");
const markdown = require("./markdown");
const file = require("./file");

async function main(options) {
  console.log(`[ ] Puppeteer`);
  const scraped = await puppeteer(options);
  console.log(`[ ] Parser`);
  const parsed = parser(scraped, options);
  console.log(`[ ] Markdown`);
  const markeddown = markdown(parsed, options);
  console.log(`[ ] File`);
  const filed = file(markeddown, options);
  console.log("[ ] Complete");
}

module.exports = main;
