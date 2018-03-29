const gulp = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass');
const plumber = require('gulp-plumber');

// Compile Sass && Inject into browser
gulp.task('sass', () => {
  return gulp.src([
    'src/sass/**/*.scss'
  ])
  .pipe(plumber()) // Handle errors
  .pipe(sass({errLogToConsole: true}))
  .on('error', catchErr) // Catch the error
  .pipe(sass()) // Compile
  .pipe(gulp.dest('css')) // Send CSS archives for this directory
  .pipe(browserSync.stream()); // Open browser with browser-sync
});

function catchErr(e) {
  console.log(e.formatted);
  this.emit('end');
}

// Move JS Files to js
// TODO: Minify JS
gulp.task('js', () => {
  return gulp.src([
    // 'path_to_file'
  ])
  .pipe(gulp.dest('js')) // Send JS archives for this directory
  .pipe(browserSync.stream()); // Open browser with browser-sync
});

//Watch Sass && Server
gulp.task('serve', ['sass'], () => {
  browserSync.init({
      server: './'
  });

  gulp.watch(['src/sass/**/*.scss'],['sass']); // Watch all sass files
  gulp.watch('*.html').on('change', browserSync.reload); // Watch all html files.
})

//Default gulp
gulp.task('default', ['js','serve']);
