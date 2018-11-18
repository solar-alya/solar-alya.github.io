const merge = require("webpack-merge");
const webpack = require("webpack");
const commonConfig = require("./common")("development");

module.exports = merge(commonConfig, {
  devtool: "cheap-module-eval-source-map",
  mode: "development",
  plugins: [new webpack.NamedModulesPlugin()],
});
