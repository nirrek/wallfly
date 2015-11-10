/**
 * Webpack production configuration.
 */
var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './scripts/app.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  plugins: [
    new webpack.DefinePlugin({
      __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true')),
    })
  ],
  module: {
    loaders: [
      {
        test: /\.json$/,
        loaders: [
          'json-loader'
        ]
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: [
          'babel-loader'
        ]
      },
      {
        test: /\.s?css$/,
        loaders: [
          'style-loader',
          'css-loader',
          'autoprefixer-loader',
          'sass-loader',
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
          loaders: [
            'file?hash=sha512&digest=hex&name=[hash].[ext]',
            'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
          ]
      }
    ]
  },
  // Joi depends on node core modules from a newer version of node.
  // This stubs them out during the webpack build.
  // See here https://webpack.github.io/docs/configuration.html#node
  node: {
    net: "empty",
    dns: "empty",
  },
};
