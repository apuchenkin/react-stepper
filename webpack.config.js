const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');

module.exports = {
  mode: 'development',

  entry: {
    'react-stepper': "./src/index.tsx",
    'react-stepper.min': "./src/index.tsx",
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "[name].js",
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
              {
                loader: 'css-loader',
                options: {
                  sourceMap: true,
                },
              },
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: true,
                  plugins: () => [autoprefixer()]
                }
              },
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: true,
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
    minimize: true,
    minimizer: [
      new TerserPlugin({
        sourceMap: true,
        include: /\.min\.js$/
      }),
    ],
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