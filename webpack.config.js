const webpack = require('webpack');

const path = require("path")
const UglifyJsPlugin = require("uglifyjs-webpack-plugin")

module.exports = {
  output: {
    filename: "build/static/js/bundle.min.js",
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "less-loader", "postcss-loader"],
      },
      {
        test: /\.less$/i,
        use: [{
          loader: "style-loader",
        },
        {
          loader: "css-loader",
        },
        {
          loader: "postcss-loader",
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
  plugins: [new UglifyJsPlugin(),
    new webpack.NormalModuleReplacementPlugin( /node_modules\/antd\/lib\/style\/index\.less/, path.resolve(__dirname, 'src/Components/Styles/antdReplacement.less') )
], 
  resolve: {
    extensions: ['.js', '.jsx']
  }
}