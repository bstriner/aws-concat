
const path = require('path')
const awsExternals = require('webpack-aws-externals');
//import path from 'path'
//import awsExternals from 'webpack-aws-externals'
//const fs = require('fs');
//const ESLintPlugin = require('eslint-webpack-plugin');
/*

const ESLintPlugin = require('eslint-webpack-plugin');
    "eslint": "7.13.0",
    "eslint-config-node": "4.1.0",
    "eslint-webpack-plugin": "2.3.0",
    */
entries = {
  func: {
    import: path.resolve(__dirname, 'index.js'),
    filename: 'index.js'
  }
}

module.exports = {
  //plugins: [new ESLintPlugin({ context: path.resolve(__dirname) })],
  context: path.resolve(__dirname),
  target: 'node',
  entry: entries,
  output: {
    libraryTarget: 'commonjs',
    path: path.resolve(__dirname, 'build')
  },
  //sourceType: 'module',
  externals: [awsExternals()],
  module: {
    strictExportPresence: true,
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          //options: {
          //  presets: [
          //    ['@babel/preset-env', { targets: { node: "current" } }]
          //  ],
          //plugins: ['@babel/plugin-proposal-object-rest-spread']
          //}
        }
      }
    ]
    /*
    rules: [
      // ...
      // Rewrites and emits
      {
        test: /\.js$/,
        loader: "bindings-loader",
      },
    ],
    */
  }
}
