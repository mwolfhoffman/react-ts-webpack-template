/* eslint-disable no-undef */
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const DotenvWebpack = require("dotenv-webpack");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

require("dotenv").config({
  path: path.join(__dirname, ".env"),
});

module.exports = {
  entry: path.join(__dirname, "src", "index.tsx"),
  mode: "development",
  devServer: {
    static: false,
    port: process.env.APP_PORT,
    allowedHosts: "all",
    hot: true,
    historyApiFallback: {
      index: "/public/index.html",
    },
  },
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[name]__[local]--[hash:base64:5]",
                auto: /\.module\.css$/i,
              },
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|svg|gif)$/i,
        use: ["file-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".css", ".js", ".ts", ".tsx"],
  },
  output: {
    path: path.resolve(__dirname, "build/"),
    publicPath: "/",
    filename: "bundle.js",
  },
  devtool: "eval-cheap-source-map",
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public/index.html"),
      favicon: "public/favicon.ico",
    }),
    new ForkTsCheckerWebpackPlugin({ async: true }),
    new MiniCssExtractPlugin({ filename: "style.css" }),
    new DotenvWebpack({ systemvars: true, silent: true }),
  ],
};
