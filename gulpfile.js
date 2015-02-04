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
