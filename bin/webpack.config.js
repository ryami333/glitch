const webpack = require('webpack');
const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
    entry: {
        'dist/main': [
            './resources/js/main.js',
        ],
    },

    output: { 
        path: path.resolve(process.cwd(), 'docs'),
        publicPath: process.env.DEV ? 'http://localhost:3000' : '',
        filename: '[name][chunkhash].js',
    },

    resolve: {
        modules: [
            'node_modules',
            path.join(process.cwd(), 'resources/js'),
            path.join(process.cwd(), 'resources/scss'),
        ]
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: [
                    'react-hot-loader/webpack',
                    {
                        loader: 'babel-loader',
                        query: {
                            presets: ['es2015', 'stage-2', 'react']
                        },
                    },
                ],
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: function () {
                                return [
                                    require('autoprefixer')({
                                        browsers: [
                                            'last 2 versions',
                                            'ie >= 10',
                                        ],
                                    }),
                                    require('cssnano')
                                ];
                            }
                        }
                    },
                    'sass-loader',
                ],
            },
            {
                test: /\.html$/,
                loader: 'html-loader', 
            },
        ],
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: 'resources/index.html',
            inject: 'body',
        })
    ]
};

if (process.env.HOT) {
    // Add plugins required for HMR.
    config.plugins = (config.plugins || []).concat([
        new webpack.HotModuleReplacementPlugin()
    ]);

    // Add entrypoints required for HMR.
    for (entry in config.entry) {
        config.entry[entry] = [
            'react-hot-loader/patch',
            'webpack-hot-middleware/client?noInfo=true&reload=true&path=//localhost:3000/__webpack_hmr',
        ].concat(config.entry[entry]);
    }

    // Path needs to be '/' for HMR.
    config.output.path = '/';

    config.output.filename = '[name]';
}

if (process.env.DEV) {
    // Enable sourcemaps for dev.
    config.devtool = "cheap-eval-source-map";
}

if (process.env.UGLIFY) {
    config.plugins = (config.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production'),
            },
        }),
        new UglifyJSPlugin(),
    ]);
}

module.exports = config;