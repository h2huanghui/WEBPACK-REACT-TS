const merge = require('webpack-merge')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const baseConfig = require('./webpack.config.base.js');
// const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');
const TerserPlugin = require('terser-webpack-plugin');
module.exports = merge(baseConfig, {
  mode: 'production',
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            pure_funcs: ["console.log"]
          },
        },
      }),
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    // new BundleAnalyzerPlugin()
  ]
})