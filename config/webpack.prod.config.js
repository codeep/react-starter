const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

let distPath = path.join(__dirname, '../dist/assets');
let isDnsTrails = false;

const GLOBALS = {
    'process.env.NODE_ENV': JSON.stringify('production'),//should be change form master branch
};

module.exports = {
    watch: false,
    cache: true,
    devtool: 'source-map',
    entry: [
        'event-source-polyfill',
        path.resolve(__dirname, '../src/index.js'),
    ],
    target: 'web',
    output: {
        path: distPath,
        publicPath: '/assets/',
        filename: 'bundle.[chunkhash].js'
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.DefinePlugin(GLOBALS),
        // new ExtractTextPlugin('styles.css'),
        new webpack.optimize.UglifyJsPlugin(),
        new CopyWebpackPlugin([
            {from: 'src/styles', to: 'css/'},
        ]),


        new HtmlWebpackPlugin({
            template: 'src/index.html',
            isDnsTrails: isDnsTrails,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true
            },
            filename: 'index.html' ,
            inject: true,
            // Note that you can add custom options here if you need to handle other custom logic in index.html
            // To track JavaScript errors via TrackJS, sign up for a free trial at TrackJS.com and enter your token below.
            trackJSToken: ''
        }),

        new HtmlWebpackIncludeAssetsPlugin({
            assets: [
                {path: 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css', type: 'css'},
                {path: 'https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js'},
                {path: 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js'}
            ],
            append: false,
            hash: true,
            publicPath: ''
        })
    ],
    resolve: {
        extensions: ['.js', '.jsx']
    },
    devServer: {
        contentBase: './dist'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                // options: {
                //   babelrc: path.join(process.cwd(), './babelrc')
                // }
            },
            {test: /(\.css)$/, loaders: ['style-loader', 'css-loader?sourceMap']},
            {test: /\.(jpe?g|png|gif)$/i, loader: 'file-loader?name=[name].[ext]'},
            {test: /\.ico$/, loader: 'file-loader?name=[name].[ext]'},
            {test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=application/octet-stream'}          ]

        // {test: /(\.css)$/,
        // use: ['style-loader', {loader: 'css-loader', options: {minimize: true, sourceMap: true}}]}]
    }
};
