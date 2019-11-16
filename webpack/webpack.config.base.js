const path = require('path');
const webpack = require('webpack');
const defineConfig = require('./define-config-webpack').base;
const ASSET_PATH = '/';

module.exports = {
  output: {
    publicPath: ASSET_PATH,
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      '~': path.resolve(__dirname, '../src/app'),
    },
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'stylelint-custom-processor-loader',
            options: {
              emitWarning: true,
            },
          },
          { loader: 'eslint-loader' },
        ],
      },
      {
        test: /\.jsx?$/,
        include: [
          path.resolve('src'),
          // These dependencies have es6 syntax which ie11 doesn't like.
          path.resolve('node_modules/contensis-delivery-api'),
          path.resolve('node_modules/zengenti-appserver-package'),
        ],
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(gif|png|jpe?g|svg|ico)$/i,
        use: [
          'file-loader?name=static/img/[name].[ext]?[hash]',
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true, // webpack@1.x
              disable: true, // webpack@2.x and newer
              name: 'static/[hash].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [new webpack.DefinePlugin(defineConfig)],
};
