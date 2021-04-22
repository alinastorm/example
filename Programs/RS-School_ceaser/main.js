const { Command } = require("commander");
const { encrypt } = require("./encryption");

const cli = new Command();

cli
	.storeOptionsAsProperties(false)
	.requiredOption("-s, --shift <int number>", "a shift")
	.option("-i, --input <path>", "an input file")
	.option("-o, --output <path>", "an output file")
	.requiredOption("-a, --action <encode|decode>", "an action encode/decode");

cli.parse(process.argv);
let cliOption = cli.opts();

// A list of all the steps involved in our program
const steps = {
	start: async () => {
		if (cliOption.action != "encode" && cliOption.action != "decode") {
			steps._endError("action not a <encode|decode>",404);
		}
		if (!Number.isInteger(+cliOption.shift)) {			
			steps._endError("shift not a <number>",400);			
		}

		return steps._encryptStep();
	},
	_encryptStep: async () => {
		encrypt(cliOption);
	},

	_end: async () => {
		process.exit(0);
	},
	_endError: async (text,err) => {
		process.stderr.write(text);
		process.exit(err);
	},
};
steps.start();
