const _ = require('lodash');
const { rules } = require('./config/webpack.loaders');
const baseKarmaConf = (overrides) => {
  const customizer = (objValue, srcValue) => {
    if(_.isArray(objValue)) {
      return objValue.concat(srcValue);
    }
    return srcValue;
  };
  const baseConf = {
    basePath: './',
    frameworks: ['jasmine'],
    files: [
      'node_module/babel-polyfill/dist/polyfill.js',
      'test/unit/index.js',
    ],
    exclude: [
    ],
    plugins: [
      'karma-chrome-launcher',
      'karma-coverage-istanbul-reporter',
      'karma-jasmine',
      'karma-webpack',
      'karma-spec-reporter',
    ],
    preprocessors: {
      'tests/unit/index.js': ['webpack', 'sourcemap'],
    },
    reporters: ['coverage-istanbul'],
    coverageIstanbulReporter: {
      reports: ['html'],
      fixWebpackSourcePahts: true,
      dir: 'tests/out/coverage/',
      'report-config': {
        html: {
          subdir: 'html',
        },
      },
      thresholds: {
        emitWaening: false,
        global: {
          statements: 90,
          line: 90,
          branches: 90,
          function: 90,
        },
      },
    },
    webpackMiddleware: {
      noInfo: true,
      stats: {
        colors: true,
        chunks: false,
        hash: false,
      },
    },
    port: 9876,
    colors: true,
    autoWatch: false,
    browsers: ['Chrome'],
    singleRun: true,
    concurrency: Infinity,
    webpack: {
      devtool: 'eval',
      module: {
        rules: [{
          test: /\.jsx?$/,
          exclude: /node_modules/,
        }, {
          test: /\.scss$/,
          loaders: ['style-loader', 'css-loader', 'sass-loader']
        }, {
          test: /\.css$/,
          loaders: ['style-loader', 'css-loader']
        }].concat(rules)
      },
    },
  };
  if (overrides) {
    return _.mergeWith(baseConf, overrides, customizer);
  }
  return baseConf;
};
module.exports = baseKarmaConf;
