const path               = require('path');
const BrowserSyncPlugin  = require('browser-sync-webpack-plugin');
const ExtractTextPlugin  = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin  = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack            = require('webpack');

module.exports = {
    devtool: 'source-map',
    entry: './src/js/script.js',
    output: {
        path: path.resolve('dist'),
        filename: 'js/[name].bundle.js',
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.css$/,
                use: [
                  'style-loader',
                  'css-loader'
                ]
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract(
                    {
                        fallback: "style-loader",
                        use: ['css-loader', 'sass-loader']
                    }
                )
            },
            {
                test: /\.html$/,
                use: ['html-loader']
            },
            {
                test: /\.html$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]'
                    }
                }],
                exclude: path.resolve('src/index.html')
            },
            {
                test: /\.(png|svg|jpe?g|gif)$/i,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        publicPath: 'images/',
                        outputPath: 'images/'
                    }
                }]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({template: 'src/index.html'}),
        new ExtractTextPlugin("css/styles.css"),
        new CleanWebpackPlugin(['dist']),
        new BrowserSyncPlugin({
            notify: false,
            host: 'localhost',
            port: 8081,
            server: { baseDir: ['dist'] }
        }),
        new webpack.SourceMapDevToolPlugin({
            exclude: ['popper.js', 'jquery.js']
        }),
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false
            }
        })
    ]
}
