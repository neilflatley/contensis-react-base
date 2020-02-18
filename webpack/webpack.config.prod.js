const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const ReactLoadablePlugin = require('react-loadable/webpack')
  .ReactLoadablePlugin;
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const WebpackShellPlugin = require('webpack-shell-plugin');
const Visualizer = require('webpack-visualizer-plugin');

const BASE_CONFIG = require('./webpack.config.base');
const defineConfigProd = require('./define-config-webpack').prod;

const target = process.env.BROWSERSLIST_ENV;
const isModern = target === 'modern';

const CLIENT_PROD_CONFIG = {
  name: `webpack-client-prod-config [${target}]`,
  target: 'web',
  mode: 'production',
  stats: 'errors-only',
  entry: {
    app: [
      isModern
        ? path.resolve(__dirname, '../src/client/polyfills.modern.js')
        : path.resolve(__dirname, '../src/client/polyfills.legacy.js'),
      path.resolve(__dirname, '../src/client/client-entrypoint.js'),
    ],
  },
  output: {
    path: path.resolve(__dirname, `../dist`),
    filename: `static/${target}/js/[name].[chunkhash].js`,
    chunkFilename: `static/${target}/js/[name].[chunkhash].js`,
  },
  optimization: {
    splitChunks: {
      name: false,
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'initial',
        },
      },
    },
    runtimeChunk: 'single',
  },
  plugins: [
    new webpack.DefinePlugin(defineConfigProd),
    new HtmlWebPackPlugin({
      template: path.resolve(__dirname, '../public/index.ejs'),
      filename: path.resolve(__dirname, `../dist/${target}/index.html`),
      inject: false,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
        xhtml: true,
      },
    }),
    new HtmlWebPackPlugin({
      template: path.resolve(__dirname, '../public/index_fragment.ejs'),
      filename: path.resolve(
        __dirname,
        `../dist/${target}/index_fragment.html`
      ),
      inject: false,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
        xhtml: true,
      },
    }),
    new HtmlWebPackPlugin({
      template: path.resolve(__dirname, '../public/index_static.ejs'),
      filename: path.resolve(__dirname, `../dist/${target}/index_static.html`),
      inject: false,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
        xhtml: true,
      },
    }),
    new ReactLoadablePlugin({
      filename: path.resolve(
        __dirname,
        `../dist/${target}/react-loadable.json`
      ),
    }),
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: ['Production bundle has been created.'],
        notes: ['Start production server with command ``npm run server``'],
      },
    }),
    new CopyWebpackPlugin([
      {
        ignore: ['index.html', 'index.ejs'],
        from: path.resolve(__dirname, '../public'),
        to: path.resolve(__dirname, '../dist/static'),
      },
    ]),
    new ImageminPlugin({
      test: /\.(jpe?g|png|gif|svg)$/i,
      optipng: {
        optimizationLevel: 9,
      },
    }),
    new Visualizer({
      filename: `./${target}/client-stats.html`,
    }),
    new WebpackShellPlugin({
      onBuildEnd: [
        'echo "Executing Webpack post build scripts..."',
        'node node_modules/zengenti-buildstartup-package',
      ],
    }),
  ],
};

module.exports = [merge(BASE_CONFIG, CLIENT_PROD_CONFIG)];
