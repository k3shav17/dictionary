#!/usr/bin/env node

/**
 * Dictionary
 * Gets meanings of the word mentioned from Free dictionary api
 *
 * @author Keshava <https://github.com/k3shav17/dictionary>
 */

import chalk from 'chalk';
import axios from 'axios';
import util from 'util';
import { exit } from 'process';
const args = process.argv;

(async () => {
	const word = args[2];
	let res = null;

	try {
		res = await axios.get(
			`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
		);
		console.log(
			chalk.green.bgBlack.bold(
				`\n${
					word.charAt(0).toUpperCase() +
					word.substring(1, word.length)
				}`
			)
		);
		for (let i = 0; i < 3; i++) {
			try {
				const word = res.data[0].meanings[0].definitions[i].definition;
				console.log(util.format(`\u007E ${word}\n`));
			} catch (err) {
				// console.log(`${word} not found!!!`);
			}
		}
	} catch (err) {
		if (err.response.status === 404) {
			console.log(
				chalk.red.bgBlack.bold(
					`${
						word.charAt(0).toUpperCase() +
						word.substring(1, word.length)
					}`
				) + ' not found'
			);
		}
		exit(1);
	}
	let synonyms = [];
	for (let i = 0; i < 3; i++) {
		try {
			const word = res.data[0].meanings[0].synonyms[i];
			if (word !== undefined) synonyms.push(word);
		} catch (err) {
			console.log(err);
		}
	}
	if (synonyms.length > 0) {
		console.log(
			chalk.white.bgBlack.bold('Synonyms') +
				': ' +
				chalk.blue.bgBlack(`${synonyms}`)
		);
	}
})();
