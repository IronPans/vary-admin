const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common');
const helpers = require('./helpers');
const webpack = require('webpack');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

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
        module: {
            rules: [
                {
                    test: /\.(less|css)$/,
                    loader: ExtractTextPlugin.extract({
                        fallback: {
                            loader: require.resolve('style-loader'),
                            options: {
                                hmr: false,
                            },
                        },
                        use: [
                            {
                                loader: require.resolve('css-loader'),
                                options: {
                                    importLoaders: 1,
                                },
                            },
                            {
                                loader: require.resolve('postcss-loader'),
                                options: {
                                    ident: 'postcss',
                                    plugins: () => [
                                        autoprefixer({
                                            browsers: [
                                                'last 2 versions',
                                                'Firefox ESR',
                                                '> 1%',
                                                'ie >= 9',
                                                'iOS >= 8',
                                                'Android >= 4'
                                            ]
                                        }),
                                        cssnano({
                                            preset: 'default',
                                            zindex: false
                                        }),
                                    ],
                                },
                            },
                            {
                                loader: 'less-loader'
                            }
                        ]
                    })
                }
            ]
        },
        plugins: [
            new webpack.optimize.CommonsChunkPlugin({
                name: ['vender'],
                minChunks: Infinity
            }),
            new ExtractTextPlugin({
                filename: "[name].[hash].css",
                allChunks: true
            }),
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
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false,
                    drop_console: true,
                    collapse_vars: true,
                    reduce_vars: true,
                },
                output: {
                    beautify: false,
                    comments: false,
                }
            }),
        ]
    });
}