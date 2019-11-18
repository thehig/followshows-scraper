const fs = require("fs");
const util = require("util");
const writeFile = util.promisify(fs.writeFile);

async function writeToFile(
  text,
  { output: { MARKDOWN_FULLPATH, WRITE_TO_FILE, WRITE_TO_CONSOLE } }
) {
  console.log(`[ ] Output`);
  if (WRITE_TO_FILE) {
    console.log("[ ]      Writing to File", MARKDOWN_FULLPATH);
    await writeFile(MARKDOWN_FULLPATH, text);
    console.log("[ ]      Done Writing to File");
  }
  if (WRITE_TO_CONSOLE) {
    console.log("[ ]      Writing to Console");
    console.log(text);
    console.log("[ ]      Done Writing to Console");
  }
}

module.exports = writeToFile;
