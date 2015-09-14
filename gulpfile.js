var gulp = require('gulp');
var args = require('yargs').argv;
var browserSync = require('browser-sync');
var config = require('./gulp.config')();
var del = require('del');

var plugin = require('gulp-load-plugins')({lazy: true});

gulp.task('help', plugin.taskListing);

gulp.task('default', ['help']);

gulp.task('lint-js', function() {
    log('Analyzing source with JSHint');
    return gulp
        .src(config.alljs)
        .pipe(plugin.if(args.verbose, plugin.print()))
        .pipe(plugin.jshint())
        .pipe(plugin.jshint.reporter('jshint-stylish', {verbose: true}))
        .pipe(plugin.jshint.reporter('fail'));
});

gulp.task('watch-js', function(){
    log('Watching Javascript files');
    gulp.watch(config.alljs, ['lint-js']);
});

gulp.task('lint-scss', function() {
    log('Linting Scss files');
    gulp.src(config.scss)
        .pipe(plugin.scssLint({ customReport: plugin.scssLintStylish }));
});

gulp.task('styles', ['lint-scss', 'clean-styles'], function(){
    log('Compiling Scss --> CSS');
    
    return gulp
        .src(config.scss)
        .pipe(plugin.plumber())
        .pipe(plugin.sass())
        .pipe(plugin.autoprefixer({browsers: ['last 2 version', '> 5%']}))
        .pipe(gulp.dest(config.temp));
});

gulp.task('clean-styles', function(){
    var delcss = [].concat(config.build + 'css/*.css', config.temp + '*.css');
    log('Cleaning css files');
    clean(delcss);
});

gulp.task('watch-scss', function(){
    log('Watching Scss files');
    gulp.watch(config.scss, ['lint-scss']);
});

gulp.task('lint-html', function() {
    log('Linting Html files');
    return gulp.src(config.html)
        .pipe(plugin.htmllint());
});

gulp.task('watch-html', function(){
    log('Watching Html files');
    gulp.watch(config.html, ['lint-html']);
});

gulp.task('fonts', ['clean-fonts'], function(){
    log('Copying fonts');
    
    return gulp
        .src(config.fonts)
        .pipe(gulp.dest(config.build + 'fonts'));
});

gulp.task('clean-fonts', function(){
    log('Cleaning font files');
    clean(config.build + 'fonts/*.*');
});

gulp.task('images', ['clean-images'], function(){
    log('Copying and optimizing the images');
    
    return gulp
        .src(config.images)
        .pipe(plugin.imagemin({optimizationLevel:4}))
        .pipe(gulp.dest(config.build + 'images'));
});

gulp.task('clean-images', function(){
    log('Cleaning image files');
    clean(config.build + 'images/*.*');
});

gulp.task('clean-js', function(){
    var deljs = [].concat(config.build + 'js/*.js', config.temp + '*.js');
    log('Cleaning Javascript files');
    clean(deljs);
});

gulp.task('clean-all', function(){
    var delconfig = [].concat(config.build, config.temp);
    log('Cleaning all: ' + plugin.util.colors.blue(delconfig));
    del(delconfig);
});

gulp.task('clean-code', function(){
    var files = [].concat(
            config.build + 'css/*.css',
            config.build + 'fonts/*.*',
            config.build + 'images/*.*',
            config.build + 'js/*.js'
    );
    log('Cleaning prod files');
    clean(files);
});

gulp.task('templatecache', ['lint-html'], function(){
    log('Creating AngularJS $templateCache');
    
    return gulp
        .src(config.html)
        .pipe(plugin.minifyHtml({empty: true}))
        .pipe(plugin.angularTemplatecache(
            config.templateCache.file,
            config.templateCache.options
        ))
        .pipe(gulp.dest(config.temp));
});

gulp.task('wiredep', function(){
    var options = config.getWiredepDefaultOptions();
    var wiredep = require('wiredep').stream;
    log('Wire up the bower css js and our app js into the html');

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

gulp.task('inject', ['styles', 'lint-js', 'templatecache', 'wiredep'], function(){
    log('Wire up the app css into the html, and call wiredep');

    return gulp
        .src(config.index)
        .pipe(
            plugin.inject(
                gulp.src(config.css)
            )
        )
        .pipe(
            plugin.inject(
                gulp.src(config.temp + config.templateCache.file),
                { starttag: '<!-- inject:templates:js -->' }
            )
        )
        .pipe(gulp.dest('./'));
});

gulp.task('serve-dev', ['wiredep'], function() {
    log('Starting browser-sync');
    startBrowserSync();
});

gulp.task('optimize', ['inject'], function(){
    var assets = plugin.useref.assets({searchPath: './'});
    var cssFilter = plugin.filter(['**/*.css'], {restore: true});
    var jsLibFilter = plugin.filter('**/' + config.optimized.lib, {restore: true});
    var jsAppFilter = plugin.filter('**/' + config.optimized.app, {restore: true});
    log('Optimizing the javascritp, css, html');

    return gulp
        .src(config.index)
        .pipe(plugin.plumber())
        .pipe(assets)
        .pipe(cssFilter)
        .pipe(plugin.csso())
        .pipe(cssFilter.restore)
        .pipe(jsLibFilter)
        .pipe(plugin.uglify())
        .pipe(jsLibFilter.restore)
        .pipe(jsAppFilter)
        .pipe(plugin.ngAnnotate())
        .pipe(plugin.uglify({mangle: false}))
        .pipe(jsAppFilter.restore)
        .pipe(assets.restore())
        .pipe(plugin.useref())
        .pipe(gulp.dest(config.build));
});

gulp.task('test', ['vet', 'templatecache'], function(){
    startTests(true /* singleRun */);
});

////////

function changeEvent(event) {
    var srcPattern = new RegExp('/.*(?=/' + config.source + ')/');
    log('File ' + event.path.replace(srcPattern, '') + ' ' + event.type);
}

function clean(path) {
    log('Cleaning: ' + plugin.util.colors.blue(path));
    del(path);
}

function errorLogger(error) {
    log('*** Start of Error ***');
    log(error);
    log('*** End of Error ***');
    this.emit('end');
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

function startBrowserSync(){
    if (browserSync.active) {
        return;
    }
    
    log('browser-sync started');
    gulp.watch([config.js, config.html], ['lint-js', 'lint-html'])
        .on('change', function(event){ changeEvent(event); });
    
    var options = {
        proxy: 'local.gulp.com:' + 80,
        port: 3000,
        files: [
            './src/**/*.*',
            '!' + config.scss,
            config.build + 'css/*.css'
        ],
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

function startTests(singleRun) {
    var karma = require('karma').server;
    var excludeFiles = [];
    var serverSpecs = config.serverIntegrationSpecs;
    
    excludeFiles = serverSpecs;
    
    karma.start({
        config: __dirname + 'karma.conf.js',
        exclude: excludeFiles,
        single: !!singleRun
    }, karmaCompleted)
    
    function karmaCompleted(karmaResult){
        log('Karma completed!');
        if (karmaResult === 1){
            done('karma: tests failed with code ' + karmaResult);
        } else {
            done();
        }
    }
}