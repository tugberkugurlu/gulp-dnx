var _ = require('lodash'),
  shell = require('gulp-shell'),
  gutil = require('gulp-util');

var PLUGIN_NAME = 'aspnet-k';

function kRunner(options) {

    options = _.extend({
          restore: true,
          build: false,
          run: true,
          kCommand: 'web',
          cwd: './'
    }, options);

    if(options.restore == false && options.build == false && options.run == false) {
        throw new gutil.PluginError(PLUGIN_NAME, 'No action has been specified')
    }

    var commands = [];

    if(options.restore === true) {
        commands.push('dnu restore');
    }

    if(options.build === true) {
        commands.push('dnu build');
    }

    if(options.run === true) {
        commands.push('@powershell -NoProfile -ExecutionPolicy unrestricted -Command "for(;;) { Write-Output \"Starting...\"; dnx --watch . ' + options.kCommand + ' }"');
    }

    return shell.task(commands, { env: process.env, cwd: options.cwd });
}

kRunner.build = function(cwd) {
    return kRunner({
        build: true,
        restore: false,
        run: false,
        cwd: cwd
    });
}

kRunner.restore = function(cwd) {
    return kRunner({
        restore: true,
        build: false,
        run: false,
        cwd: cwd
    });
}

kRunner.restoreBuild = function(cwd) {
    return kRunner({
        restore: true,
        build: true,
        run: false,
        cwd: cwd
    });
}

module.exports = kRunner;
