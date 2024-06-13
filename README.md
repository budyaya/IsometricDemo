#

```shell
npm init -y
npm install webpack webpack-cli
```

```js
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist')
  }
};
```

## 打包
```shell
npx webpack
```

```shell
npx webpack --mode=development
```

```shell
npx webpack --mode=production
```

```shell
npx webpack --watch
```

## 

```shell
npm install html-webpack-plugin
```

```js
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ]
};
```

##

```shell
npm install webpack-dev-server
npx webpack serve

npm install ts-loader
```

```js
module.exports = {
  entry: './src/index.ts',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader'
      }
    ]
  }
};
```


