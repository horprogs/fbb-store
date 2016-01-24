var gulp = require('gulp'),
    sass = require('gulp-sass'),
    prefix = require('gulp-autoprefixer'),
    browserSync = require('browser-sync'),
    imagemin = require('gulp-imagemin'),
    replace = require('gulp-replace'),
    rename = require('gulp-rename'),
    cache = require('gulp-cache'),
    del = require('del'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    cssnano = require('gulp-cssnano'),
    ngmin = require('gulp-ngmin'),
    runSequence = require('run-sequence');


gulp.task('sass', function () {
    return gulp.src('app/style/*.scss')
        .pipe(sass()) // Converts Sass to CSS with gulp-sass
        .pipe(gulp.dest('app/style'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task('prefix', function () {
    return gulp.src('app/style/*.css')
        .pipe(prefix())
        .pipe(gulp.dest('app/style'))
})


gulp.task('repFonts', function () {
    return gulp.src('app/fonts/*.*')
        .pipe(gulp.dest('build/fonts'))
})

gulp.task('repCss', function () {
    return gulp.src('app/style/*.css')
        .pipe(gulp.dest('build/css'))
})

gulp.task('minCss', function () {
    return gulp.src('app/style/*.css')
        .pipe(concat('styles.min.css'))
        .pipe(cssnano())
        .pipe(gulp.dest('build/css'))
})

gulp.task('minNg', function () {
    return gulp.src('app/js/app.js')
        .pipe(ngmin({dynamic: true}))
        .pipe(rename('app.min.js'))
        .pipe(gulp.dest('build/js'))
})

gulp.task('minJs', function () {
    return gulp.src('app/js/!app.js')
        .pipe(concat('scripts.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('build/js'))
})
gulp.task('concatJs', function () {
    return gulp.src('app/js/*.js')
        .pipe(concat('scripts.min.js'))
        .pipe(gulp.dest('build/js'))
})

gulp.task('repJs', function () {
    return gulp.src('app/js/*.js')
        .pipe(gulp.dest('build/js'))
})

gulp.task('repHtml', function () {
    return gulp.src('app/*.html')
        .pipe(gulp.dest('build'))
})

gulp.task('replaceLinks', function () {
    return gulp.src('build/**/*.*')
        .pipe(replace('style/', 'css/'))
        .pipe(gulp.dest('build'))
})

gulp.task('images', function () {
    return gulp.src('app/img/*.*')
        .pipe(imagemin({
         progressive: true
        }))
        .pipe(gulp.dest('build/img'))
});

gulp.task('watch', ['browserSync', 'sass'], function () {
    gulp.watch('app/style/*.scss', ['sass']);
    // Reloads the browser whenever HTML or JS files change
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/js/*.js', browserSync.reload);
});

gulp.task('browserSync', function () {
    browserSync({
        server: {
            baseDir: 'app'
        },
    })
});

gulp.task('clean:build', function () {
    return del.sync('build');
});

gulp.task('build', function (callback) {
    runSequence('clean:build', 'sass', 'prefix',
        ['images', 'repCss', 'repFonts', 'repJs', 'repHtml'], 'replaceLinks',
        callback
    )
})

gulp.task('build-min', function (callback) {
    runSequence('clean:build', 'sass', 'prefix',
        ['images', 'minCss', 'repFonts','repJs', 'repHtml'], 'replaceLinks',
        callback
    )
})

gulp.task('default', function (callback) {
    runSequence(['sass', 'browserSync', 'watch'],
        callback
    )
})