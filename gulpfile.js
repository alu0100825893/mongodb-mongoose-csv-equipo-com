var gulp    = require('gulp'),
    gutil   = require('gulp-util'),
    uglify  = require('gulp-uglify'),
    concat  = require('gulp-concat');
var del     = require('del');
var minifyHTML = require('gulp-minify-html');
var minifyCSS  = require('gulp-minify-css');
var karma   = require('gulp-karma');
var ghPages = require('gulp-gh-pages');

gulp.task('minify', function () {
  gulp.src('./js/*.js')
  .pipe(uglify())
  .pipe(gulp.dest('./minified/'));

  gulp.src('./index.html')
    .pipe(minifyHTML())
    .pipe(gulp.dest('./minified/'))

  gulp.src('./css/*.css')
   .pipe(minifyCSS({keepBreaks:true}))
   .pipe(gulp.dest('./minified/'))
});

gulp.task('tests', function() {
  // Retornar el stream
  return gulp.src([])
    .pipe(karma({
      configFile: 'karma.conf.js',
      action: 'run'
    }))
    .on('error', function(err) {
      // En caso de fallar los tests, lanzar un error.
      throw err;
    });
});

gulp.task('deploy', function() {
	return gulp.src('./minified/**/*')
	.pipe(ghPages());
});

gulp.task('clean', function(cb) {
  del(['minified/*'], cb);
});