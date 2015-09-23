var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var rimraf = require('gulp-rimraf');
var rename = require('gulp-rename');

var mkdirp = require('mkdirp');
var runSequence = require('run-sequence');

var tempDir = 'temp';
var destDir = 'dist';

mkdirp.sync(tempDir);
mkdirp.sync(destDir);

gulp.task('pre-build-clean', function () {
  return gulp.src([tempDir, destDir], { read: false })
    .pipe(rimraf());
});

gulp.task('post-build-clean', function () {
  return gulp.src(tempDir, { read: false })
    .pipe(rimraf());
});

gulp.task('post-build-rename', function () {
  return gulp.src(tempDir + '/combined.js')
    .pipe(rename('combined.min.js'))
    .pipe(gulp.dest(destDir));
});

gulp.task('concatJs', function () {
  return gulp.src('js/*.js')
    .pipe(concat('combined.js'))
    .pipe(gulp.dest(tempDir));
});

gulp.task('uglifyJs', function () {
  return gulp.src(tempDir + '/combined.js')
    .pipe(uglify())
    .pipe(gulp.dest(tempDir));
});

gulp.task('default', function () {
  runSequence('pre-build-clean',
    'concatJs',
    'uglifyJs',
    // ['build-scripts', 'build-styles'],
    'post-build-rename',
    'post-build-clean',
    function () {
      console.log('Done running all tasks in sequence!');
    });
});
