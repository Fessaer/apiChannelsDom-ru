const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const path = require("path")
const UglifyJsPlugin = require("uglifyjs-webpack-plugin")

module.exports = {
  output: {
    filename: "build/static/js/bundle.min.js",
  },
  plugins: [new MiniCssExtractPlugin({ filename: '[name].css' })],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader"],
      },
      {
        test: /\.less$/i,
        use: [
          
        {
          loader: "css-loader",
        },
        
        {
          loader: "less-loader",
          options: {
            lessOptions: {
              javascriptEnabled: true
            },
          },
        }],
      },
      {
          test: /\.jsx?$/,
          exclude: /(node_modules)/,
          loader: "babel-loader",
          
      }
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx']
  }
}