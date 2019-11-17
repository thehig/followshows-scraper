#!/usr/bin/env node

const options = require('../src/options.js');
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
