const config = require('./config')

module.exports = {
  context: config.paths.src,
  entry: config.entry,
  devtool: 'source-map',
  output: {
    path: config.paths.dist,
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
        options: config.babel
      }
    ]
  }
}
