const paths = require('./paths')

module.exports = {
  context: paths.src,
  entry: {
    index: ['react-hot-loader/patch', paths.join(paths.src, 'index.js')]
  },
  output: {
    path: paths.dist,
    filename: 'index.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        enforce: 'pre',
        loader: 'eslint-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  }
}
