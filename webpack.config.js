// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const isProduction = process.env.NODE_ENV == 'production'

const stylesHandler = 'style-loader'

let [entry, plugins] = [
  './lib/index.ts',
  [],
]
if (!isProduction) {
  entry = './examples/index.tsx'
  plugins.push(new HtmlWebpackPlugin({
    template: './examples/index.html',
    filename: '/index.html',
  }))
}

const config = {
  entry,
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'index.js',
    publicPath: '/',
    clean: true,
  },
  devServer: {
    host: '0.0.0.0',
  },
  plugins,
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        loader: "babel-loader",
      },
      {
        test: /\.(ts|tsx)$/i,
        loader: 'ts-loader',
        exclude: ['/node_modules/'],
      },
      {
        test: /\.css$/i,
        use: [stylesHandler, {
          loader: "css-loader",
          options: {
            modules: {
              localIdentName: '[local]_[hash:base64:8]',
            },
          },
        }],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: 'asset',
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.css', '...'],
    alias: {
      '@': path.resolve(__dirname, 'lib'),
    }
  },
}

module.exports = () => {
  if (isProduction) {
    config.mode = 'production'
  } else {
    config.mode = 'development'
  }
  return config
}
