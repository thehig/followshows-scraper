const prettier = require("prettier");

const toTitleCase = input =>
  input
    // insert a space before all caps
    .replace(/([A-Z])/g, " $1")
    // uppercase the first character
    .replace(/^./, str => str.toUpperCase());

// Convert a JSON object array into a markdown table (assuming they all have the same keys) and format using prettier
const createMarkdownTable = (dataArray, name) => {
  // Use the first item in the array to determine the keys
  const keys = Object.keys(dataArray[0]);

  const result = [
    `# ${name}\n`, // Table Name
    `| ${keys.map(toTitleCase).join(" | ")} |`, // Table Header
    `| ${" :---: |".repeat(keys.length)}`, // Table Alignment Indicators
    dataArray
      .sort((a, b) => a.numEpisodes - b.numEpisodes)
      .map(obj => {
        return `| ${keys.map(key => obj[key]).join(" | ")} |`;
      }) // Table Row
      .join("\n")
  ].join("\n");

  return result;
};

const createMarkdown = (
  showInformation,
  {
    SHOW_PROGRESS,
    markdown: {
      NEW_SEASON_REGEX,
      FILTER_NEW_SEASON,
      FILTER_ONGOING_SEASON,
      FILTER_NEW_SERIES
    }
  }
) => {
  SHOW_PROGRESS && console.log(`[ ] Markdown`);
  const tables = [];

  if (FILTER_NEW_SERIES) {
    SHOW_PROGRESS && process.stdout.write(`[ ]      Filtering New Series `);
    let count = 0;
    // New Series have nextEpisode === s1e1
    const newSeries = showInformation.filter(show => {
    const include = show.nextEpisode === "s1e1";
    SHOW_PROGRESS && include && count++ &&  process.stdout.write('.');
    return include;
  }); // prettier-ignore
    tables.push(createMarkdownTable(newSeries, "New Series"));
    SHOW_PROGRESS && process.stdout.write(` (${count})\n`);
  }

  if (FILTER_NEW_SEASON) {
    SHOW_PROGRESS && process.stdout.write(`[ ]      Filtering New Seasons `);
    let count = 0;
    // New Season have nextEpisode episode === 1
    const newSeason = showInformation.filter(show => {
      const include =
        show.nextEpisode != "s1e1" && NEW_SEASON_REGEX.test(show.nextEpisode);
      SHOW_PROGRESS && include && count++ && process.stdout.write(".");
      return include;
    });
    tables.push(createMarkdownTable(newSeason, "New Season"));
    SHOW_PROGRESS && process.stdout.write(` (${count})\n`);
  }

  if (FILTER_ONGOING_SEASON) {
    SHOW_PROGRESS &&
      process.stdout.write(`[ ]      Filtering Ongoing Seasons `);
    let count = 0;
    // Ongoing Season have nextEpisode !== 1 && !== s1e1
    const ongoingSeason = showInformation.filter(show => {
      const include =
        show.nextEpisode != "s1e1" && !NEW_SEASON_REGEX.test(show.nextEpisode);
      SHOW_PROGRESS && include && count++ && process.stdout.write(".");
      return include;
    });
    tables.push(createMarkdownTable(ongoingSeason, "Ongoing Season"));
    SHOW_PROGRESS && process.stdout.write(` (${count})\n`);
  }

  const markdownText = prettier.format(tables.join("\n\n"), {
    parser: "markdown"
  });

  return markdownText;
};

module.exports = createMarkdown;
