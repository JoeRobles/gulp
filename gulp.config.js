module.exports = function() {
    var wiredep = require('wiredep');
    var bowerFiles = wiredep({devDependencies: true})['js'];
    var client= './src/';
    var clientApp = client + 'app/';
    var here = __dirname + '/';
    var karmaFiles = bowerFiles.concat(
        client + 'test-helpers/*.js',
        client + '**/*.module.js',
        client + '**/*.js',
        temp + 'templates.js',
        client + 'tests/server-integration/**/*.spec.js'
    );
    var report = './report/';
    var root = './';
    var specRunnerFile = 'specs.html';
    var temp = './.tmp/';

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
            exclude: [],
            configFile: here + 'karma.conf.js'
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
        specRunner: client + specRunnerFile,
        specRunnerFile: specRunnerFile,
        specs: [clientApp + '**/*.spec.js'],
        temp: temp,
        templateCache: {
            file: 'templates.js',
            options: {
                module: 'app.core',
                standAlone: false,
                root: ''
            }
        },
        testlibraries: [
            'node_modules/mocha/mocha.js',
            'node_modules/chai/chai.js',
            'node_modules/mocha-clean/index.js',
            'node_modules/sinon-chai/lib/sinon-chai.js'
        ]
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
