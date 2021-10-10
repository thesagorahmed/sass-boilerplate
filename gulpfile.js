const { src, dest, watch, series } = require('gulp')
const sass = require('gulp-sass')(require('sass'));
const terser = require('gulp-terser');
const browsersync = require('browser-sync').create();

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

// Browsersync
function browserSyncServe(cb) {
  browsersync.init({
    server: {
      baseDir: '.',
    },
    notify: {
      styles: {
        top: 'auto',
        bottom: '0',
      },
    },
  });
  cb();
}
function browserSyncReload(cb) {
  browsersync.reload();
  cb();
}
  
function watchTask() {
  watch('*.html', browserSyncReload);
  watch(['app/scss/**/*.scss', 'app/js/*.js'], jsTask, buildStyles, browserSyncReload)
}

exports.default = series(buildStyles, jsTask, watchTask, browserSyncServe)
