const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',

  entry: "./src/index.tsx",

  output: {
      filename: "bundle.js",
      path: __dirname + "/dist"
  },

  devtool: "source-map",

  resolve: {
      extensions: [".ts", ".tsx", ".js", ".json"]
  },

  module: {
      rules: [
          { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
          { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
          {
            test: /\.css$/,
            use: [
              "style-loader",
              "css-loader",
            ]
          },
          {
            test: /\.scss$/,
            use: [
              "style-loader",
              "css-loader",
              {
                loader: 'sass-loader',
                options: {
                  includePaths: ['./node_modules']
                }
              }
            ]
          },
          {
            test: /\.svg$/,
            loader: 'svg-inline-loader'
          },
      ]
  },

  optimization: {
    splitChunks: {
      // include all types of chunks
      chunks: 'all'
    }
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.ejs',
      production: process.env.NODE_ENV === 'production',
    }),
  ],

  externals: {
      "react": "React",
      "react-dom": "ReactDOM"
  }
};