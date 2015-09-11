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
        index: 'index.html',
        js: [
            './src/**/*.module.js',
            './src/**/*.js',
            '!./src/**/*.specs.js'
        ],
        scss: './src/scss/*.scss',
        temp: './.tmp/',
        templateCache: {
            file: 'templates.js',
            options: {
                module: 'app.core',
                standAlone: false,
                root: 'app/'
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