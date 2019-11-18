// Turn the scraped data into parsed, usable information
const parseVideoInformation = (
  videos,
  { SHOW_PROGRESS, parser: { VERBOSE_PARSING } }
) => {
  SHOW_PROGRESS && console.log(`[ ] Parser`);
  SHOW_PROGRESS &&
    process.stdout.write(`[ ]      Parsing ${videos.length} videos `);
  const write = VERBOSE_PARSING ? SHOW_PROGRESS && process.stdout.write : (f => f); // prettier-ignore

  const result = videos.map(([tileText, infoText]) => {
    if (!VERBOSE_PARSING) SHOW_PROGRESS && process.stdout.write(".");

    //     tileText => ["The Good Place", "Employee of the Bearimy (25 min)"]
    const [showName, episodeNameAndDuration] = tileText.split("\n");
    write(`[ ]  - "${showName}"`);
    //     "Employee of the Bearimy (25 min)" => "25 min"
    const durationTxt = episodeNameAndDuration.match(/\((.*)\)/)[1];
    //     "Employee of the Bearimy (25 min)" => "Employee of the Bearimy"
    const nextEpisodeName = episodeNameAndDuration.split(" (")[0];
    //    "25 min" => ["25", "min"]
    const [num, unitTxt] = durationTxt.split(" ");
    let unit;
    switch (unitTxt) {
      case "min":
        unit = 1;
        break;
      // Note: I don't know what syntax they use for hours so this is my best guess
      case "hour":
      case "hr":
        unit = 60;
        break;
      default:
        throw new Error(`Unknown duration string: "${unitTxt}"`);
    }
    //    "25 min" => 25
    //    "2" hr" => 120
    const duration = parseInt(num) * unit;

    //    infoText => ["Season 4 Episode 5.", "4 episodes to watch."]
    const [nextEpisodeRaw, remainingEpisodesTxt] = infoText.split("\n\n");
    //    "Season 4 Episode 5." => "s4e5"
    const nextEpisode = nextEpisodeRaw
      .replace("Season ", "s")
      .replace(" Episode ", "e")
      .slice(0, -1);
    write(`, ${nextEpisode}`);

    //    "4 episodes to watch." => "4"
    const [numEpisodesTxt] = remainingEpisodesTxt.split(" ");
    //    "4" => 4
    const numEpisodes = parseInt(numEpisodesTxt);

    // #theydidthemath
    const remainingWatchTimeMins = duration * numEpisodes;
    const watchTime =
      remainingWatchTimeMins <= 180
        ? `${remainingWatchTimeMins} mins`
        : `${Math.floor(remainingWatchTimeMins / 60)} hours`;
    write(`, ${watchTime} remaining`);

    return {
      showName,
      numEpisodes,
      watchTime,
      nextEpisode,
      nextEpisodeName
    };
  });

  SHOW_PROGRESS && process.stdout.write("\n");

  return result;
};

module.exports = parseVideoInformation;
