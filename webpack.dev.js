const path = require('path');
const common = require("./webpack.common.js");
const merge = require("webpack-merge");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge (common, {
    mode: `development`,
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
    },
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      compress: true,
      watchContentBase: true
    },
    module: {
      rules: [
        {
          test: /\.(sass|scss)$/,
          use: [
            "style-loader", //3. Inject styles into DOM
            "css-loader", //2. Turns css into commonjs
            "sass-loader" //1. Turns sass into css
          ]
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.pug', //'./src/pug/index.html'
    }),
    ],
});