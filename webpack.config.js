const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Copy = require('copy-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: './src/scripts.js',
    output: {
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html'
        }),
        new Copy([
            { from: './src/assets/*', to: './', flatten: true, cache: {key: 'v1'} },
            { from: './src/sw.js', to: './', flatten: true }
        ])
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                }

            },
            {
                test: /\.(s*)css$/,
                use: [
                    { loader: MiniCssExtractPlugin.loader },
                    { loader: 'css-loader',
                        options: {
                            minimize: true,
                        }
                    },
                    { loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: [
                                require('cssnano'),
                                require('autoprefixer')
                            ]
                        }
                    },
                    { loader: 'sass-loader' },
                ]
            },
        ]
    }
};