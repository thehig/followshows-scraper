const puppeteer = require("./puppeteer");
const parser = require("./parser");
const markdown = require("./markdown");
const file = require("./file");

async function main(options) {
  const scraped = await puppeteer(options);
  const parsed = parser(scraped, options);
  const markeddown = markdown(parsed, options);
  const filed = file(markeddown, options);
  console.log("[ ] Complete");
}

module.exports = main;
