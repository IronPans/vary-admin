const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common');
const helpers = require('./helpers');
const webpack = require('webpack');

const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

const ENV = process.env.ENV = process.env.NODE_ENV = 'development';
const HOST = process.env.HOST || '172.17.0.1';
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
        module: {
            rules: [
                {
                    test: /\.(less|css)$/,
                    use: [
                        require.resolve('style-loader'),
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
                }
            ]
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: '"production"'
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