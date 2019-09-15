const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

const config = {
  entry: ['babel-polyfill', './src/index.js'],

  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'main.js'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['@babel/preset-env', '@babel/preset-react']
        },
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'sass-loader',
            options: {
              sassOptions: {
                includePaths: ['./node_modules','./src']
              }
            }
          }
        ],
      },
    ],
  },

  plugins: [
    new CopyPlugin([
      { from: 'static' }
    ])
  ],

  devServer: {
    contentBase: path.resolve(__dirname, 'build'),
    compress: true,
    proxy: {
      '/api': 'http://localhost:3003'
    },
    port: 3000,
  },

  devtool: 'source-map',
}

module.exports = config