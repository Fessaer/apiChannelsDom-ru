const webpack = require('webpack');
const path = require("path")
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  entry: {
    main: path.resolve(__dirname, './src/index.jsx'),
  },
  output: {
    filename: "report.min.js",
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'report.min.css', insert: function() {}
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.less$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: "css-loader" },
          {
            loader: "less-loader",
            options: {
              lessOptions: {
                javascriptEnabled: true
              }
            },
          }
        ],
      },
      {
          test: /\.jsx?$/,
          exclude: /(node_modules)/,
          loader: "babel-loader"
      }
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        test: /\.js(\?.*)?$/,
      }),
      new CssMinimizerPlugin({
        minify: CssMinimizerPlugin.cleanCssMinify
      }),
    ],
  }
}