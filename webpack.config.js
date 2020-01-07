module.exports = {
  entry: "./server.jsx",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      }
    ]
  },
  resolve: {
    extensions: ["*", ".js", ".jsx"]
  },
  output: {
    path: __dirname + "/dist",
    publicPath: "/",
    filename: "server.js"
  },
  devServer: {
    contentBase: "./dist"
  },
  target: "node",
  mode: "development"
};
