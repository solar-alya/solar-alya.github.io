var webpack = require("webpack");

module.exports = {
    entry: "./js/main",
    resolve: {
        modulesDirectories: [
            "."
        ]
    },
    output: {
        publicPath: "js/",
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: "babel-loader"
            }
        ]
    }
};
