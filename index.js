#!/usr/bin/env node

/**
 * Dictionary
 * Gets meanings of the word mentioned from Free dictionary api
 *
 * @author Keshava <https://github.com/k3shav17>
 */

const chalk = require('chalk');
const cli = require('./utils/cli');
const axios = require('axios');
const input = cli.input;
const args = process.argv;

(async () => {
	input.includes(`help`) && cli.showHelp(0);
	const word = args[2];
	console.log(
		chalk.blue.bgCyanBright.bold(
			`\n${
				word.charAt(0).toUpperCase() + word.substring(1, word.length)
			} `
		)
	);
	const res = await axios.get(
		`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
	);

	for (let i = 0; i < 3; i++) {
		try {
			const word = res.data[0].meanings[0].definitions[i].definition;
			console.log(` * ${word}\n`);
		} catch (err) {}
	}
})();
