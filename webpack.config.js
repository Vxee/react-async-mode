const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  entry: './main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: '/node_modules/',
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/env', '@babel/react']
          }
        }
      }
    ]
  },
  devServer: { // 配置webpack-dev-server， 在本地启动一个服务器运行
    host: 'localhost', // 服务器的ip地址 希望服务器外可以访问就设置 0.0.0.0
    port: 8088, // 端口
    open: true, // 自动打开页面
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    hot: true,
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: path.resolve(__dirname, 'dist/index.html'), // 生成的html文件存放的地址和文件名
      template: path.resolve(__dirname, 'index.html'), // 基于index.html模板进行生成html文件
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
};