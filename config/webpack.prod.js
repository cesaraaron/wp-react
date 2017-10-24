const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const paths = require('./paths')

module.exports = merge(common, {
  devtool: 'source-map',
  plugins: [
    new UglifyJSPlugin({
      sourceMap: true
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new CleanWebpackPlugin(
      [paths.dist],
      {
        root: paths.root
      },
      { verbose: false }
    )
  ]
})
