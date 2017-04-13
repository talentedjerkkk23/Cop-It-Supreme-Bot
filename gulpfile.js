const gulp = require('gulp');
const concat = require('gulp-concat');
const htmlmin = require('gulp-htmlmin');
const cleanCSS = require('gulp-clean-css');
const crx = require('gulp-crx-pack');
const fs = require('fs');

gulp.task('js', function() {
	var jsTasks = {}
	jsTasks['supreme'] = gulp.src(`src/js/supreme/*.js`).pipe(concat(`supreme.js`)).pipe(gulp.dest('dist/dist/js'))
	jsTasks['settings'] = gulp.src(`src/js/settings/*.js`).pipe(concat(`settings.js`)).pipe(gulp.dest('dist/dist/js'))
	jsTasks['background'] = gulp.src(`src/js/background/*.js`).pipe(concat(`background.js`)).pipe(gulp.dest('dist/dist/js'))
	jsTasks['other'] = gulp.src('src/js/*.js').pipe(gulp.dest('dist/dist/js'))

	return jsTasks
})

gulp.task('html', function() {
  return gulp.src('src/html/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist/html'))
})

gulp.task('css', function() {
  return gulp.src('src/css/*.css')
    .pipe(cleanCSS())
    .pipe(gulp.dest('dist/dist/css'))
})

gulp.task('build', function() {
  return gulp.src('dist')
    .pipe(crx({
      privateKey: fs.readFileSync('./key/copit.pem', 'utf8'),
      filename: 'CopIt.crx'
    }))
    .pipe(gulp.dest('bin'));
})

gulp.task('default', ['js', 'html', 'css'])
