const prettier = require("prettier");

const toTitleCase = input =>
  input
    // insert a space before all caps
    .replace(/([A-Z])/g, " $1")
    // uppercase the first character
    .replace(/^./, str => str.toUpperCase());

// Convert a JSON object array into a markdown table (assuming they all have the same keys) and format using prettier
const createMarkdownTable = (dataArray, name) => {
  process.stdout.write(`[ ]      "${name}" Table `);

  // Use the first item in the array to determine the keys
  const keys = Object.keys(dataArray[0]);

  const result = [
    `# ${name}\n`, // Table Name
    `| ${keys.map(toTitleCase).join(" | ")} |`, // Table Header
    `| ${" :---: |".repeat(keys.length)}`, // Table Alignment Indicators
    dataArray
      .sort((a, b) => a.numEpisodes - b.numEpisodes)
      .map(obj => {
        process.stdout.write(".");
        return `| ${keys.map(key => obj[key]).join(" | ")} |`;
      }) // Table Row
      .join("\n")
  ].join("\n");

  process.stdout.write("\n");

  return result;
};

const createMarkdown = (
  showInformation,
  { markdown: { NEW_SEASON_REGEX } }
) => {
  console.log(`[ ] Markdown`);
  // New Series have nextEpisode === s1e1
  const newSeries = showInformation.filter(show => show.nextEpisode === "s1e1"); // prettier-ignore
  // New Season have nextEpisode episode === 1
  const newSeason = showInformation.filter(
    show =>
      show.nextEpisode != "s1e1" && NEW_SEASON_REGEX.test(show.nextEpisode)
  );
  // Ongoing Season have nextEpisode !== 1 && !== s1e1
  const ongoingSeason = showInformation.filter(
    show =>
      show.nextEpisode != "s1e1" && !NEW_SEASON_REGEX.test(show.nextEpisode)
  );

  const markdownText = prettier.format(
    [
      createMarkdownTable(ongoingSeason, "Ongoing Season"),
      createMarkdownTable(newSeason, "New Season"),
      createMarkdownTable(newSeries, "New Series")
    ].join("\n\n"),
    { parser: "markdown" }
  );

  return markdownText;
};

module.exports = createMarkdown;
