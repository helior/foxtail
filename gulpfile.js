"use strict";

/**
 * Gulp task definitions.
 */

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var merge = require('merge-stream');
var nodemon = require('gulp-nodemon');
var react = require('gulp-react');
var stylish = require('jshint-stylish');
var tasks = require('gulp-task-listing');
var webpack = require('gulp-webpack');

var compass = require('gulp-compass');
var paths = require('compass-options').paths();
var autoprefixer = require('gulp-autoprefixer');

/******************************************************************************/
/* Utility */
/******************************************************************************/
gulp.task('default', tasks);

var jsFileStream = (function() {
  var js = gulp.src("./*.js");
  var jsx = gulp.src('./routes/**/*.jsx').pipe(react());

  return merge(js, jsx);
})();

/******************************************************************************/
/* Testing */
/******************************************************************************/
gulp.task('lint', function () {
  jsFileStream
    .pipe(jshint())
    .pipe(jshint.reporter(stylish))
    .pipe(jshint.reporter('fail'));
});

gulp.task('test', ['lint']);

/******************************************************************************/
/* Styles */
/******************************************************************************/
gulp.task('compass', function () {
  return gulp.src(paths.sass + '/**/*.scss')
    .pipe(compass({
      config_file: 'config.rb',
      bundle_exec: true,
      sourcemap: false,
      time: true,
      css: paths.css,
      sass: paths.sass,
      image: paths.img
    }))
    .on('error', function() {
      // Compass prints the error, so only have to log that we handled it.
      console.log('Error caught. Continuing...');
      this.emit('end');
    })
    .pipe(gulp.dest(paths.css));
});

gulp.task('css', ['compass'], function () {
  return gulp.src(paths.css + '/main.css')
    .pipe(autoprefixer('last 2 versions', '> 5%'))
    .pipe(gulp.dest(paths.css));
});

gulp.task('watch', function () {
  gulp.watch(paths.sass + '/**/*.scss', ['css']);
});

/******************************************************************************/
/* Compiling */
/******************************************************************************/
gulp.task('webpack', function() {
  return gulp.src('browser.js')
  .pipe(webpack(require('./webpack.config.js')))
  .pipe(gulp.dest('.'));
});

gulp.task('build', ['test', 'webpack']);

/******************************************************************************/
/* Serving */
/******************************************************************************/
gulp.task('serve', function () {
  var env = process.env.NODE_ENV || 'local';
  var opts = {
    script: 'server.js',
    ext: 'js jsx',
    ignore: ['public/*'],
    env: {
      NODE_ENV: env
    }
  };
  nodemon(opts)
    .on('start', ['build'])
    .on('change', ['build'])
    .on('restart', function () {
      console.log('restarted!');
    });
});

gulp.task('default', ['serve', 'watch']);
