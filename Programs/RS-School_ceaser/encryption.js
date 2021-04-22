const { CeaserStream } = require("./ceaser");
const fs = require("fs");

// { shift: '1', action: 'encode',input: '', output:'' }

function encrypt({ shift, action, input, output }) {
	if (input && output) {
		rStream = fs.createReadStream(input);
		wStream = fs.createWriteStream(output, {'flags': 'a'});
		_errorHadling({ rStream, wStream });

		rStream.pipe(new CeaserStream(shift, action)).pipe(wStream);
	}
	if (!input && !output) {

		process.stdin.pipe(new CeaserStream(shift, action)).pipe(process.stdout);
	}
	if (input && !output) {
		rStream = fs.createReadStream(input);

		rStream.pipe(new CeaserStream(shift, action)).pipe(process.stdout);
	}
	if (!input && output) {
		wStream = fs.createWriteStream(output,{'flags': 'a'});

		process.stdin.pipe(new CeaserStream(shift, action)).pipe(wStream);
	}
}
function _errorHadling({ rStream, wStream }) {

	if (rStream) {
		rStream.on("error", function (err) {
			process.stderr.write(err.toString());
			process.exit(500);
		});
	}
	if (wStream) {
		wStream.on("error", function (err) {
			process.stderr.write(err.toString());
			process.exit(501);
		});
	}
}

module.exports.encrypt = encrypt;
