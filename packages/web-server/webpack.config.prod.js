const baseConfig = require('./webpack.config.base');
const webpackProdConfig = baseConfig;
webpackProdConfig.devtool = 'source-map';
module.exports = webpackProdConfig;
