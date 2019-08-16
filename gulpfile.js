'use strict';

var desktopPath = './sass/';

var gulp         = require('gulp');
var sass         = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var rename       = require('gulp-rename');
var path         = require('path');
var browserSync   = require('browser-sync');

var sassOptions = {
    errLogToConsole: true,
    outputStyle: 'expanded'
};

browserSync.init({
    server: "./"
});

gulp.task('desktop', function () {
    return gulp.src(desktopPath+'*.sass')
        .pipe(sass(sassOptions).on('error', sass.logError))
        .pipe(autoprefixer({
            overrideBrowserslist: [
                "last 5 version",
                "ie >= 11"
            ]
        }))
        .pipe(rename(function (file) {
            file.dirname = path.basename(file.dirname);
        }))
        .pipe(gulp.dest('css'));
});

gulp.task('watch', function () {
    gulp.watch(desktopPath+'*.sass', gulp.series('desktop')).on('change', browserSync.reload);
    gulp.watch("index.html").on('change', browserSync.reload);
});