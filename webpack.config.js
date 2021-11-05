const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const MinimizeCssWebpackPlugin = require('css-minimizer-webpack-plugin');
const EslintWebpackPlugin = require('eslint-webpack-plugin');

let config = {
    context: path.resolve(__dirname, 'src'),
    entry: {
        main: path.resolve(__dirname, 'src/js/index.js'),
        analytics: path.resolve(__dirname, 'src/js/analytics.js')
    },
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        alias: {
            src: path.resolve(__dirname, 'src'),
            assets: path.resolve(__dirname, 'src/assets'),
            html: path.resolve(__dirname, 'src/html'),
            js: path.resolve(__dirname, 'src/js'),
            models: path.resolve(__dirname, 'src/models'),
            styles: path.resolve(__dirname, 'src/styles'),
        }
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        },
        runtimeChunk: 'single'
    },
    devServer: {
        port: 4040,
        watchFiles: [path.resolve(__dirname, 'src/html/*.html')]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css'
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['css-loader']
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource'
            }
        ]
    }
};

module.exports = (env, argv) => {
    if(argv.mode === 'development'){
        config.mode = 'development';
        config.devServer.hot = true;
        config.devtool = 'source-map';
        config.plugins.unshift(new HTMLWebpackPlugin({
            template: path.resolve(__dirname, 'src/html/index.html'),
            scriptLoading: 'blocking',
            favicon: path.resolve(__dirname, 'src/assets/images/favicon.ico')
        }));
        config.plugins.push(new EslintWebpackPlugin());
        config.module.rules[0].use.unshift('style-loader');
    }
    if (argv.mode === 'production') {
        config.mode = 'production';
        config.devServer.hot = false;
        config.optimization.minimize = true;
        config.optimization.minimizer = [new MinimizeCssWebpackPlugin(), '...']; //три точки, чтобы использовал дефолтный минимайзер Вебпака (Terser) для JS
        config.plugins.unshift(new HTMLWebpackPlugin({
            template: path.resolve(__dirname, 'src/html/index.html'),
            scriptLoading: 'blocking',
            favicon: path.resolve(__dirname, 'src/assets/images/favicon.ico'),
            minify: {
                collapseWhitespace: true
            }
        }));
        config.module.rules[0].use.unshift(MiniCssExtractPlugin.loader);
    }
    return config
};
