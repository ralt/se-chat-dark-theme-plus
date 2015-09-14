var gulp = require('gulp'),
	babel = require('gulp-babel'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	sass = require('gulp-sass'),
	cssmin = require('gulp-cssmin'),
	replace = require('gulp-replace');


gulp.task('default', function() {
	return gulp.start('scripts','styles');
});

gulp.task('scripts', function() {
	return gulp.src(['src/js/polyfills/*.js', 'src/js/watcher.babel.js', 'src/js/parsers/*.babel.js'])
			.pipe(concat('script.js'))
			.pipe(babel())
			.pipe(uglify())
			.pipe(gulp.dest('dist'));
});

gulp.task('styles', function() {
	return gulp.src(['src/css/variables.sass', 'src/css/*.sass'])
			.pipe(concat('style.css'))
			.pipe(sass().on('error', sass.logError))
			.pipe(replace(/;/g, ' !important;')) // because adding this in manually would be lame.
			.pipe(cssmin())
			.pipe(gulp.dest('dist'));
});