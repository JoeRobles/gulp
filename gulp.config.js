module.exports = function() {
    var config = {
        temp: './.tmp/',
        css: './.tmp/style.css',
        html: '../mbuildprj/ui/trunk/SelfServiceMBuildUI/**/*.html',
        alljs: './src/**/*.js',
        index: 'index.html',
        js: [
            './src/**/*.module.js',
            './src/**/*.js',
            '!./src/**/*.specs.js'
        ],
        sass: './src/sass/*.scss',
        bower: {
            json: require('./bower.json'),
            directory: './vendor/',
            ignorePath: '../..'
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