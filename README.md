gulp-aspnet-k
=============

Gulp plugin for ASP.NET 5. You can use this plugin to integrate ASP.NET 5 `dnu build`, `dnu restore` and `dnx` command execution (for the commands available inside you project.json file). Check out the [example](/example/) inside the repository.

## Installation

You can install gulp-aspnet-k plugin through npm:

    npm install gulp-aspnet-k

Preferably, you can save this as dev dependency:

    npm install gulp-aspnet-k --save-dev

## Usage

```javascript
var gulp = require('gulp'),
    aspnetk = require("gulp-aspnet-k");
gulp.task('default', function(cb) {
    return gulp.start('aspnet-run');
});
gulp.task('aspnet-run', aspnetk());
```

The default function restores the packages according to your project.json file and runs the web command inside the project.json file. You can pass a few options to this to choose what's actually going to run:

```javascript
// the default options
var options = {
    restore: true,
    build: false,
    run: true,
    kCommand: 'web',
    cwd: './'
};
gulp.task('aspnet-run', aspnetk(options));
```

There are also shorthand methods for specific tasks:

```javascript
gulp.task('aspnet-run', aspnetk(options));
// only restores the packages
gulp.task('aspnet-restore', aspnetk.restore());
// only builds the project
gulp.task('aspnet-build', aspnetk.build());
// restores the packages and builds the project
gulp.task('aspnet-restore-build', aspnetk.restoreBuild());
```

gulp-aspnet-k also integrates with `k --watch` to run your commands. So, it will restart your server when you change a code file.

###cwd
You can change the working directory for the specific command to run passing `cwd` as an option to the main method or as parameter to the shorthand methods.

```javascript
//assuming project.json is inside the 'server' directory
var options = {
    kCommand: 'web',
    cwd: './server/'
};
gulp.task('aspnet-run', aspnetk(options));

//using the shorthand methods
gulp.task('aspnet-restore', aspnetk.restore('./server/'));
gulp.task('aspnet-build', aspnetk.build('./server/'));
gulp.task('aspnet-restore-build', aspnetk.restoreBuild('./server/'));
```
