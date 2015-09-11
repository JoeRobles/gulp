module.exports = function() {
    var config = {
        temp: './.tmp/',
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
            ignorePath: config.bower.ignorePath,
            cwd: config.bower.cwd
        };
        
        return options;
    };
    
    return config;
};