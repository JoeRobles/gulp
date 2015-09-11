var gulp = require('gulp');
var args = require('yargs').argv;
var browserSync = require('browser-sync');
var config = require('./gulp.config')();
var del = require('del');

var plugin = require('gulp-load-plugins')({lazy: true});

gulp.task('hello-world', function(){
    console.log('Or first hellow world gulp task!');
});

gulp.task('lint-js', function() {
    log('Analyzing source with JSHint and JSCS');
    return gulp
        .src(config.alljs)
        .pipe(plugin.if(args.verbose, plugin.print()))
        .pipe(plugin.jshint())
        .pipe(plugin.jshint.reporter('jshint-stylish', {verbose: true}))
        .pipe(plugin.jshint.reporter('fail'));
});

gulp.task('lint-scss', function() {
    gulp.src(config.sass)
        .pipe(plugin.scssLint({ customReport: plugin.scssLintStylish }));
});

gulp.task('lint-html', function() {
    return gulp.src(config.html)
        .pipe(plugin.htmllint());
});

gulp.task('styles', ['lint-scss', 'clean-styles'], function(){
    log('Compiling Sass --> CSS');
    
    return gulp
        .src(config.sass)
        .pipe(plugin.plumber())
        .pipe(plugin.sass())
        .pipe(plugin.autoprefixer({browsers: ['last 2 version', '> 5%']}))
        .pipe(gulp.dest(config.temp));
});

gulp.task('clean-styles', function(){
    var files = config.temp + '**/*.css';
    clean(files);
});

gulp.task('scss-watcher', function(){
    gulp.watch(config.sass, ['lint-scss']);
});

gulp.task('wiredep', function(){
    log('Wire up the bower css js and our app js into the html');
    var options = config.getWiredepDefaultOptions();
    var wiredep = require('wiredep').stream;

    return gulp
        .src(config.index)
        .pipe(wiredep(options))
        .pipe(
            plugin.inject(
                gulp
                    .src(config.js)
                    .pipe(plugin.angularFilesort())
            )
        )
        .pipe(gulp.dest('./'));
});

gulp.task('inject', ['wiredep', 'styles'], function(){
    log('Wire up the app css into the html, and call wiredep');

    return gulp
        .src(config.index)
        .pipe(
            plugin.inject(
                gulp
                    .src(config.css)
            )
        )
        .pipe(gulp.dest('./'));
});

gulp.task('serve-dev', function() {
    startBrowserSync();
});

////////

function startBrowserSync(){
    if (browserSync.active) {
        return;
    }
    
    log('Starting browser-sync');
    
    var options = {
        proxy: 'local.gulp.com:' + 80,
        port: 3000,
        files: ['./src/**/*.*'],
        ghostMode: {
            clicks: true,
            location: false,
            forms: true,
            scroll: true
        },
        injectChanges: true,
        logFileChanges: true,
        logLevel: 'debug',
        logPrefix: 'gulp-paterns',
        notify: true,
        reloadDelay: 1000
    };
    
    browserSync(options);
}

function errorLogger(error) {
    log('*** Start of Error ***');
    log(error);
    log('*** End of Error ***');
    this.emit('end');
}

function clean(path) {
    log('Cleaning: ' + plugin.util.colors.blue(path));
    del(path);
}

function log(msg) {
    if (typeof(msg) === 'object') {
        for (var item in msg) {
            if (msg.hasOwnProperty(item)) {
                plugin.util.log(plugin.util.colors.blue(msg[item]));
            }
        }
    } else {
        plugin.util.log(plugin.util.colors.blue(msg));
    }
}
