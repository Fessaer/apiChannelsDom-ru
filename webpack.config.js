const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require("path")

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  entry: {
    main: path.resolve(__dirname, './src/index.jsx'),
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: "[name].bundle.js",
  },
  plugins: [
    new MiniCssExtractPlugin({
    filename: 'bundle.css'
  }), 
  new NodePolyfillPlugin(),
  new webpack.HotModuleReplacementPlugin(),
  new CleanWebpackPlugin(),
  new HtmlWebpackPlugin({
    title: 'webpack Boilerplate',
    template: path.resolve(__dirname, './public/index.html'),
    filename: 'index.html', 
  })],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [ MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
          }, 
        ],
      },
      {
        test: /\.less$/i,
        use:[ MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
          }, 
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true
              },
            }
          }
        ]
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