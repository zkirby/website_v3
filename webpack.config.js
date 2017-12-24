var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'src/');
var APP_DIR = path.resolve(__dirname, 'src/');

var config = {
  entry: APP_DIR + '/index.js',
  module: {
  	loaders: [
  		{
  			loader: 'babel-loader',
  			query: {
  				presets: ['react', 'es2015'],
  				plugins: ['transform-class-properties', 'transform-decorators-legacy']
  			}
  		}
  	]
  },
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  }
};

module.exports = config;