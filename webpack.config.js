const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const { TSDeclerationsPlugin } = require('ts-loader-decleration');

let plugins = [];
let postfixTsConfig = 'es2015';
let fileName = 'js-ts-mapper.js';

const commandArgs = process.argv;
if (~commandArgs.indexOf('--es5')) {
    postfixTsConfig = 'es5';
    fileName = 'js-ts-mapper.es5.js';
} else {
    plugins.push(
        new TSDeclerationsPlugin({
            out: './index.d.ts'
        })
    );
}

module.exports = {
    entry: './src/index.ts',
    mode: 'development',
    module: {
        rules: [{
            test: /\.ts?$/,
            use: 'ts-loader',
            exclude: /node_modules/
        }]
    },
    resolve: {
        extensions: ['.ts', '.js'],
        plugins: [
            new TsconfigPathsPlugin({
                configFile: `tsconfig-${postfixTsConfig}.json`
            })
        ]
    },
    output: {
        filename: fileName,
        path: path.resolve(__dirname, 'dist'),
        library: 'js-ts-mapper',
        libraryTarget: 'umd'
    },
    plugins: plugins
};