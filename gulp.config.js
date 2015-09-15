module.exports = function() {
    var client= './src/';
    var clientApp = client + 'app/';
    var report = './report/';
    var root = './';
    var temp = './.tmp/';
    var wiredep = require('wiredep');
    var bowerFiles = wiredep({devDependencies: true}).js;
    var karmaFiles = bowerFiles.concat(
            client + 'test-helpers/*.js',
            client + '**/*.module.js',
            client + '**/*.js',
            temp + 'templates.js',
            client + 'tests/server-integration/**/*.spec.js'
        );
    var config = {
        allcss: client + '**/*.css',
        alljs: client + '**/*.js',
        bower: {
            json: require('./bower.json'),
            directory: './vendor/',
            ignorePath: '../..'
        },
        build: './dist/',
        client: client,
        clientApp: clientApp,
        css: temp + 'style.css',
        fonts: './vendor/bootstrap/dist/fonts/*.*',
        html: client + '**/*.html',
        images: client + 'images/**/*.*',
        index: client + 'index.html',
        js: [
            client + '**/*.module.js',
            client + '**/*.js',
            '!' + client + '**/*.spec.js'
        ],
        karma: {
            files: karmaFiles,
            exclude: []
        },
        optimized: {
            app: 'app.js',
            lib: 'lib.js'
        },
        report: report,
        root: root,
        scss: client + 'scss/*.scss',
        serverIntegrationSpecs: [client + 'tests/server-integration/**/*.spec.js'],
        specHelpers: [client + 'test-helpers/*.js'],
        temp: temp,
        templateCache: {
            file: 'templates.js',
            options: {
                module: 'app.core',
                standAlone: false,
                root: ''
            }
        }
    };
    
    config.getWiredepDefaultOptions = function() {
        var options = {
            bowerJson: config.bower.json,
            directory: config.bower.directory,
            ignorePath: config.bower.ignorePath
        };
        
        return options;
    };
    
    return config;
};