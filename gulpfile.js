const { src, dest, watch, series } = require('gulp')
const sass = require('gulp-sass')(require('sass'));
const terser = require('gulp-terser');

function buildStyles() {
  return src('app/scss/style.scss')
    .pipe(sass())
    .pipe(dest('dist'))
}

// JavaScript Task
function jsTask() {
    return src('app/js/script.js', { sourcemaps: true })
      
      .pipe(terser())
      .pipe(dest('dist', { sourcemaps: '.' }));
  }

  
function watchTask() {
  watch(['app/scss/**/*.scss', 'app/js/*.js'], jsTask, buildStyles)
}

exports.default = series(buildStyles, jsTask, watchTask)