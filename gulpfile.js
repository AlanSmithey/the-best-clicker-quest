// include gulp
var gulp = require('gulp');

// include plugins
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var autoprefixer = require('gulp-autoprefixer');
var rename = require('gulp-rename');
var csso = require('gulp-csso');
var htmlmin = require('gulp-htmlmin');

var connect = require('gulp-connect');
var pages = require('gulp-gh-pages');

// other variables
var sass_option = {
    outputStyle: 'expanded'
};

var csso_option = {
    restructure: false
};

var autoprefixer_option = {
    browsers: ['last 2 versions'],
    cascade : false
};

var htmlmin_option = {
    collapseWhitespace  : true,
    conservativeCollapse: true,
    removeComments      : true
};

var connect_option = {
    root: 'dist/'
};

var rename_option = {
    suffix: '.min'
}

// compile scss
gulp.task('sass', function() {
    'use strict';
    return gulp.src('src/scss/styles.scss')
               .pipe(sass(sass_option))
               .pipe(autoprefixer(autoprefixer_option))
               .pipe(gulp.dest('src/css/'));
});

// concat and minify css
gulp.task('css', ['sass'], function() {
    'use strict';
    return gulp.src(['src/css/*.css'])
               .pipe(rename(rename_option))
               .pipe(csso(csso_option))
               .pipe(gulp.dest('dist/css/'));
});

// concat and minify js
gulp.task('scripts', function() {
    'use strict';
    return gulp.src(['src/js/main.js'])
               .pipe(concat('app.min.js'))
               .pipe(uglify())
               .pipe(gulp.dest('dist/js/'));
});

// minify html
gulp.task('html', function() {
    'use strict';
    return gulp.src('src/**/*.html')
               .pipe(htmlmin(htmlmin_option))
               .pipe(gulp.dest('dist'));
});

//////////////////////////////////////////////

//run local server
gulp.task('connect', function() {
    'use strict';
    connect.server(connect_option);
});

// deploy task
gulp.task('deploy', function() {
    'use strict';
    return gulp.src('dist/**/*')
    .pipe(pages());
});

// build task
gulp.task('build', ['css',
                    'scripts',
                    'html']);