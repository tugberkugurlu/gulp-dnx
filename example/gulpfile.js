var gulp = require('gulp'),
    minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    less = require('gulp-less'),
    del = require('del'),
    rename = require('gulp-rename'),
    gitshasuffix = require('gulp-gitshasuffix'),
    gulpif = require('gulp-if'),
    order = require('gulp-order'),
    gutil = require('gulp-util'),
    ini = require('ini'),
	aspnetk = require("../");

gulp.task('default', ['clean'], function(cb) {
	return gulp.start('fonts', 'scripts', 'styles');
});

gulp.task('clean', function(cb) {
    return del(['assets/css', 'assets/js', 'assets/less', 'assets/img', 'assets/fonts'], cb);
});

gulp.task('fonts', function() {
    
    var fileList = [
        'bower_components/bootstrap/dist/fonts/*', 
        'bower_components/fontawesome/fonts/*'
    ];
    
    return gulp.src(fileList)
        .pipe(gulp.dest('assets/fonts'));
});

gulp.task('scripts', function() {
    
    var fileList = [
        'bower_components/jquery/dist/jquery.js',
        'bower_components/bootstrap/dist/js/bootstrap.js',

        'client/js/*.js'
    ];
    
    return gulp.src(fileList)
        .pipe(gulp.dest('assets/js'))
        .pipe(aspnetk())
        .pipe(concat('script.js'))
        .pipe(gulp.dest('assets/js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(gitshasuffix({ length: 40, separator: "-" }))
        .pipe(uglify())
        .pipe(gulp.dest('assets/js'));
});

gulp.task('styles', function() {
    
    var fileList = [
        'client/less/bootstrap.less',
        'client/less/main.less',
        'bower_components/fontawesome/css/font-awesome.css'
    ];
    
    return gulp.src(fileList)
        .pipe(gulpif(/[.]less$/, less()))
        .pipe(gulp.dest('assets/css'))
        .pipe(order(['**/bootstrap.css', '**/font-awesome.css', '**/main.css']))
        .pipe(concat('style.css'))
        .pipe(gulp.dest('assets/css'))
        .pipe(rename({suffix: '.min'}))
        .pipe(gitshasuffix({ length: 40, separator: "-" }))
        .pipe(minifycss())
        .pipe(gulp.dest('assets/css'));
});