const gulp = require('gulp');
const cleanCSS = require('gulp-clean-css');
const less = require('gulp-less');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const del = require('del');

const config = {
    themePath: './src/base/themes/',
    to: './src/assets/themes'
};

const themes = [
    './src/base/themes/*.less',
    '!./src/base/themes/_*.less'
];

// 生成主题
gulp.task('create:themes', function () {
    gulp.src(themes)
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
        .pipe(gulp.dest(config.to));
});

gulp.task('clean', function (cb) {
    del([config.to], cb);
});

gulp.task('default', ['clean', 'create:themes']);