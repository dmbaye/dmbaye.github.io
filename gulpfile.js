const gulp = require('gulp');
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');
const browserify = require('browserify');
const browserSync = require('browser-sync').create();

gulp.task('serve', ['sass'], () => {
  browserSync.init({
    server: './'
  });

  // gulp.watch('./src/js/*.js', ['js-watch']);
  gulp.watch('./src/scss/app.scss', ['sass']).on('change', browserSync.reload);
  gulp.watch('./*.html').on('change', browserSync.reload);
});

// gulp.task('js', () => {
//   return gulp.src('./src/js/*.js')
//     .pipe(browserify())
//     .pipe(uglify())
//     .pipe(gulp.dest('./dist/js'));
// });

// gulp.task('js-watch', ['js'], (done) => {
//   browserSync.reload();
//   done();
// });

gulp.task('sass', () => {
  return gulp.src('./src/scss/app.scss')
    .pipe(sass({ outputStyle: 'compressed' })
      .on('error', (err) => {
        console.log(`Error: ${err.message}`);
      }))
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);
