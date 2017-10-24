const path = require('path')
const paths = require('./paths')

module.exports = {
  context: paths.src,
  entry: {
    index: ['react-hot-loader/patch', path.join(paths.src, 'index.js')]
  },
  output: {
    path: paths.dist,
    filename: 'index.js'
  },
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
          presets: [['env', { modules: false }], 'react'],
          plugins: ['react-hot-loader/babel']
        }
      }
    ]
  }
}
