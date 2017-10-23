const config = require('./config')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  context: config.paths.src,
  entry: config.entry,
  output: {
    path: config.paths.dist,
    filename: 'index.js'
  },
  plugins: [
    new CleanWebpackPlugin([config.paths.dist], {
      root: config.paths.root
    })
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        enforce: 'pre',
        loader: 'eslint-loader'
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: config.babel
      }
    ]
  }
}
