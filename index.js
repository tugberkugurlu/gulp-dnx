var _ = require('lodash'),
	through = require('through2'),
	async = require('async'),
	exec = require('child_process').exec,
	gutil = require('gulp-util'),
	path = require('path');

var PLUGIN_NAME = 'aspnet-k';

function kpmBuild() {
	
	var projectRoot = process.cwd(),
		stream = through.obj(function (file, unused, done) {
			var self = this;
			console.log(file.path);
			self.push(file);
			done();
		});

	stream.resume();

	return stream;
}

module.exports = kpmBuild;