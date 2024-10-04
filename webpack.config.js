const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "development",
  entry: {
    app: ["./src/index.js"],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash].js",
    publicPath: "/",
    clean: true,
  },
  devServer: {
    allowedHosts: "all",
    historyApiFallback: true,
    hot: true,
    client: {
      overlay: false,
    },
    static: path.resolve(__dirname, "dist"),
    port: 8080,
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: "/node_modules/",
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              api: "modern-compiler",
            },
          },
        ],
      },
      {
        test: /\.(svg)$/,
        use: ["raw-loader", "svg-url-loader"],
      },
      {
        test: /\.hbs$/,
        loader: "handlebars-loader",
      },
    ],
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: "./src/index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: "./src/img/", to: "./img" }],
    }),
  ],
  resolve: {
    extensions: [".json", ".scss", ".svg", "", ".js"],
    modules: ["node_modules"],
    alias: {
      "/img": path.resolve(__dirname, "src/img"),
    },
  },
};
