const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',

  // entry: [
  //   "./src/index.tsx",
  //   "./src/index.scss"
  // ],

  entry: "./src/index.tsx",

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "react-stepper.js",
    library: "reactStepper",
    libraryTarget: 'umd'
  },

  devtool: "source-map",

  resolve: {
      extensions: [".ts", ".tsx", ".js"]
  },

  module: {
      rules: [
          { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
          { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
          {
            test: /\.scss$/,
            use: [
              MiniCssExtractPlugin.loader,
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
    new MiniCssExtractPlugin({
      filename: 'react-stepper.css'
    }),
  ],

  optimization: {
    splitChunks: {
      // include all types of chunks
      chunks: 'all'
    }
  },

  externals: [
    'react',
    'react-dom',
    'classnames',
    'react-state-effects',
    '@material/button',
    '@material/linear-progress',
    '@material/theme',
    '@material/typography'
  ]
};