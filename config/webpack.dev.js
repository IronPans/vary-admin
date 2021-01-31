const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common');
const helpers = require('./helpers');
const webpack = require('webpack');

const ENV = process.env.ENV = process.env.NODE_ENV = 'development';
const HOST = process.env.HOST || '127.0.0.1';
const PORT = process.env.PORT || 4200;

const METADATA = webpackMerge(commonConfig({
    env: ENV
}).metadata, {
    host: HOST,
    port: PORT,
    ENV: ENV,
    HMR: false
});

module.exports = (env) => {
    return webpackMerge(commonConfig({env: ENV}), {
        mode: 'development',
        devtool: 'cheap-module-source-map',
        output: {
            path: helpers.root('build'),
            filename: '[name].js',
            sourceMapFilename: '[file].map',
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: '"development"'
                }
            })
        ],
        devServer: {
            port: METADATA.port,
            host: METADATA.host,
            historyApiFallback: true,
            watchOptions: {
                aggregateTimeout: 300,
                poll: 1000,
                ignored: /node_modules/
            },
            disableHostCheck: true
        }
    });
}