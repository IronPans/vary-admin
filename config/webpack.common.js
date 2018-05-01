const helpers = require('./helpers');

const os = require('os');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const HappyPack = require('happypack');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

const { VueLoaderPlugin } = require('vue-loader');

module.exports = (env) => {
    const isProduction = process.env.NODE_ENV === 'production';
    return {
        entry: {
            app: helpers.root('./src/app.js'),
            vendor: helpers.root('./src/vendors/vendor.js')
        },
        resolve: {
            modules: [
                helpers.root('src'),
                helpers.root('./node_modules')],
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
                    test: /\.js$/,
                    loader: 'happypack/loader?id=happybabel',
                    exclude: /node_modules/
                },
                {
                    test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
                    loader: 'url-loader?limit=1024'
                },
                {
                    test: /\.html$/,
                    loader: 'html-loader'
                }
            ]
        },
        plugins: [
            new VueLoaderPlugin(),
            new ExtractTextPlugin("app.css"),
            new HappyPack({
                id: 'happybabel',
                loaders: ['babel-loader'],
                threadPool: happyThreadPool,
                verbose: true
            }),
            new HtmlWebpackPlugin({
                title: 'vary-admin',
                template: './src/index.html',
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
            })
        ]
    }
}