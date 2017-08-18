const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: './src/main.js',

  plugins: [

    new webpack.HotModuleReplacementPlugin() // Enable HMR

  ],

  resolve: {
    modules: ['node_modules', 'src']
  },

  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.txt$/,
        use: 'raw-loader'
      }
    ]
  },

  devServer: {
    hot: true, // Tell the dev-server we're using HMR
    contentBase: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  }
}
