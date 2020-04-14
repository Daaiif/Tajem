const gulp = require('gulp');
const gulpConcat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const del = require('del');
const imagemin = require('gulp-imagemin');
const svgSprite = require('gulp-svg-sprite');
const svgmin = require('gulp-svgmin');
const cheerio = require('gulp-cheerio');
const replace = require('gulp-replace');
const browserSync = require('browser-sync').create();



// Style task
gulp.task('styles', () => {
    return gulp.src('./src/scss/main.scss')
    .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulpConcat('style.css'))
        .pipe(cleanCSS({
            level: 2
        }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./build/css'))
    .pipe(browserSync.stream());
});
// JavaScript task
gulp.task('js', () => {
    return gulp.src('./src/js/*.js')
    .pipe(sourcemaps.init())
        .pipe(gulpConcat('main.js'))
        .pipe(uglify({
            toplevel: true
        }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./build/js'))
    .pipe(browserSync.stream());
});
// Del task
gulp.task('del', () => {
    return del(['build/*'])
});
// Img compress task
gulp.task('img-compress', () => {
    return gulp.src('./src/img/**')
        .pipe(imagemin({
            progressive: true
        }))
    .pipe(gulp.dest('./build/img'))
})

gulp.task('svg', () => {
    return gulp.src('./src/img/**/*.svg')
        .pipe(svgmin({
          js2svg: {
            pretty: true
          }
        }))
        .pipe(cheerio({
          run: function ($) {
            $(`[fill]`).removeAttr('fill');
            $('[stroke]').removeAttr('stroke');
            $('[style]').removeAttr('style');
          },
          parserOptions: {xmlMode: true}
        }))
        .pipe(replace('&gt;', '>'))
        // build svg sprite
        .pipe(svgSprite({
          mode: {
            symbol: {
              sprite: "sprite.svg"
            }
          }
        }))
        .pipe(gulp.dest('build/img'));
  });

// Watch task
gulp.task('watch', () => {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch('./src/img/**', gulp.series('img-compress'))
    gulp.watch('./src/scss/**/*.scss', gulp.series('styles'))
    gulp.watch('./src/css/**/*.css', gulp.series('styles'))
    gulp.watch('./src/js/**/*.js', gulp.series('js'))
    gulp.watch('./src/img/**/*.svg', gulp.series('svg'))
    gulp.watch("./*.html").on('change', browserSync.reload);
});
// Default task
gulp.task('default', gulp.series('del', gulp.parallel('styles', 'js', 'img-compress', 'svg'), 'watch'));