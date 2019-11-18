const puppeteer = require("./puppeteer");
const parser = require("./parser");
const markdown = require("./markdown");
const output = require("./output");

async function main(options) {
  const scraped = await puppeteer(options);
  const parsed = parser(scraped, options);
  const markeddown = markdown(parsed, options);
  output(markeddown, options);
  console.log("[ ] Complete");
}

module.exports = main;
