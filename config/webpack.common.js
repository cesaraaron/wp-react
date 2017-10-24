const path = require('path')
const paths = require('./paths')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  context: paths.src,
  entry: {
    index: [path.join(paths.src, 'index.js')]
  },
  output: {
    path: paths.dist,
    filename: 'index.js'
  },
  plugins: [
    new CleanWebpackPlugin(
      [paths.dist],
      {
        root: paths.root
      },
      { verbose: false }
    )
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
        options: {
          presets: ['env', 'react']
        }
      }
    ]
  }
}
