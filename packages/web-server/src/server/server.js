import express from 'express';
import { renderToString } from 'react-dom/server';
import bodyParser from 'body-parser';
import path from 'path';
import React from 'react';
import Home from './Home';
import * as Routes from '../config/routes';
import enableMockServer from '../mock-server';
const app = express();
app.set('port', (process.env.PORT_WEBSERVER || 3000));
if (process.env.NODE_ENV === 'development') {
  const webpack = require('webpack'); 
  const webpackDevMiddleware = require('webpack-dev-middleware'); 
  const webpackHotMiddleware = require('webpack-hot-middleware'); 
  const webpackConfig = require('../../webpack.config.dev'); 
  const compiler = webpack(webpackConfig);
  app.use(webpackDevMiddleware(compiler, {
    stats: {
      colors: true,
      chunks: false, 
      'errors-only': true,
      hash: false,
      modules: false,
      reasons: false,
      warnings: false,
    },
    publicPath: Routes.SERVER_URL_LIB, 
  }));
  app.use(webpackHotMiddleware(compiler, {
    log: false,
  }));
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
enableMockServer(app, process.env.ENABLE_MOCK === 'true');
app.get(Routes.SERVER_URL_BASE, (req, res) => {
  const document = renderToString(<Home lang="en" />);
  res.status(200).send(`<!DOCTYPE html>${document}`);
});
app.use(Routes.SERVER_URL_LIB, express.static(path.join(__dirname, '../../lib')));
app.listen(app.get('port'), () => {
  console.log(`Server started: http:
});
