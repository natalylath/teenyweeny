'use strict';

var gulp = require('gulp'),
    watch = require('gulp-watch'),
    sass = require('gulp-sass'),
    rigger = require('gulp-rigger'),
    browserSync = require("browser-sync"),
    reload = browserSync.reload;

var path = {
    build: {
        html: 'build/',
        fonts: 'build/static/fonts/',
        css: 'build/static/css/',
        js: 'build/static/js/',
        js_my: 'build/static/js/',
        img: 'build/static/images/'

    },
    src: {
        html: 'templates/*.html',
        fonts: 'static/fonts/**/*.*',
        css: 'static/css/**/*.css',
        scss: 'static/scss/style.scss',
        js: 'static/js/libs/*.js',
        js_my: 'static/js/script.js',
        img: 'static/images/**/*.*'
    },
    watch: {
        html: 'templates/**/*.html',
        fonts: 'static/fonts/**/*.*',
        css: 'static/css/**/*.css',
        scss: 'static/scss/**/*.scss',
        js: 'static/js/libs/*.js',
        js_my: 'static/js/**/*.js',
        img: 'static/images/**/*.*'
    },
    clean: './build'
};

var config = {
    server: {
        baseDir: "./build"
    },
    tunnel: true,
    host: 'localhost',
    port: 9000,
    logPrefix: "Frontend_Devil"
};

gulp.task('webserver', function () {
    browserSync(config);
});

gulp.task('html:build', function () {
    gulp.src(path.src.html)
        .pipe(rigger())
        .pipe(gulp.dest(path.build.html))
        .pipe(reload({stream: true}));
});

gulp.task('fonts:build', function() {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
        .pipe(reload({stream: true}));
});

gulp.task('css:build', function () {
    gulp.src(path.src.css)
        .pipe(gulp.dest(path.build.css))
        .pipe(reload({stream: true}));
});

gulp.task('scss:build', function () {
    gulp.src(path.src.scss)
        .pipe(sass())
        .pipe(gulp.dest(path.build.css))
        .pipe(reload({stream: true}));
});

gulp.task('js:build', function () {
    gulp.src(path.src.js)
        .pipe(rigger())
        .pipe(gulp.dest(path.build.js))
        .pipe(reload({stream: true}));
});

gulp.task('js_my:build', function () {
    gulp.src(path.src.js_my)
        .pipe(rigger())
        .pipe(gulp.dest(path.build.js_my))
        .pipe(reload({stream: true}));
});

gulp.task('image:build', function () {
    return gulp
        .src(path.src.img)
        .pipe(gulp.dest(path.build.img))
        .pipe(reload({stream: true}));
});

gulp.task('build', [
    'html:build',
    'fonts:build',
    'css:build',
    'scss:build',
    'js:build',
    'js_my:build',
    'image:build'
]);

gulp.task('watch', function(){
    watch([path.watch.html], function(event, cb) {
        gulp.start('html:build');
    });
    watch([path.watch.fonts], function(event, cb) {
        gulp.start('fonts:build');
    });
    watch([path.watch.css], function(event, cb) {
        gulp.start('css:build');
    });
    watch([path.watch.scss], function(event, cb) {
        gulp.start('scss:build');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('js:build');
    });
    watch([path.watch.js_my], function(event, cb) {
        gulp.start('js_my:build');
    });
    watch([path.watch.img], function(event, cb) {
        gulp.start('image:build');
    });
});

gulp.task('default', ['build', 'watch']);
//gulp.task('default', ['build', 'webserver', 'watch']);
