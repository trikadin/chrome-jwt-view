const
  path = require('path'),
  webpack = require('webpack');

const src = path.join(__dirname, 'src');

module.exports = {
  verbose: true,

  context: src,

  entry: {
    background: './background.js',
    content: './content.js'
  },

  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /bower_components/,
        loader: 'babel',
        query: {
          stage: 0,

          optional: [
            'asyncToGenerator',
            'spec.undefinedToVoid'
          ],

          blacklist: [
            'es3.memberExpressionLiterals',
            'es3.propertyLiterals',

            'es5.properties.mutators',

            'regenerator',
            'es6.blockScoping',
            'es6.constants',
            'es6.forOf',
            'es6.literals',
            'es6.properties.computed',
            'es6.properties.shorthand',
            'es6.spread',
            'es6.templateLiterals'
          ]
        }
      },
      {
        test: /\.hbs$/,
        loader: 'handlebars'
      },
      {
        test: /\.css$/,
        loader: 'style!css'
      }
    ]
  },

  plugins: process.env.NODE_ENV === 'production' ? [new webpack.optimize.UglifyJsPlugin()] : null,

  resolve: {
    modulesDirectories: ['bower_components']
  }
};
