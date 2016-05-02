const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const watchify = require('watchify');
const gutil = require('gutil');

const JADE_SRCS = 'app/**/*.jade',
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
    const b = browserify(JS_SRCS_MAIN, watchify.args)
        .transform(babelify);

    const w = watchify(b)
        .on('update', () => {
            bundle(w);
        })
        .on('log', gutil.log);

    return bundle(w);
}

// define tasks here
gulp.task('jade', () => {

    gulp.src(JADE_SRCS)
        .pipe(plugins.jade())
        .pipe(gulp.dest('./dist/'));

});

gulp.task('buildJS', () => {
    var b = browserify(JS_SRCS_MAIN)
        .transform(babelify);

    return bundle(b);
});

gulp.task('watch', ['jade', 'buildJS'], () => {

    gulp.watch(JADE_SRCS, ['jade']);
    watchJS();
});
