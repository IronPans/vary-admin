import gulp from 'gulp'
import less from 'gulp-less'
import sourcemaps from 'gulp-sourcemaps'
import stripCssComments from 'gulp-strip-css-comments'
import header from 'gulp-header'
import rename from 'gulp-rename'
import uglifycss from 'gulp-uglifycss'
import cssmin from 'gulp-cssmin'
import autoprefixer from 'gulp-autoprefixer'
// import pkg from './package.json'
// import loadPlugins from 'gulp-load-plugins'

// const gulp = require('gulp')
// const less = require('gulp-less')
// const sourcemaps = require('gulp-sourcemaps')
// const stripCssComments = require('gulp-strip-css-comments')
// const header = require('gulp-header')
// const rename = require('gulp-rename')
// const uglifycss = require('gulp-uglifycss')
// const cssmin = require('gulp-cssmin')
// const autoprefixer = require('gulp-autoprefixer')
// const pkg = require('./package.json')
// const loadPlugins = require('gulp-load-plugins')
// const $ = loadPlugins()
const pkg = {}
const paths = {
  styles: {
    src: ['src/base/styles/themes/**/*.less'],
    dest: './build/themes'
  }
}

const banner = [
  '/**',
  ' * <%= pkg.name %> - <%= pkg.description %>',
  ' * @author <%= pkg.author %>',
  ' * @version v<%= pkg.version %>',
  ' * @link <%= pkg.homepage %>',
  ' * @license <%= pkg.license %>',
  ' */',
  ''
].join('\n')

const buildStyles = function () {
  return (
    gulp
      .src(paths.styles.src)
      .pipe(sourcemaps.init())
      .pipe(less())
      // 去掉css注释
      .pipe(stripCssComments())
      .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
      .pipe(sourcemaps.write())
      .pipe(header(banner, { pkg: pkg }))
      .pipe(gulp.dest(paths.styles.dest))
      .pipe(rename({ suffix: '.min' }))
      .pipe(uglifycss({ uglyComments: true }))
      .pipe(cssmin())
      .pipe(header(banner, { pkg: pkg }))
      .pipe(gulp.dest(paths.styles.dest))
  )
}

// gulp.series：按照顺序执行
// gulp.paralle：可以并行计算
const build = gulp.series(buildStyles, (done) => done())

export default build

// gulp.task('build-themes', () => {
//   return (
//     gulp
//       .src(paths.styles.src)
//       .pipe(sourcemaps.init())
//       .pipe(less())
//       // 去掉css注释
//       .pipe(stripCssComments())
//       .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
//       .pipe(sourcemaps.write())
//       .pipe(header(banner, { pkg: pkg }))
//       .pipe(gulp.dest(paths.styles.dest))
//       .pipe(rename({ suffix: '.min' }))
//       .pipe(uglifycss({ uglyComments: true }))
//       .pipe(cssmin())
//       .pipe(header(banner, { pkg: pkg }))
//       .pipe(gulp.dest(paths.styles.dest))
//   )
// })

// gulp.series：按照顺序执行
// gulp.paralle：可以并行计算
// gulp.task(
//   'build',
//   gulp.series('build-themes', (done) => done()),
//   (done) => done()
// )

// 监听任务时先执行一次编译
// gulp.task(
//   'default',
//   gulp.series(['build'], (done) => done()),
//   (done) => {
//     console.log('Finished!')
//     done()
//   }
// )
