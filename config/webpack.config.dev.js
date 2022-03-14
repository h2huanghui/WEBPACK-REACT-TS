const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base.js')

module.exports = merge(baseConfig, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    disableHostCheck: true,
    contentBase: '../dist',
    // host: 'test.crov.com',
    host: '127.0.0.1',
    // useLocalIp: true,
    port: '2020',
    historyApiFallback: true
  }
})


