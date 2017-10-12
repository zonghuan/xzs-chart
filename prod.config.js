var webpack = require('webpack')

module.exports = {
  entry:{
    'chart':'./src/index.js'
  },
  externals:{
    'd3':'d3'
  },
  output:{
    filename:'chart.js',
    path:__dirname,
    libraryTarget:'umd'
  },
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
  plugins:[
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        screw_ie8: true,
        warnings: false
      }
    })
  ]
}
