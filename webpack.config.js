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
    modules: ['node_modules','bower_components'],
    descriptionFiles: ['package.json', 'bower.json']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        exclude: /(node_modules)/,
        use: ['babel-loader', 'source-map-loader']
      }
    ]
  },
  devtool: "source-map",
  plugins: [
    new webpack.optimize.UglifyJsPlugin ({
      sourceMap: true
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      "windows.jQuery": 'jquery',
      Masonry: 'masonry-layout'
    })
  ]
};
