const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const promisify = require('util').promisify;
const execFile = require('child_process').execFile;

const IS_PROD = process.env.NODE_ENV === 'production';
const plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      GIT_REVISION_HASH: JSON.stringify(process.env.GIT_REVISION_HASH),
    },
  }),
];

if (IS_PROD) {
  plugins.push(new UglifyJsPlugin());
}

module.exports = {
  entry: {
    sw: path.resolve(__dirname, 'src', 'sw.js')
  },

  output: {
    path: path.resolve(__dirname, 'static'), filename: '[name].js'
  },

  module: {
    rules: [
      // use bable
      { test: /\.js?$/, use: 'babel-loader', exclude: /node_modeules/ },
      // use typescript
      // { test: /\.tsx?$/, use: 'awesome-typescript-loader', exclude: /node_modlues/ },
    ],
  },

  plugins: plugins,
}