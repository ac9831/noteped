var gulp = require('gulp');
var webserver = require('gulp-webserver');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minifyhtml = require('gulp-minify-html');
var sass = require('gulp-sass');
var livereload = require('gulp-livereload');
var mocha = require('gulp-mocha');
var nodemon = require('gulp-nodemon')

var src = 'public';
var dist = 'public/dist';

var paths = {
    js: src + '/javascripts/*.js',
    scss: src + '/stylesheets/*.css',
    html: '/views/*.html',
    test : 'test/**/*.js'
};

gulp.task('uglify', function(){
    return gulp.src(paths.js)
        .pipe(uglify())
        .pipe(gulp.dest(dist));
});



gulp.task('watch', function(){
    livereload.listen();
    gulp.watch(paths.js,['uglify']);
});


gulp.task('start', function(){

    nodemon({
        script: 'bin/www',
        ext: 'js css html',
        tasks : ['uglify'],
        watch: ['public/javascripts/*.js','domain/*.js','routes/*.js']
    });



})


gulp.task('test', function() {
    return gulp.src([paths.test], {read: false})
        .pipe(mocha({
            reporter: 'spec'
        }));
});

gulp.task('default',['start']);