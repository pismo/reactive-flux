'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.fluxModule = undefined;

var _angular = require('angular');

var _angular2 = _interopRequireDefault(_angular);

var _rxAngular = require('rx-angular');

var _rxAngular2 = _interopRequireDefault(_rxAngular);

var _store = require('./lib/store');

var _store2 = _interopRequireDefault(_store);

var _dispatcher = require('./lib/dispatcher');

var _dispatcher2 = _interopRequireDefault(_dispatcher);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fluxModule = exports.fluxModule = _angular2.default.module('reactive-flux', ['rx']).factory('store', _store2.default).factory('dispatcher', _dispatcher2.default);

exports.default = fluxModule;