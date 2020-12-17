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
      'tests/unit/index.js',
    ],
    exclude: [
    ],
    plugins: [
      'karma-chrome-launcher',
      'karma-jasmine',
      'karma-webpack',
      'karma-sourcemap-loader',
      'karma-coverage',
      'karma-coverage-istanbul-reporter',
      'karma-spec-reporter',
      'karma-html-reporter',
      'karma-junit-reporter',
    ],
    preprocessors: {
      'tests/unit/index.js': ['webpack', 'sourcemap'],
    },
    reporters: ['spec', 'junit', 'html', 'coverage-istanbul'],
    coverageIstanbulReporter: {
      reports: ['html'],
      fixWebpackSourcePaths: true,
      dir: 'tests/out/coverage/',
      'report-config': {
        html: {
          subdir: 'html',
        },
      },
      thresholds: {
        emitWarning: false,
        global: {
          statements: 90,
          lines: 90,
          branches: 90,
          functions: 90,
        },
      },
      verbose: false, 
    },
    htmlReporter: {
      outputDir: 'tests/out/unit',
      reportName: 'htmlReporter',
      namedFile: true,
      urlFriendlyName: true,
    },
    junitReporter: {
      outputDir: 'tests/out/unit',
      useBrowserName: false,
      outputFile: 'junitReport.xml',
    },
    webpackMiddleware: {
      noInfo: true,
      stats: {
        colors: true,
        chunks: false,
        hash: false,
        modules: false,
      },
    },
    port: 9876,
    colors: true,
    autoWatch: true,
    browsers: ['ChromeHeadless'],
    singleRun: true,
    concurrency: Infinity,
    webpack: {
      mode: 'development',
      devtool: 'inline-source-map',
      module: {
        rules: [{
          test: /\.jsx?$/,
          use: [{
            loader: 'babel-loader',
            options: {
              "plugins": [
                ["istanbul", {
                  "include": [
                    "**/src/**"
                  ]
                }]
              ]
            },
          }],
          exclude: /node_modules/,
        }, {
          test: /\.scss$/,
          use: ['style-loader', 'css-loader', 'sass-loader']
        }, {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        }].concat(rules)
      },
      resolve: {
        extensions: ['.js', '.jsx', '.scss'],
      },
      externals: {
        'react/addons': true,
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true,
      }
    },
  };
  if (overrides) {
    return _.mergeWith(baseConf, overrides, customizer);
  }
  return baseConf;
};
module.exports = baseKarmaConf;
