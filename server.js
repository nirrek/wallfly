/**
 * Webpack hot-code reloading server for use during development.
 */
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true
}).listen(3000, '0.0.0.0', function (err) {
  if (err) {
    return console.log(err);
  }
  console.log('Listening at 0.0.0.0:3000');
});
