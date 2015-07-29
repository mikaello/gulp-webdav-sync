var debug = require( 'gulp-debug' )
var dav = require( './index.js' )
var gulp = require( 'gulp' )
var jscs = require( 'gulp-jscs' )
var jshint = require( 'gulp-jshint' )
var npmconf = require( 'npmconf' )
var runSequence = require( 'run-sequence' )
var stylish = require( 'jshint-stylish' )

gulp.task( 'default', [ 'int-test' ] )
gulp.task( 'src-test', [ 'jshint', 'jscs' ] )

gulp.task( 'int-test', function ( callback ) {
  runSequence( 'npm.load', 'debug', callback )
} )

gulp.task( 'npm.load', function ( callback ) {
  if ( !npmconf.loaded ) {
    npmconf.load( null, function () {
      callback()
    } )
  }
} )

gulp.task( 'debug', function () {
  return gulp.src( 'test/assets/**' )
    .pipe( debug( { title: 'pre' } ) )
    .pipe( dav( { 'log': 'info', 'parent': 'test/assets' } ) )
    .pipe( debug( { title: 'post' } ) )
} )

gulp.task( 'jshint', function () {
  // http://jshint.com/docs/options/
  var options = {
    asi: true
    , browser: true
    , curly: true
    , esnext: true
    , indent: 2
    , jquery: false
    , laxbreak: true
    , laxcomma: true
    , newcap: true
    , node: true
  }
  return gulp.src( [ '*.js', 'test/*.js' ] )
    .pipe( jshint( options ) )
    .pipe( jshint.reporter( 'jshint-stylish' ) )
} )

gulp.task( 'jscs', function () {
  // http://jscs.info/rules.html
  return gulp.src( [ '*.js', 'test/*.js' ] )
    .pipe( jscs() )
} )
