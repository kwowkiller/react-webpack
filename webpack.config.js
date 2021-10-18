const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CustomPlugin = require('./custom-plugin');

module.exports = function (webpackEnv) {
  const isProduction = webpackEnv.production;
  if (isProduction) {
    process.env.BABEL_ENV = 'production';
    process.env.NODE_ENV = 'production';
  } else {
    process.env.BABEL_ENV = 'development';
    process.env.NODE_ENV = 'development';
  }
  return {
    mode: isProduction ? 'production' : 'development',
    devServer: {
      port: 8080,
      historyApiFallback: true,
      open: true,
    },
    devtool: isProduction ? false : 'cheap-module-source-map',
    // entry: ['babel-polyfill', path.resolve(__dirname, './src/index.tsx')],
    entry: path.resolve(__dirname, './src/index.tsx'),
    output: {
      path: path.resolve(__dirname, './build'),
      filename: 'static/js/[name].[chunkhash:8].js',
      chunkFilename: 'static/js/[name].[chunkhash:8].chunk.js',
      assetModuleFilename: isProduction ? 'images/[hash][ext][query]' : 'images/[name][ext][query]',
    },
    optimization: {
      minimize: isProduction,
      splitChunks: {
        chunks: 'all',
        name: false,
      },
      runtimeChunk: 'single',
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    plugins: [
      new CustomPlugin(),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, './public/index.html'),
      }),
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: 'styles/[name].css',
        chunkFilename: 'styles/[name].chunk.css',
      }),
    ],
    module: {
      rules: [
        {
          test: /\.(ts|tsx|js|jsx)$/,
          include: path.resolve(__dirname, './src'),
          loader: require.resolve('babel-loader'),
          options: {
            customize: require.resolve('babel-preset-react-app/webpack-overrides'),
            presets: [
              [
                require.resolve('babel-preset-react-app'),
                {
                  runtime: 'classic',
                },
              ],
            ],
            plugins: [
              [
                'import',
                {
                  libraryName: 'antd',
                  style: 'css',
                },
              ],
            ],
            cacheDirectory: true,
            cacheCompression: false,
            compact: isProduction,
          },
        },
        // {
        //   test: /\.(png|jpg)$/,
        //   include: path.resolve(__dirname, './src'),
        //   loader: path.resolve('./custom-loader'),
        // },
        {
          test: /\.(css|scss)$/,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
            {
              loader: 'css-loader',
              options: {
                modules: {
                  mode: 'local',
                  auto: true,
                  exportGlobals: true,
                  localIdentName: isProduction ? '[hash:base64:8]' : '[path][local]',
                  // localIdentContext: path.resolve(__dirname, 'src'),
                  exportLocalsConvention: 'camelCaseOnly',
                  // exportOnlyLocals: false,
                },
              },
            },
            {
              loader: 'sass-loader',
              options: {},
            },
          ],
        },
        {
          test: /\.(png|jpg|gif)$/,
          type: 'asset',
          parser: {
            dataUrlCondition: {
              maxSize: 10 * 1024, // 10kb
            },
          },
        },
      ],
    },
  };
};
