var gulp = require('gulp'),
	sass = require('gulp-sass'),
	csso = require('gulp-csso'),
	jade = require('gulp-jade');

gulp.task('jade', function() {
	gulp.src('gulp/*.jade')
	.pipe(jade({pretty: true}))
	.pipe(gulp.dest('./'));
});

gulp.task('sass', function () {
	return gulp.src('gulp/sass/*.scss')
	.pipe(sass().on('error', sass.logError))
	.pipe(gulp.dest('./css')).pipe(csso())
	.pipe(gulp.dest('css'));
});

gulp.task('watch', function() {
	gulp.watch('./gulp/*.jade', ['jade']);
	gulp.watch('./gulp/includes/*.jade', ['jade']);
	gulp.watch('./gulp/sass/*.scss', ['sass']);
	gulp.watch('./gulp/sass/includes/*.scss', ['sass']);
});

gulp.task('default', ['watch']);
