const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

// It will search for CSS assets during the Webpack build and will optimize \ minimize the CSS 
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

// By default, this plugin will remove all files inside webpack's output.path directory, 
// as well as all unused webpack assets after every successful rebuild.
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

// This plugin extracts CSS into separate files. It creates a CSS file per JS file which contains CSS.
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

// This plugin uses terser to minify/minimize your JavaScript.
const TerserPlugin = require("terser-webpack-plugin")

module.exports = {
    entry: './src/client/index.js',
    mode: 'production',
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin({}), new OptimizeCssAssetsPlugin({})],
    },
    module: {
        rules: [
            {
                test: '/\.js$/',
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader,
                    //'style-loader', // Creates `style` nodes from JS strings
                    'css-loader', // Translates CSS into CommonJS
                    'sass-loader' // Compiles Sass to CSS
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/client/view/index.html', // Generates default index.html
            filename: './index.html'
        }),
        new CleanWebpackPlugin({
            // Simulate the removal of files
            //
            // default: false
            dry: true,

            // Write Logs to Console
            // (Always enabled when dry is true)
            //
            // default: false
            verbose: true,

            // Automatically remove all unused webpack assets on rebuild
            //
            // default: true
            cleanStaleWebpackAssets: false,

            // Do not allow removal of current webpack assets
            //
            // default: true
            protectWebpackAssets: false,
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css"
        })
    ]
}