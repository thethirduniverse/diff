const webpack = require('webpack')

module.exports = {
  entry: "./js/debatable.jsx",
  output: {
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exlucde: /(node_modules)/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react', 'stage-0']
        }
      },
      {
        // http://stackoverflow.com/questions/29080148/expose-jquery-to-real-window-object-with-webpack
        test: require.resolve('jquery'),
        loader: 'expose?jQuery!expose?$'
      }
    ]
  }
};
