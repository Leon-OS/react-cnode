/**
 * Created by Maktub on 2018/1/25
 */

const path = require('path')

module.exports = {
  output: {
    path: path.join(__dirname, '../dist'),
    publicPath: '/public/'
  },
  module: {
    rules: [
      {
        enforce: 'pre', // 编译之前检测
        test: /.(js|jsx)$/,
        loader: 'eslint-loader',
        exclude: [
          path.resolve(__dirname, '../node_modules')
        ]
      },
      {
        test: /.jsx$/,
        loader: 'babel-loader',
        exclude: path.join(__dirname, '../node_modules')
      },
      {
        test: /.js$/,
        loader: 'babel-loader',
        exclude: path.join(__dirname, '../node_modules')
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  }
}
