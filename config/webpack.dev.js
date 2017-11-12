const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const common = require('./webpack.common')

module.exports = merge(common, {
  devtool: 'inline-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      title: 'wp-react'
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    stats: 'errors-only',
    hot: true,
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
