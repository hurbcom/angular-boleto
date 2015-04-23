'use strict';

var gulp          = require('gulp');
var browserSync   = require('browser-sync');
var wiredep       = require('wiredep').stream;
var inject        = require('gulp-inject');
var karma         = require('karma').server;

gulp.task('default', ['bower', 'inject'], function() {

});

// Levanta servidor pra dev
gulp.task('serve', ['bower', 'inject', 'watch'], function() {

});

// Observa mudanças de arquivos e faz reload no browser sozinho
gulp.task('watch', ['bower', 'inject'], function() {
  browserSync({
    ui: false,
    port: 3005,
    notify: false,
    open: false,
    server: {
      baseDir: './app'
    }
  });

  // Quando for o momento, criar watchs mais específicos
  gulp.watch('app/**/*').on('change', browserSync.reload);
});

// Injeta as dependências do Bower no arquivo index.html
gulp.task('bower', function() {
  return gulp.src('app/index.html')
    .pipe(wiredep({ optional: 'configuration', goes: 'here', devDependencies: true }))
    .pipe(gulp.dest('app'));
});

// Injeta os scripts e estilos da aplicação no arquivo index.html
gulp.task('inject', ['bower'], function() {
  // Ordem de injeção de scripts
  var sources = gulp.src(
    ['./app/scripts/app.js',
    './app/scripts/*.js'],
    {read: false});

  return gulp.src('app/index.html')
    .pipe(inject(sources, { ignorePath: 'app' }))
    .pipe(gulp.dest('app'));
});

gulp.task('test', ['bower'], function (done) {
  karma.start({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done);
});