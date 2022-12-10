// const{src,dest,parallel,series,watch}=require("gulp")
// const browserSync = require("browser-sync").create()
// const concat = require("gulp-concat")
// const uglify = require("gulp-uglify-es").default
// const sass = require("gulp-sass")(require("sass"))
// const autoPrefixer = require("gulp-autoprefixer")
// const cleanCss = require("gulp-clean-css")
// const sourceMaps = require("gulp-sourcemaps")
// const imageMin = require("gulp-imagemin")
// const clean = require("gulp-clean")

// function cleanDist(){
//     return src("dist/*", {read: false})
//     .pipe(clean())
// }

// function browsersync(){
//     browserSync.init({
//         server: {baseDir: "./"},
//         notify: false, 
//         online: true,
//     })
// }

// function scripts(){
// return src("src/js/*.js")
// .pipe(concat("src.min.js"))
// .pipe(uglify())
// .pipe(dest("dist/js/"))
// .pipe(browserSync.stream())
// }

// function styles(){
//     return src("src/sass/*.scss")
//     .pipe(sourceMaps.init())
//     .pipe(sass())
//     .pipe(sourceMaps.write())
//     .pipe(concat("src.min.css"))
//     .pipe(autoPrefixer({overrideBrowserslist: ["last 10 versions"]}))
//     .pipe(cleanCss({level: {1: {specialComments: 0}}}))
//     .pipe(dest("dist/css/"))
//     .pipe(browserSync.stream())
// }

// function images(){
//     return src("src/images/**/*")
//     .pipe(imageMin())
//     .pipe(dest("dist/images/"))
//     .pipe(browserSync.stream())
// }

// function startWatch(){
// browsersync()
// watch("src/**/*.sccs").on("change", series(styles, browserSync.reload))
// watch("src/**/*.js").on("change", series(scripts, browserSync.reload))
// watch("src/**/**").on("change", series(images, browserSync.reload))
// watch("./index.html").on("change", browserSync.reload)
// }

// exports.dev = series(cleanDist, parallel(styles, images, scripts), startWatch)
// exports.build = series(cleanDist, styles, images, scripts)


import gulp from 'gulp';
import clean from 'gulp-clean';
import autoprefixer from 'gulp-autoprefixer';
import cleanCSS from 'gulp-clean-css';
import concat from 'gulp-concat';
import minify from 'gulp-minify';

import BS from 'browser-sync';
const browserSync = BS.create();

import gulpSass from 'gulp-sass';
import dartSass from 'sass';
const sass = gulpSass(dartSass);

gulp.task('clean', () => gulp.src(['dist/css/*', 'dist/js/*'], {read: false}).pipe(clean()));
gulp.task('buildCss', () => gulp.src('src/sass/*', {allowEmpty: true})
  .pipe(sass())
  .pipe(autoprefixer({cascade: false}))
  .pipe(cleanCSS({compatibility: 'ie8'}))
  .pipe(concat('styles.min.css'))
  .pipe(gulp.dest('dist/css')));

gulp.task('buildJs', () => gulp.src('src/js/*', {allowEmpty: true})
  .pipe(concat('scripts.js'))  
  .pipe(minify({ext:{min: '.min.js'}}))
  .pipe(gulp.dest('dist/js')));

gulp.task('buildImg', () => gulp.src('src/images/*', {allowEmpty: true})
  .pipe(gulp.dest('dist/img')));

gulp.task('build', gulp.series('clean', 'buildCss', 'buildJs', 'buildImg'));

gulp.task('dev', () => {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
  gulp.watch(['src/**/*', 'index.html']).on('change', gulp.series('clean', 'buildCss', 'buildJs', /*'buildImg'*/ browserSync.reload));
});