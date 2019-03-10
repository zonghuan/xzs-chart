const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

var entry = {
  "circle":"./example/circle.js",
  "line":"./example/line.js",
  'dashBoard':'./example/dashBoard.js',
  'columnar':'./example/columnar.js',
  'depth':'./gause/depth/depth.js'
}
var plugins = []

for(var i in entry){
  plugins.push(
    new HtmlWebpackPlugin({
      chunks:[i],
      title: 'Output Management',
      template:'example/index.html',
      filename:`${i}.html`
    })
  )
}

module.exports = {
  entry,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['es2015']
        }
      }
    ]
  },
  plugins,
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  }
};
