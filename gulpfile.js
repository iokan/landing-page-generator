'use strict';
var project = '1', //project name
    header = '1',
    footer = '1';

var gulp = require('gulp'),
    gutil = require('gulp-util'),
    clean = require('gulp-clean'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    prefix = require('gulp-autoprefixer'),
    changed = require('gulp-changed'),
    imagemin = require('gulp-imagemin'),
    concat = require('gulp-concat'), //merging js
    uglify = require('gulp-uglify'), //min js
    rename = require('gulp-rename'),
    filesize = require('gulp-filesize'),
    rigger = require('gulp-rigger'),
    watch = require('gulp-watch');

// Take
gulp.task('take', function(){
    return gulp.src(['blocks/2_header/' + header + '/*', 'blocks/11_footer/' + footer + '/*'])
        .pipe(gulp.dest('src/' + project + '/' ))
});

// Cleangulp
gulp.task('clean', function () {
    return gulp.src('dist/' + project , {read: false})
        .pipe(clean());
});

// Html
gulp.task('html', function() {
    return gulp.src(['src/' + project + '/*.html', '!src/' + project + '/_*.html'])
        .pipe(rigger())
        .pipe(gulp.dest('dist/' + project + '/' ))
});

// Compilation css
gulp.task('sass', function (){
    return gulp.src('src/' + project + '/sass/*.scss')
        .pipe(filesize())
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(prefix({
            overrideBrowserslist: ['last 5 versions'],
            cascade: false
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('dist/' + project + '/css'))
        .pipe(filesize())
});

// Fonts
gulp.task('fonts', function() {
    return gulp.src('src/' + project + '/fonts/*')
        .pipe(changed('dist/' + project + '/fonts'))
        .pipe(gulp.dest('dist/' + project + '/fonts'))
});

// Merge and min js
gulp.task('vendor', function() {
    return gulp.src('src/' + project + '/js/*.js')
        .pipe(concat('vendor.js'))
        .pipe(changed('dist/' + project + '/js'))
        .pipe(gulp.dest('dist/' + project + '/js'))
        .pipe(filesize())
        .pipe(uglify())
        .pipe(rename('vendor.min.js'))
        .pipe(gulp.dest('dist/' + project + '/js'))
        .pipe(filesize())
        .on('error', gutil.log)
});

// Optimized img
gulp.task('img', () =>
    gulp.src('src/' + project + '/img/*')
        .pipe(changed('dist/' + project + '/img'))
        .pipe(filesize())
        .pipe(imagemin({
            optimizationLevel: 5,
            progressive: true,
            interlaced: true
        }))
        .pipe(gulp.dest('dist/' + project + '/img'))
        .pipe(filesize())
);

// Optimized img доп
gulp.task('img+', () =>
    gulp.src('src/' + project + '/img/page-swipe/*')
        .pipe(changed('dist/' + project + '/img/page-swipe'))
        .pipe(filesize())
        .pipe(imagemin({
            optimizationLevel: 5,
            progressive: true,
            interlaced: true
        }))
        .pipe(gulp.dest('dist/' + project + '/img/page-swipe'))
        .pipe(filesize())
);

//included files
gulp.task('include', () =>
    gulp.src('src/'+ project + '/include/*.css')
        .pipe(changed('dist/'+ project + '/include'))
        .pipe(gulp.dest('dist/'+ project + '/include')),
    gulp.src('src/'+ project + '/include/*.js')
        .pipe(changed('dist/'+ project + '/include'))
        .pipe(gulp.dest('dist/'+ project + '/include'))
);

// Watch
gulp.task('watch', function (){
    gulp.watch(['src/' + project + '/*.html', 'src/' + project + '/_*.html'], gulp.series('html'));
    gulp.watch('src/' + project + '/sass/*.scss', gulp.series('sass'));
    gulp.watch('src/' + project + '/js/*.js', gulp.series('vendor'));
    gulp.watch('src/' + project + '/include/*.js', gulp.series('include'));
    gulp.watch('src/' + project + '/fonts/*', gulp.series('fonts'));
    gulp.watch('src/' + project + '/img/*', gulp.series('img'));
    gulp.watch('src/' + project + '/img/page-swipe/*', gulp.series('img+'));
});

gulp.task('build', gulp.series('html', 'sass', 'fonts', 'vendor', 'img', 'img+', 'include'));