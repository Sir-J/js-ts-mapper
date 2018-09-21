const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const { TSDeclerationsPlugin } = require('ts-loader-decleration');
let fileName = 'js-ts-mapper.js';

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
                configFile: `tsconfig-es2015.json`
            })
        ]
    },
    output: {
        filename: fileName,
        path: path.resolve(__dirname, 'dist'),
        library: 'js-ts-mapper',
        libraryTarget: 'umd'
    },
    plugins: [
        new TSDeclerationsPlugin({
            out: './index.d.ts'
        })
    ]
};