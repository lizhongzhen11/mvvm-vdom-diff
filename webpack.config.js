const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: path.resolve('index.js'),
  output: {
    path: path.resolve(__dirname, '/dist'),
    filename: 'mvvm-vdom-diff.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'index.html')
    })
  ]
}