const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common');
const helpers = require('./helpers');
const webpack = require('webpack');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const CompressionPlugin = require('compression-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const ENV = process.env.ENV = process.env.NODE_ENV = 'production';

module.exports = (env) => {
    return webpackMerge(commonConfig({env: ENV}), {
        mode: 'production',
        devtool: 'source-map',
        output: {
            path: helpers.root('build'),
            filename: '[name].[chunkhash].bundle.js',
            sourceMapFilename: '[file].map',
            chunkFilename: '[id].[chunkhash].chunk.js'
        },
        optimization: {
            runtimeChunk: {
                name: 'manifest'
            },
            //minimize: true,
            minimizer: [
                new UglifyJsPlugin({
                    cache: true,
                    parallel: true,
                    sourceMap: true
                }),
                new OptimizeCSSAssetsPlugin({})
            ],
            splitChunks: {
                chunks: 'async',
                minSize: 30000,
                minChunks: 1,
                maxAsyncRequests: 5,
                maxInitialRequests: 3,
                name: false,
                cacheGroups: {
                    vendor: {
                        name: 'vendor',
                        chunks: 'initial',
                        priority: -10,
                        reuseExistingChunk: false,
                        test: /node_modules\/(.*)\.js/
                    },
                    styles: {
                        name: 'styles',
                        test: /\.(less|css)$/,
                        chunks: 'all',
                        minChunks: 1,
                        reuseExistingChunk: true,
                        enforce: true
                    }
                }
            }
        },
        plugins: [
            // new webpack.optimize.CommonsChunkPlugin({
            //     name: ['base', 'extend'],
            //     minChunks: Infinity
            // }),
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: '"production"'
                }
            }),
            /**
             * Plugin: CompressionPlugin
             * Description: Compression all js/css/html of gz
             *
             * See: https://doc.webpack-china.org/plugins/compression-webpack-plugin/
             */
            new CompressionPlugin({
                asset: '[path].gz[query]',
                algorithm: 'gzip',
                test: /\.js$|\.css$|\.html$/,
                threshold: 10240,
                minRatio: 0.8
            }),
            new webpack.optimize.ModuleConcatenationPlugin(),
            /**
             * Plugin: CopyWebpackPlugin
             * Description: Copy files and directories in webpack.
             *
             * Copies project static assets.
             *
             * See: https://www.npmjs.com/package/copy-webpack-plugin
             */
            new CopyWebpackPlugin([{
                    from: 'src/assets',
                    to: 'assets'
                }]
            )
        ]
    });
}