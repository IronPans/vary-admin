const gulp = require('gulp');
const cleanCSS = require('gulp-clean-css');
const less = require('gulp-less');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');

// 编译less
gulp.task('css', function () {
    gulp.src('./src/styles/index.less')
        .pipe(less())
        .pipe(autoprefixer({
            browsers: [
                'last 2 versions',
                'Firefox ESR',
                '> 1%',
                'ie >= 9',
                'iOS >= 8',
                'Android >= 4'
            ]
        }))
        .pipe(cleanCSS())
        .pipe(rename('vary-ui.css'))
        .pipe(gulp.dest('./build/styles'));
});

gulp.task('default', ['css']);