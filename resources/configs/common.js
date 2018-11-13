const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const ManifestPlugin = require('webpack-manifest-plugin');

module.exports = function (env) {
  const extractCSS = new ExtractTextPlugin({
    // filename: '[name].[chunkhash].css',
    filename: '[name].css',
  });

  return {
    context: path.resolve(__dirname, '../src'),
    entry: {
        weather: './weather/index.js',
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          use: ['babel-loader'],
          exclude: /node_modules/,
        },
        {
          test: /\.css$/,
          use: extractCSS.extract({
            use: [
              {loader: 'css-loader'},
            ],
            fallback: "style-loader"
          })
        }, {
          test: /\.scss$/,
          use: extractCSS.extract({
            use: [
              {loader: 'css-loader', options: {importLoaders: 1}},
              {loader: "sass-loader"}
            ],
            fallback: "style-loader"
          })
        },
        {
          test: /\.(jpe?g|png|gif|svg)$/i,
          loaders: [
            'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
            'image-webpack-loader?bypassOnDebug&optipng.optimizationLevel=7&gifsicle.interlaced=false',
          ],
        },
      ],
    },
    output: {
      // filename: '[name].[chunkhash].js',
      filename: '[name].js',
      path: path.resolve(__dirname, '../build'),
      publicPath: '/build/',
    },
    performance: {
      hints: false,
    },
    plugins: [
      extractCSS,
      new ManifestPlugin({
        basePath: 'webpack/',
      }),
    ],
    resolve: {
      extensions: ['.js', '.jsx'],
    },
  }
};
