const path = require("path")
const UglifyJsPlugin = require("uglifyjs-webpack-plugin")
const glob = require("glob")

module.exports = {
  output: {
    filename: "build/static/js/bundle.min.js",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
          test: /\.jsx?$/,
          exclude: /(node_modules)/,
          loader: "babel-loader",
          options:{
              presets:["@babel/preset-env", "@babel/preset-react"]    // используемые плагины
          }
      }
    ],
  },
  plugins: [new UglifyJsPlugin()],
  resolve: {
    extensions: ['.js', '.jsx']
  }
}