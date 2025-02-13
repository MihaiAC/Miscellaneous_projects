const webpack = require("webpack");
const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const config = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    // new CopyPlugin({
    //   patterns: [{ from: "src/form.html" }, { from: "src/success.html" }],
    // }),
    new HtmlWebpackPlugin({
      template: "./src/form.html",
      filename: "form.html",
    }),
  ],
};

module.exports = config;
