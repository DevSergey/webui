'use strict';
Object.defineProperty(exports, "__esModule", {
  value: true
});
var _react = require('react');
var _react2 = _interopRequireDefault(_react);
var _routes = require('../config/routes');
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var Home = function Home(language) {
  return _react2.default.createElement(
    'html',
    { lang: language.lang },
    _react2.default.createElement(
      'head',
      null,
      'title'
    ),
    _react2.default.createElement(
      'body',
      null,
      _react2.default.createElement('div', { id: 'content' })
    )
  );
};
exports.default = Home;
