'use strict';
let project = '1'; //project name

let block = { //block numbers, where 0 - do not use
    header: '1',
    firstScreen: '1',
    advantages: '10',
    team: '1',
    catalog: '2',
    blog: '1',
    comment: '2',
    form: '1',
    gallery: '10',
    info: '3',
    footer: '1'
};

const path = {
    template: 'template',
    header: 'blocks/1_header/',
    firstScreen: 'blocks/2_firstscreen/',
    advantages: 'blocks/3_advantages/',
    team: 'blocks/4_team/',
    catalog: 'blocks/5_catalog/',
    blog: 'blocks/6_blog/',
    comment: 'blocks/7_comment/',
    form: 'blocks/8_form/',
    gallery: 'blocks/9_gallery/',
    info: 'blocks/10_info/',
    footer: 'blocks/11_footer/'
};

const gulp = require('gulp'),
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
    return gulp.src([
        path.template + '/**',
        path.header + block.header + '/**',
        path.firstScreen + block.firstScreen + '/**',
        path.advantages + block.advantages + '/**',
        path.team + block.team + '/**',
        path.catalog + block.catalog + '/**',
        path.blog + block.blog + '/**',
        path.comment + block.comment + '/**',
        path.form + block.form + '/**',
        path.gallery + block.gallery + '/**',
        path.info + block.info + '/**',
        path.footer + block.footer + '/**'
    ])
        .pipe(gulp.dest('src/' + project + '/' ))
});

// Cleangulp
gulp.task('clean', function () {
    return gulp.src('dist/' + project , {read: false})
        .pipe(clean())
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