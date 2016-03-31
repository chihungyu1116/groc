var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: {
    hackathon: [
      './fe'
    ]
  },
  output: {
    path: path.join(__dirname, 'app', 'assets', 'javascripts'),
    filename: '[name]-bundle.js'
  },
  resolve: {
    modulesDirectories: ['node_modules', 'shared'],
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['babel']
      }
    ]
  },
  plugins: [
    new webpack.NoErrorsPlugin()
  ],
  devtool: 'inline-source-map'
};