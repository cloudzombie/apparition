var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglifyjs');

var config = {
  bowerDir: './bower_components',
  publicDir: './assets',
  srcDir:    './source',
};

gulp.task('fonts', function() {
  return gulp.src([
    config.bowerDir + '/bootstrap-sass/assets/fonts/**/*',
  ])
  .pipe(gulp.dest(config.publicDir + '/fonts'));
});

gulp.task('js', function() {
  return gulp.src([
    config.bowerDir + '/jquery/dist/jquery.min.js',
    config.bowerDir + '/bootstrap-sass/assets/javascripts/bootstrap.js',
    config.srcDir   + '/js/*.js',
  ])
  .pipe(uglify('app.js', {
    compress: false,
    outSourceMap: true,
  }))
  .pipe(gulp.dest(config.publicDir + '/js'));
});

gulp.task('css', function() {
  return gulp.src(config.srcDir + '/css/app.scss')
  .pipe(sourcemaps.init())
  .pipe(sass({
    outputStyle: 'compressed',
    includePaths: [config.bowerDir + '/bootstrap-sass/assets/stylesheets'],
  }))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest(config.publicDir + '/css'));
});


// Default task
gulp.task('watch', function() {
        gulp.watch(config.srcDir + '/css/custom/*.scss', ['css']);
        gulp.watch(config.srcDir   + '/js/*.js', ['js']);
});

gulp.task('default', ['css', 'js', 'fonts', 'watch']);
