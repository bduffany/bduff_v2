var gulp = require('gulp');

var jshint = require('gulp-jshint');
var compass = require('gulp-compass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

gulp.task('lint', function() {
    return gulp.src('js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('compass', function() {
    return gulp.src('static/css/*.scss')
        .pipe(compass({
            // config_file: './compass_config.rb',
            css: 'static/css',
            sass: 'static/css',
        }))
        .on('error', function(error) {
          // Would like to catch the error here
          console.log(error);
          this.emit('end');
        })
        .pipe(gulp.dest('static/css'));
});

gulp.task('scripts', function() {
    return gulp.src('static/js/*.js')
        .pipe(concat('all.js'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('static/js'));
});

gulp.task('watch', function() {
    gulp.watch('static/js/*.js', ['lint', 'scripts']);
    gulp.watch('static/css/*.scss', ['compass']);
});

gulp.task('default', ['lint', 'compass', /* 'scripts', */ 'watch']);
