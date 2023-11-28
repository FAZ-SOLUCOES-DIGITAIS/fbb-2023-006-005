'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');
var manifest = require('gulp-scorm-manifest');
var zip = require('gulp-zip');
var imagemin = require('gulp-tinypng');
//var wait = require('gulp-wait');

var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});

gulp.task('partials', function () {
  return gulp.src([
    path.join(conf.paths.src, '/app/**/*.html'),
    path.join(conf.paths.tmp, '/serve/app/**/*.html')
  ])
    .pipe($.htmlmin({
      removeEmptyAttributes: true,
      removeAttributeQuotes: true,
      collapseBooleanAttributes: true,
      collapseWhitespace: true
    }))
    .pipe($.angularTemplatecache('templateCacheHtml.js', {
      module: 'infi-cursos',
      root: 'app'
    }))
    .pipe(gulp.dest(conf.paths.tmp + '/partials/'));
});

gulp.task('html', ['inject', 'partials'], function () {
  var partialsInjectFile = gulp.src(path.join(conf.paths.tmp, '/partials/templateCacheHtml.js'), { read: false });
  var partialsInjectOptions = {
    starttag: '<!-- inject:partials -->',
    ignorePath: path.join(conf.paths.tmp, '/partials'),
    addRootSlash: false
  };

  var htmlFilter = $.filter('*.html', { restore: true });
  var jsFilter = $.filter('**/*.js', { restore: true });
  var cssFilter = $.filter('**/*.css', { restore: true });

  return gulp.src(path.join(conf.paths.tmp, '/serve/*.html'))
    .pipe($.inject(partialsInjectFile, partialsInjectOptions))
    .pipe($.useref())
    .pipe(jsFilter)
    .pipe($.sourcemaps.init())
    .pipe($.ngAnnotate())
    .pipe($.uglify({ preserveComments: $.uglifySaveLicense })).on('error', conf.errorHandler('Uglify'))
    .pipe($.rev())
    .pipe($.sourcemaps.write('maps'))
    .pipe(jsFilter.restore)
    .pipe(cssFilter)
    // .pipe($.sourcemaps.init())
    .pipe($.replace('../../bower_components/bootstrap-stylus/fonts/', '../fonts/'))
    .pipe($.cssnano())
    .pipe($.rev())
    // .pipe($.sourcemaps.write('maps'))
    .pipe(cssFilter.restore)
    .pipe($.revReplace())
    .pipe(htmlFilter)
    .pipe($.htmlmin({
      removeEmptyAttributes: true,
      removeAttributeQuotes: true,
      collapseBooleanAttributes: true,
      collapseWhitespace: true
    }))
    .pipe(htmlFilter.restore)
    .pipe(gulp.dest(path.join(conf.paths.dist, '/')))
    .pipe($.size({ title: path.join(conf.paths.dist, '/'), showFiles: true }));
  });

// Only applies for fonts from bower dependencies
// Custom fonts are handled by the "other" task
gulp.task('fonts', function () {
  return gulp.src($.mainBowerFiles().concat('bower_components/bootstrap-stylus/fonts/*'))
    .pipe($.filter('**/*.{eot,otf,svg,ttf,woff,woff2}'))
    .pipe($.flatten())
    .pipe(gulp.dest(path.join(conf.paths.dist, '/fonts/')));
});

gulp.task('other', function () {
  var fileFilter = $.filter(function (file) {
    return file.stat.isFile();
  });

  return gulp.src([
    path.join(conf.paths.src, '/**/*'),
    path.join('!' + conf.paths.src, '/**/*.{html,css,js,styl,db}')
  ])
    .pipe(fileFilter)
    .pipe(gulp.dest(path.join(conf.paths.dist, '/')));
});

gulp.task('otherfinal', function () {
  var fileFilter = $.filter(function (file) {
    return file.stat.isFile();
  });

  return gulp.src([
    path.join(conf.paths.src, '/**/*'),
    path.join('!' + conf.paths.src, '/**/*.{html,css,js,styl,db,jpg,png,jpeg}')
  ])
    .pipe(fileFilter)
    .pipe(gulp.dest(path.join(conf.paths.dist, '/')));
});

gulp.task('clean', function () {
  return $.del([path.join(conf.paths.dist, '/'), path.join(conf.paths.tmp, '/')]);
});

gulp.task('manifest', ['html', 'fonts', 'other', 'copyJS'], function() {
    return gulp.src('dist/**')
      .pipe(manifest({
        version: '1.2',
        courseId: 'infi-2023-003',
        SCOtitle: 'FEBRABAN - ESG',
        moduleTitle: 'FEBRABAN - ESG',
        launchPage: 'index.html',
        //path: 'dist',
        fileName: 'imsmanifest.xml'
      }))
      .pipe(gulp.dest('dist/'))
});

gulp.task('tinypng', ['html', 'fonts', 'otherfinal', 'copyJS'], function () {
  return gulp.src(path.join(conf.paths.src, '/**/*.{jpg,png,jpeg}'))
    //gulp.src('dist/**/*.{jpg,png,jpeg}', {base:"./"})
    .pipe(imagemin('QkTKaXh0eFrUOQ73hoqSsCIDI4GrgqYs'))
    .pipe(gulp.dest(path.join(conf.paths.dist, '/')));
});

gulp.task('manifestfinal', ['html', 'fonts', 'otherfinal', 'copyJS', 'tinypng'], function() {
    return gulp.src('dist/**')
      .pipe(manifest({
        version: '1.2',
        courseId: 'infi-2023-003',
        SCOtitle: 'FEBRABAN - ESG',
        moduleTitle: 'FEBRABAN - ESG',
        launchPage: 'index.html',
        //path: 'dist',
        fileName: 'imsmanifest.xml'
      }))
      .pipe(gulp.dest('dist/'))
});

gulp.task('copyJS', function () {
  return gulp.src('./src/assets/js/*.js')
    .pipe(gulp.dest('./dist/assets/js/'));
});

/*gulp.task('copySound', function () {
  return gulp.src('./src/assets/js/soundjs-0.6.2.min.js')
    .pipe(gulp.dest('./dist/assets/js/'));
});*/

gulp.task('zip',['manifest'], function () {
  return gulp.src('dist/**')
    //.pipe(wait(1000))
    .pipe(zip('infi-2023-003_scorm.zip'))
    .pipe(gulp.dest('dist/'));
});

gulp.task('zipfinal',['manifestfinal'], function () {
  return gulp.src('dist/**')
    //.pipe(wait(1000))
    .pipe(zip('infi-2023-003_scorm.zip'))
    .pipe(gulp.dest('dist/'));
});

gulp.task('clear', ['zip'], function () {
  return $.del('dist/imsmanifest.xml');
});

gulp.task('clearfinal', ['zipfinal'], function () {
  return $.del('dist/imsmanifest.xml');
});

/*gulp.task('css', function () {
    var postcss    = require('gulp-postcss');
    var sourcemaps = require('gulp-sourcemaps');

    return gulp.src('src/**//*.css')
        .pipe( sourcemaps.init() )
        .pipe( postcss([ require('precss'), require('autoprefixer') ]) )
        .pipe( sourcemaps.write('.') )
        .pipe( gulp.dest('build/') );
});*/

gulp.task('prebuild', ['html', 'fonts', 'other', 'copyJS']);

gulp.task('build', ['html', 'fonts', 'other', 'copyJS', 'manifest', 'zip', 'clear']);

gulp.task('buildproject', ['html', 'fonts', 'otherfinal', 'copyJS', 'tinypng', 'manifestfinal', 'zipfinal', 'clearfinal']);

gulp.task('final', ['clean'], function () {
  gulp.start('buildproject');
});
