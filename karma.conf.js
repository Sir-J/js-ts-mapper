var webpack = require('webpack');
var path = require('path');
module.exports = function(config) {
    config.set({
        browsers: ['Chrome'],
        colors: true,
        coverageReporter: {
            dir: './',
            reporters: [
                { type: 'lcov', subdir: 'coverage' }
            ]
        },
        customLaunchers: {
            Chrome_travis_ci: {
                base: 'Chrome',
                flags: ['--no-sandbox']
            }
        },
        files: [
            'karma.entry.js'
        ],
        frameworks: ['jasmine'],
        preprocessors: {
            'karma.entry.js': ['webpack', 'sourcemap'],
            'src/**/*.js': ['coverage']
        },
        reporters: ['spec', 'coverage'],
        singleRun: false,
        watch: true,

        webpack: {
            resolve: {
                alias: {
                    'ts-mapper': path.resolve(__dirname, 'src'),
                    'test-models': path.resolve(__dirname, 'tests/models'),
                    'ts-services': path.resolve(__dirname, 'tests/services')
                }
            },
            mode: 'development',
            devtool: 'inline-source-map',
            module: {
                rules: [{
                        exclude: [path.resolve(__dirname, 'node_modules')],
                        include: [
                            path.resolve(__dirname, 'src'),
                            path.resolve(__dirname, 'tests')
                        ],
                        loader: 'ts-loader',
                        test: /.*(?!\.d\.ts)|(\.ts)$/
                    },
                    {
                        include: [
                            path.resolve(__dirname, 'src')
                        ],
                        loader: 'istanbul-instrumenter-loader',
                        test: /\.ts$/,
                        enforce: 'post'
                    }
                ]
            },
            resolve: {
                extensions: ['.ts', '.tsx', '.json', '.js'],
                modules: [
                    'node_modules'
                ]
            }
        },
        webpackServer: {
            noInfo: true,
            noLog: true
        }
    });
    if (process.env.TRAVIS) {
        config.browsers = ['Chrome_travis_ci'];
    }
};