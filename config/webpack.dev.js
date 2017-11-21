require('dotenv').config()
const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const common = require('./webpack.common')

const wpUrl = process.env.WP_URL || 'http://wptest.io'

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
        target: wpUrl,
        secure: false,
        changeOrigin: true
      }
    }
  }
})
