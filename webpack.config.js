"use strict";

module.exports = {
  entry: './browser.js',
  output: {
    path: __dirname,
    filename: 'public/js/bundle.js'
  },
  module: {
    loaders: [
      { test: /\.jsx$/, loader: 'jsx-loader?harmony' }
    ]
  }
};
