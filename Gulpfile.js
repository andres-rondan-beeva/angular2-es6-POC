var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var watchify = require('watchify');
var gutil = require('gutil');
// var sass = require('gulp-sass');

var JADE_SRCS = 'app/**/*.jade',
    JS_SRCS_MAIN = 'app/app.js',
    JS_SRCS = 'app/**/*.js',
    SASS_SRCS = 'app/**/*{.scss, .css}',
    SASS_MAIN = 'app/scss/main.scss';

function bundle(b) {
    return b.bundle()
        .on('error', function(err) {
            console.log(err);
        })
        .pipe(source('app.js'))
        .pipe(buffer())
        .pipe(gulp.dest('./dist/'));
}

function watchJS() {
    var b = browserify(JS_SRCS_MAIN, watchify.args)
        .transform(babelify);

    var w = watchify(b)
        .on('update', function() {
            bundle(w);
        })
        .on('log', gutil.log);

    return bundle(w);
}

// define tasks here
gulp.task('jade', function() {

    gulp.src(JADE_SRCS)
        .pipe(plugins.jade())
        .pipe(gulp.dest('./dist/'));

});


gulp.task('buildJS', function() {
    var b = browserify(JS_SRCS_MAIN)
        .transform(babelify);

    return bundle(b);
});

gulp.task('watch', ['jade', 'buildJS'], function() {

    gulp.watch(JADE_SRCS, ['jade']);
    watchJS();
});
