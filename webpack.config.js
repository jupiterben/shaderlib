const HtmlWebpackPlugin = require('html-webpack-plugin')
var path = require('path');
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');

var externals = [
    'three'
];

module.exports = {
    entry: './src/main.tsx',
    mode: 'development',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'main.bundle.js'
    },
    devtool: "source-map",

    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            favicon: 'src/favicon.png',
            template: 'src/index.html'
        }),
        new HtmlWebpackExternalsPlugin({
            // See API section
            externals: [
                {
                    module: 'jquery',
                    entry: 'dist/jquery.js',
                    global: 'jQuery',
                },
                {
                    module: 'three',
                    entry: 'build/three.js',
                    global: 'THREE',
                }],
        }),
    ],

    resolve: {
        extensions: ['.ts', '.tsx', '.js', 'jsx']
    },
    module: {
        rules: [
            {
                test: /\.glsl$/,
                loader: 'webpack-glsl-loader'
            },
            {
                test: /\.tsx?$/,
                loader: "awesome-typescript-loader"
            },
            {
                test: /\.css$/,
                loaders: ['style-loader', 'css-loader']
            },
            {
                test: /\.(ttf|eot|svg|woff|woff2)(\?.+)?$/,
                loader: 'file-loader?name=[hash:12].[ext]'
            },
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            }
        ]
    },
    //externals
}
