const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const ROOTPATH = path.join(process.cwd());
const APP_PATH = path.join(ROOTPATH, '/src');

const templateURI = (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test')? '/template_test.html':'/template.html';

module.exports = {
  entry: {
    'index': path.join(APP_PATH, 'entry.js'),
  },
  // entry: path.join(APP_PATH, 'entry.js'),
  output: {
    publicPath: '/',
    filename: 'static/js/[name].[chunkhash:8].js',
    // chunkFilename: 'js/[name].[chunkhash].js',
    path: path.join(ROOTPATH, '/dist')
  },

  module: {
    rules: [{
      test: /\.js$/,
      use: 'babel-loader',
      exclude: /node_modules/
    },
    {
      test: /\.tsx?$/,
      use: ['babel-loader','ts-loader'],
      exclude: /node_modules/
    },
    {
      test: /\.css$/,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: true,
            config: {
              path: 'postcss.config.js'
            },
          }
        }
      ]
    },
    {
      test: /\.less$/,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: true,
            config: {
              path: 'postcss.config.js'
            },
          }
        },
        {
          loader: 'less-loader',
          options: {
            modifyVars: {
              'hack': `true; @import "${APP_PATH}/styles/theme.less";`,
            },
            javascriptEnabled: true,
          },
        }
      ]
    },
    {
      test: /\.(eot|woff|ttf|woff2|svg|gif|png|jpg)(\?|$)/,
      use: {
        loader: 'file-loader',
        options: {
          name: '[folder]/[name].[hash:8].[ext]',
          outputPath: './static/assets'
        }
      }
    }
    ]
  },
  resolve: {
    alias: {
      '@': `${APP_PATH}/`,
      '@icon': `${APP_PATH}/components/Icon`,
      '@ant-design/icons/lib/dist$': `${APP_PATH}/utils/antdIcon.js`
    }
  },
  optimization: {
    concatenateModules: false,
    splitChunks: {
      cacheGroups: {
        libs: {
          test: /(react|react-dom|react-dom-router|babel-polyfill|axios|qs|intl|core-js)/,
          chunks: 'all',
          name: 'libs',
          priority: 10,
          enforce: true
        },
        ui: {
          test: /(antd|lottie-web)/,
          chunks: 'all',
          name: 'ui',
          priority: 9,
          enforce: true
        },
        uiRc: {
          test: /(rc-.*)/,
          chunks: 'all',
          name: 'ui-rc',
          priority: 9,
          enforce: true
        },
        common: {
          chunks: 'all',
          minChunks: 2,
          name: 'common',
          priority: 8, 
          enforce: true
        }
      }
    }
  },
  // performance: {
  //   hints: 'warning'
  // },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(APP_PATH, templateURI),
      chunks: ['libs','index','ui','ui-rc','common'],
      favicon: path.join(APP_PATH, 'assets/favicon/favicon.ico'),
    }),
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[contenthash:8].css',
      chunkFilename: 'static/css/[name].[contenthash:8].css',
      allChunks: true
    }),
    new webpack.ContextReplacementPlugin(
      /moment[\/\\]locale/,
      /(en-gb|zh-cn)\.js/
    )
  ]
};
