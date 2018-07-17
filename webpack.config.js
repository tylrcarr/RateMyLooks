const path = require('path');

module.exports = {
  entry: ['./src'],
  output: {
    path: path.join(__dirname, 'public/js'),
    filename: 'app.built.js'
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  }
};
