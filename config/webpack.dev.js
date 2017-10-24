const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const common = require('./webpack.common')
const path = require('path')
const paths = require('./paths')

module.exports = merge(common, {
  devtool: 'inline-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(paths.src, 'index.html')
    })
  ],
  devServer: {
    stats: 'errors-only',
    historyApiFallback: true,
    proxy: {
      '/wp-json': {
        target: 'http://wptest.io',
        secure: false,
        changeOrigin: true
      }
    }
  }
})
