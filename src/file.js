const fs = require("fs");
const util = require("util");
const writeFile = util.promisify(fs.writeFile);

async function writeToFile(
  text,
  { file: { MARKDOWN_FULLPATH, WRITE_TO_FILE } }
) {
  if (!WRITE_TO_FILE) return;

  console.log(`[ ] File`);
  console.log("[ ]      Writing to file");
  const file = await writeFile(MARKDOWN_FULLPATH, text);
  return file;
}

module.exports = writeToFile;
