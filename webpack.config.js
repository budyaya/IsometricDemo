const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    // 开发模式
    mode: 'development',

    // 入口文件是src目录下的`index.js`文件
    entry: path.join(__dirname, 'src', 'index.js'),
    
    resolve: {
        alias: {
            spritejs: 'spritejs/dist/spritejs.js',
        }
    },
    output: {
        // 把所有依赖的模块合并输出到一个 index.js 文件
        filename: 'index.js',

        // 输出文件都放到 dist 目录下
        path: path.join(__dirname, 'dist')
    },
    plugins: [
        new HtmlWebpackPlugin({
        title: "demo",
        template: 'index.html'
    }),
    new CopyPlugin({
      patterns: [
        { from: 'assets', to: path.join(__dirname, 'dist', 'assets'), globOptions: { ignore: ['**/.*'] } },
      ],
    })],
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: 'ts-loader'
        }
      ]
    }
}