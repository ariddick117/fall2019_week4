// Workflow is as follows: install the package using "npm i -D"
// refer to the package as a constant below

const gulp = require('gulp');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const nano = require('cssnano'); // Allows you to minify your css file
const prefixer = require('autoprefixer'); // Adds prefixes for browsers (-o, -moz etc.)

// Include our imagemin library
const imagemin = require('gulp-imagemin');

// define some common tasks for Gulp to run

// like compile and minify SASS files:
function compile(done) {
    gulp.src('./sass/**/*.scss')
        .pipe(sass())
        .on('error', sass.logError)
        .pipe(postcss([prefixer(), nano()])) // minifies the css using nano
        .pipe(gulp.dest('./css'))
        done()
}

// minify every image (by size)
function squashImages(done) {
    gulp.src('./images/**') // ** means a wildcard. Not specifying extensions because we want it all
    .pipe(imagemin()) // pipe through the package we installed
    .pipe(gulp.dest('./dist/images')) // save them out to this destination folder
    done()
 }

exports.compile = compile; 
// this allows you to link scss and css files with a command line statement "gulp compile"

exports.squash = squashImages;
// refers to the function and allows gulp to export