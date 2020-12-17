const path = require('path');
const common = require("./webpack.common.js");
const merge = require("webpack-merge");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = merge (common, {
    mode: `production`,
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[chunkhash].js',
    },
    module: {
      rules: [
        {
            test: /\.(sass|scss)$/,
            use: [
              {
                loader: MiniCssExtractPlugin.loader,
              },
             'css-loader', 'postcss-loader', 'sass-loader',
            ],
          },
      ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: 'style.[contenthash].css',
            chunkFilename: '[id].css',
            ignoreOrder: false, // Enable to remove warnings about conflicting order
        }),
        new CopyWebpackPlugin([
            {from:'src/images',to:'img'},
            {
              from:'src/pug/blocks/*/*.+(png|svg|jpg|gif)',
              to:'img',
              flatten: true
            },
            {
              from:'src/pug/pages/*/*.+(png|svg|jpg|gif)',
              to:'img',
              flatten: true
            }
        ]),
        new HtmlWebpackPlugin({
            hash: true,
            template: './src/index.pug', //'./src/pug/index.html'
            filename: './index.html'
        }),
    ]
});