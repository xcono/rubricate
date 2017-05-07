let webpack = require('webpack');
let path = require('path');

let ExtractTextPlugin = require("extract-text-webpack-plugin");

let BUILD_DIR = path.resolve(__dirname, 'dist');

const IS_PROD = process.argv.indexOf('-p') !== -1;

module.exports = {

    context: __dirname + '/',
    entry: {
        'rubricate': ['./src/core/run.ts', './src/core/sass/bundle.scss'],
        'rubricate.draggable': [
            './node_modules/dragula/dist/dragula.min.css',
            './src/extensions/Rubricate.draggable/app.ts',
        ],
        'rubricate.plugins': [
            './src/extensions/Rubricate.plugins/app.ts',
            './src/extensions/Rubricate.plugins/sass/bundle.scss',
            './node_modules/medium-editor/dist/css/medium-editor.min.css'
        ],
    },

    output: {
        path: BUILD_DIR,
        filename: '[name].js'
    },

    resolve: {
        extensions: ['.ts', '.d.ts']
    },

    module: {
        loaders: [
            {test: /\.tsx?$/, loader: 'babel-loader?presets[]=es2015!awesome-typescript-loader' },
            {test: /\.jsx?$/, loader: 'babel-loader?presets[]=es2015' },
            {test: /\.css$/, loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader'})},
            {test: /\.scss$/, loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader!sass-loader'})},
        ]
    },

    plugins: [
        new ExtractTextPlugin({
            filename: '[name].css',
            disable: false,
            allChunks: true
        }),
    ]
};

if(!IS_PROD) {
    let LiveReloadPlugin = require('webpack-livereload-plugin');
    module.exports.plugins.push(new LiveReloadPlugin())
}