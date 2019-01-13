const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

module.exports = function(env) {
  return {
    context: path.resolve(__dirname, "../src"),
    entry: {
      films: "./films/index.js",
      chess: "./chess/index.js",
    },
    externals: {
      jquery: "jQuery",
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          use: ["babel-loader"],
          exclude: /node_modules/,
        },
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, { loader: "css-loader" }],
        },
        {
          test: /\.scss$/,
          use: [
            MiniCssExtractPlugin.loader,
            { loader: "css-loader", options: { importLoaders: 1 } },
            { loader: "sass-loader" },
          ],
        },
        {
          test: /\.(jpe?g|png|gif|svg)$/i,
          loaders: [
            "file-loader?hash=sha512&digest=hex&name=[hash].[ext]",
            // "image-webpack-loader?bypassOnDebug&optipng.optimizationLevel=7&gifsicle.interlaced=false",
          ],
        },
      ],
    },
    output: {
      filename: "[name].js",
      path: path.resolve(__dirname, "../../../solar-alya.github.io/sites/build/"),
      // path: path.resolve(__dirname, "../../sites/build/"),
      publicPath: "/build/",
    },
    performance: {
      hints: false,
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: "[name].css",
      }),
    ],
    resolve: {
      extensions: [".js", ".jsx"],
    },
  };
};
