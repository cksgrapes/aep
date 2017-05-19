var path    = require('path');
var webpack = require("webpack");

module.exports = {
  entry: {
    'common': './dev/common.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'htdocs/assets/js/'),
    sourceMapFilename: 'maps/[file].map'
  },
  resolve: {
    modules: ['bower_components']
  },
  devtool: "source-map",
  plugins: [
    new webpack.optimize.UglifyJsPlugin ({
      sourceMap: true
    })
  ]
};
