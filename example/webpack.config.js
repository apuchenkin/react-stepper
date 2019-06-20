const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',

  entry: {
    'simple': "./src/simple/index.tsx",
    'vertical': "./src/vertical/index.tsx",
    'full': "./src/advanced/index.tsx",
  },

  output: {
      filename: "[name]/index.js",
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

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.ejs',
      chunks: ['simple'],
      filename: 'simple/index.html',
      production: process.env.NODE_ENV === 'production',
    }),
    new HtmlWebpackPlugin({
      template: './src/index.ejs',
      chunks: ['vertical'],
      filename: 'vertical/index.html',
      production: process.env.NODE_ENV === 'production',
    }),
    new HtmlWebpackPlugin({
      template: './src/index.ejs',
      chunks: ['full'],
      filename: 'full/index.html',
      production: process.env.NODE_ENV === 'production',
    }),
  ],

  externals: {
      "react": "React",
      "react-dom": "ReactDOM"
  }
};