module.exports = function() {
    var config = {
        alljs: './src/**/*.js',
        bower: {
            json: require('./bower.json'),
            directory: './vendor/',
            ignorePath: '../..'
        },
        build: './dist/',
        css: './.tmp/style.css',
        fonts: './vendor/bootstrap/dist/fonts/*.*',
        html: './src/**/*.html',
        images: './src/images/**/*.*',
        index: './index.html',
        js: [
            './src/**/*.module.js',
            './src/**/*.js',
            '!./src/**/*.spec.js'
        ],
        serverIntegrationSpecs: ['./src/tests/server-integration/**/*.spec.js'],
        optimized: {
            app: 'app.js',
            lib: 'lib.js'
        },
        scss: './src/scss/*.scss',
        temp: './.tmp/',
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
    
    config.karma = getKarmaOptions();
    
    return config;
    
    ////////
    
    function getKarmaOptions() {
        var options = {
            files: [].concat(
                config.specHelpers,
                './src/**/*.module.js',
                './src/**/*.js',
                config.serverIntegrationSpecs
            ),
            exclude: [],
            coverage: {
                dir: './report/coverage',
                reporters: [
                    { type: 'html', subdir: 'report-html' },
                    { type: 'lcov', subdir: 'report-lcov' },
                    { type: 'text-summary' }
                ]
            },
        };
        
        return options;
    }
};