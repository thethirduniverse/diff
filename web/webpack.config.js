const webpack = require('webpack')
const path = require('path')

module.exports = {
  entry: "./js/debatable.jsx",
  output: {
    filename: "bundle.js",
    path: __dirname + '/../server/public'
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'js'),
      'actions': path.resolve(__dirname, 'js', 'actions'),
      'components': path.resolve(__dirname, 'js', 'components'),
      'controllers': path.resolve(__dirname, 'js', 'controllers'),
      'helpers': path.resolve(__dirname, 'js', 'helpers'),
      'reducers': path.resolve(__dirname, 'js', 'reducers'),
      'setups': path.resolve(__dirname, 'js', 'setups')
    }
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exlucde: /(node_modules)/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react', 'stage-0'],
          cacheDirectory: './tmp/babel'
        },
        plugins:[
          'transform-es2015-arrow-functions',
          'transform-object-rest-spread'
        ]
      },
      {
        // http://stackoverflow.com/questions/29080148/expose-jquery-to-real-window-object-with-webpack
        test: require.resolve('jquery'),
        loader: 'expose?jQuery!expose?$'
      }
    ]
  },
  devtool: 'eval-cheap-module-source-map',
};
