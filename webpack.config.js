const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const promisify = require('util').promisify;
const execFile = require('child_process').execFile;

const configPromise = new Promise((resolve, reject) => {
  execFile('git', ['rev-parse', 'HEAD'], (_, stdout) => {
    resolve({
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
  
      plugins: [
        new webpack.DefinePlugin({
          'process.env': {
            NODE_ENV: JSON.stringify(process.env.NODE_ENV),
            GIT_REVISION_HASH: JSON.stringify(stdout.trim()),
          },
        }),
        //new UglifyJsPlugin()
      ]
    });
  });
});

module.exports = () => configPromise;
