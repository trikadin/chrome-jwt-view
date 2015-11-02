const path = require('path');

const src = path.join(__dirname, 'src');

module.exports = {
  verbose: true,

  entry: {
    contest: __dirname,
    entry: {
      background: path.join(src, 'background.js'),
      context: path.join(src, 'content.js')
    }
  },

  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  },

  module: {
    test: /\.js$/,
    exclude: /bower_components/,
    loader: 'babel',
    query: {
      blacklist: [
        'regenerator',
        'es6.blockScoping',
        'es6.constants',
        'es6.forOf',
        'es6.templateLiterals'
      ]
    }
  },

  resolve: {
    modulesDirectories: ['bower_components']
  }
};
