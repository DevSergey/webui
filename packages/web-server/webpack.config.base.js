const webpack = require('webpack');
const postcssPresentEnv = require('postcss-preset-env');
const cssnano = require('cssnano');
const path = require('path');
const postcssImport = require('postcss-import');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const devModal = process.env.NODE_ENV === 'development';
const sassLoaderPro = [
  MiniCssExtractPlugin.loader,
  {
    loader: 'css-loader'
  }, {
    loader: 'postcss-loader',
    options: {
      ident: 'postcss',
      plugins: () => [
        postcssPresentEnv({
          browsers: ['last 2 versions']
        }),
        cssnano(),
        postcssImport()
      ]
    }
  }, {
    loader: 'sass-loader',
    options: {
      outputStyle: 'collapsed'
    }
  }
];
const sassLoaderDev = [{
  loader: 'style-loader'
}, {
  loader: 'css-loader',
  options: {
    sourceMap: true
  }
}, {
  loader: 'sass-loader',
  options: {
    sourceMap: true,
    outputStyle: 'collapsed'
  }
}];
const sassLoader = devModal ? sassLoaderDev : sassLoaderPro;
module.exports = {
  mode: process.env.NODE_ENV,
  entry: {
    main: ['../web/src/index.jsx'],
    vendor: [
      'babel-polyfill', 'react', 'react-dom', 'react-router', 'redux', 'react-redux', 'redux-thunk'
    ]
  },
  output: {
    path: path.resolve(__dirname, './lib'),
    filename: '[name].Bundle.js',
    publicPath: '/lib/',
    sourceMapFilename: '[name].Bundle.map'
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /node_modules|lib/,
      use: {
        loader: 'babel-loader'
      }
    }, {
      test: /\.css$/,
      exclude: /node_module/,
      use: [
        { loader: 'style-loader' },
        { loader: 'css-loader' }
      ]
    }, {
      test: /\.scss$/,
      exclude: /node_module/,
      use: sassLoader
    }, {
      test: /\.json$/,
      use: {
        loader: 'json-loader'
      }
    }, {
      test: /\.html$/,
      use: {
        loader: 'html-loader'
      }
    }]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.scss']
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all'
        }
      }
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new MiniCssExtractPlugin({
      filename: devModal ? '[name].[hash].css' : '[name].css'
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    })
  ],
  stats: {
    colors: true,
    chunks: false, 
    hash: false,
    modules: false,
    reasons: false,
    warnings: false,
    children: false
  }
};
