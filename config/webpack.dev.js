const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const common = require('./webpack.common')
const paths = require('./paths')

module.exports = merge(common, {
  devtool: 'inline-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: paths.join(paths.src, 'index.html')
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
