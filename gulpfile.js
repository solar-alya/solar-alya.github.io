var gulp = require('gulp'),
	sass = require('gulp-sass'),
	jade = require('gulp-jade');

gulp.task('jade', function() {
	gulp.src('gulp/*.jade')
	.pipe(jade({pretty: true}))
	.pipe(gulp.dest('./'));
});

gulp.task('sass', function () {
	return gulp.src('gulp/sass/*.scss')
	.pipe(sass().on('error', sass.logError))
	.pipe(gulp.dest('css'));
});

gulp.task('watch', function() {
	gulp.watch('./gulp/*.jade', ['jade']);
	gulp.watch('./gulp/includes/*.jade', ['jade']);
	gulp.watch('./gulp/sass/*.scss', ['sass']);

});

gulp.task('default', ['watch']);

/*
sudo npm install --save-dev gulp-install  gulp
sudo npm install --save-dev gulp-install  gulp-jade
sudo npm install --save-dev gulp-install  gulp-sass
*/
