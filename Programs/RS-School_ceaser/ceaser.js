const { Transform } = require("stream");

class CeaserStream extends Transform {
	alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

	constructor(shift, action, options = {}) {
		super(options);
		this.shift = +shift;
		this.action = action;
	}
	_transform(chunk, encoding, callback) {
		try {
			callback(null, this._encryptionChunk(chunk));
		} catch (err) {
			callback(err);
		}
	}

	_encryptionChunk(chunk) {
		for (let i = 0; i < chunk.length; i++) {
			
			if (chunk[i].toString(16) == "d"||chunk[i].toString(16) == "a") {		
				continue;
			}

			// console.log("chunk[i]", chunk[i].toString(16));
			chunk[i] = this._encryptionLetter({
				letter: String.fromCharCode(chunk[i]),
			}).charCodeAt(0);
		}

		return chunk;
	}

	_shiftAlphabet(shift) {
		let shiftedAlphabet = "";

		for (let i = 0; i < this.alphabet.length; i++) {
			const currentLetter =
				this.alphabet[i + shift] === undefined
					? this.alphabet[i + shift - this.alphabet.length]
					: this.alphabet[i + shift];

			shiftedAlphabet = shiftedAlphabet.concat(currentLetter);
		}
		return shiftedAlphabet;
	}

	_encryptionLetter({ letter, shift = this.shift, action = this.action }) {
		let indexOfLetter = this.alphabet.indexOf(letter.toUpperCase());
		let shiftedAlphabet = this._shiftAlphabet(shift);
		let upperCase = letter.toUpperCase() == letter;
		let encryptedLetter;

		if (indexOfLetter == -1) {			
			return letter;
		}
		if (action == "encode") {
			indexOfLetter = this.alphabet.indexOf(letter.toUpperCase());
			encryptedLetter = shiftedAlphabet[indexOfLetter];
		} else {
			indexOfLetter = shiftedAlphabet.indexOf(letter.toUpperCase());
			encryptedLetter = this.alphabet[indexOfLetter];
		}

		return upperCase ? encryptedLetter : encryptedLetter.toLowerCase();
	}
}

module.exports.CeaserStream = CeaserStream;
