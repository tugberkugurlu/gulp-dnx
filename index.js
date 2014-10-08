var _ = require('lodash'),
	shell = require('gulp-shell'),
	gutil = require('gulp-util');

var PLUGIN_NAME = 'aspnet-k';

function kRunner(options) {

	options = _.extend({
		kCommand: 'web'
	}, options);

	var commands = [
		// 'kpm restore',
		// 'kpm build',
        '@powershell -NoProfile -ExecutionPolicy unrestricted -Command "for(;;) { Write-Output \"Starting...\"; k --watch ' + options.kCommand + ' }"'
	];

	return shell.task(commands, { env: process.env });
}

module.exports = kRunner;