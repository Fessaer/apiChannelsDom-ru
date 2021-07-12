const webpack = require('webpack');
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const path = require("path")

module.exports = {
  target: 'web',
  mode: 'development',
  devtool: 'source-map',
  entry: {
    main: path.resolve(__dirname, './src/index.jsx'),
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: "[name].bundle.js",
  },
  
  plugins: [
  new NodePolyfillPlugin(),
  new webpack.HotModuleReplacementPlugin(),
  new CleanWebpackPlugin(),
  new HtmlWebpackPlugin({
    title: 'webpack Boilerplate',
    template: path.resolve(__dirname, './INDEX/index.html'),
    filename: 'index.html', 
})
],



devServer: {
  historyApiFallback: true,
  contentBase: path.resolve(__dirname, './dist'),
  open: true,
  compress: true,
  hot: true,
  port: 8080,
},

module: {
    rules: [
      {
        test: /\.css$/,
        use: [ 
          {
            loader: "style-loader",
          },
          {
            loader: 'css-loader',
          }, 
        ],
      },
      {
        test: /\.less$/i,
        use:[
          {
            loader: "style-loader",
          }, 
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