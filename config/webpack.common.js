const helpers = require('./helpers');

const os = require('os');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

const HappyPack = require('happypack');
const happyThreadPool = HappyPack.ThreadPool({size: os.cpus().length});

const {VueLoaderPlugin} = require('vue-loader');

module.exports = (env) => {
    const isProduction = process.env.NODE_ENV === 'production';
    return {
        entry: {
            app: helpers.root('./src/app.js')
            // base: helpers.root('./src/vendors/base.js'),
            // extend: helpers.root('./src/vendors/extend.js')
        },
        resolve: {
            modules: [helpers.root('src'), helpers.root('./node_modules')],
            extensions: ['.vue', '.js', '.json'],
            alias: {
                '@': helpers.root('./src'),
            }
        },
        module: {
            strictExportPresence: true,
            rules: [
                {
                    test: /\.vue$/,
                    loader: 'vue-loader',
                    options: {
                        loaders: {
                            css: 'vue-style-loader!css-loader',
                            less: 'vue-style-loader!css-loader!less-loader'
                        }
                    }
                },
                {
                    test: /\.(less|css)$/,
                    use: [
                        //'style-loader',
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        {
                            loader: 'postcss-loader',
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
                                        zindex: false,
                                        reduceIdents: false
                                    }),
                                ],
                                sourceMap: true
                            },
                        },
                        'less-loader'
                    ]
                },
                {
                    test: /\.js$/,
                    loader: 'happypack/loader?id=happybabel',
                    exclude: /node_modules/
                },
                {
                    test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
                    loader: 'url-loader?limit=1024'
                }
            ]
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: 'app.css',
                chunkFilename: 'app.[contenthash:12].css'
            }),
            new HappyPack({
                id: 'happybabel',
                loaders: ['babel-loader'],
                threadPool: happyThreadPool,
                verbose: true
            }),
            new HtmlWebpackPlugin({
                title: 'Vary Admin',
                template: './src/index.html',
                favicon: './favicon.ico',
                chunksSortMode: function (a, b) {
                    const entryPoints = ['vendor', 'app'];
                    return entryPoints.indexOf(a.names[0]) - entryPoints.indexOf(b.names[0]);
                },
                stat: isProduction,
                inject: 'body',
                minify: isProduction ? {
                    removeComments: true,
                    collapseWhitespace: true,
                    collapseInlineTagWhitespace: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true,
                    removeEmptyAttributes: true,
                    removeStyleLinkTypeAttributes: true,
                    keepClosingSlash: true,
                    minifyJS: true,
                    minifyCSS: true,
                    minifyURLs: true,
                } : null
            }),
            new VueLoaderPlugin()
        ]
    }
}