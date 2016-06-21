var gulp = require('gulp');
var minifycss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var usemin = require('gulp-usemin');
var stylish = require('jshint-stylish');
var minifyhtml = require('gulp-minify-html');
var livereload = require('gulp-livereload');
var mocha = require('gulp-mocha');
var rev = require('gulp-rev');
var nodemon = require('gulp-nodemon')
var ngannotate = require('gulp-ng-annotate');
var del = require('del');

var src = 'public';
var dist = 'public/dist';

var paths = {
    js: src + '/javascripts/*.js',
    scss: src + '/stylesheets/*.css',
    html: '/views/*.html',
    test : 'test/**/*.js'
};

// Clean
gulp.task('clean', function() {
    return del([dist]);
});


gulp.task('jshint', function() {
    return gulp.src(paths.js)
        .pipe(jshint())
        .pipe(jshint.reporter(stylish));
});

gulp.task('usemin',['jshint'], function () {
    return gulp.src('views/*.html')
        .pipe(usemin({
            css:[minifycss(),rev()],
            js: [ngannotate(),uglify(),rev()]
        }))
        .pipe(gulp.dest('public/dist/'));
});

gulp.task('copyfonts', ['clean'], function() {
    gulp.src('./bower_components/bootstrap/dist/fonts/**/*.{ttf,woff,eof,svg}*')
        .pipe(gulp.dest('public/dist/fonts'));
});


gulp.task('watch', function(){
    livereload.listen();
    gulp.watch(paths.js,['uglify']);
});




gulp.task('start', function(){

    nodemon({
        script: 'bin/www',
        ext: 'js css html',
        watch: ['public/javascripts/*.js','domain/*.js','routes/*.js','app.js']
    });

})


gulp.task('test', function() {
    return gulp.src([paths.test], {read: false})
        .pipe(mocha({
            reporter: 'spec'
        }));
});

gulp.task('default',['clean','usemin','copyfonts','start']);