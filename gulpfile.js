const { src, dest, series, watch } = require('gulp');
const browserSync = require('browser-sync');
const wiredep = require('wiredep').stream;
const inject = require('gulp-inject');
const karma = require('karma').server;

function watchTask() {
  browserSync({
    ui: false,
    port: 3005,
    notify: false,
    open: false,
    server: {
      baseDir: './app'
    }
  });

  watch(['app/**/*', '!app/bower_components/**/*']).on('change', browserSync.reload);
};

function bower() {
  return src('app/index.html')
    .pipe(wiredep({ optional: 'configuration', goes: 'here', devDependencies: true }))
    .pipe(dest('app'));
};

function injectTask() {
  var sources = src(
    ['./app/scripts/app.js',
      '!./app/**/*.min.js',
      './app/scripts/*.js'],
    { read: false });

  return src('app/index.html')
    .pipe(inject(sources, { ignorePath: 'app' }))
    .pipe(dest('app'));
};

function testTask() {
  karma.start({
    configFile: __dirname + '/karma.conf.js',
    singleRun: false
  });
};

exports.default = series(bower, injectTask);
exports.serve = series(bower, injectTask, watchTask);
exports.test = series(bower, testTask);
