"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.setApi = void 0;

var _api = _interopRequireDefault(require("@parity/api"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT
var options = {};
/**
 * Sets an Api object.
 *
 * @param {Object} api - The Api object.
 */

var setApi = function setApi(api) {
  options.api = api;
};
/**
 * We only ever use api() at call-time of functions; this allows the options
 * (particularly the transport option) to be changed dynamically and the
 * data structure to be reused.
 */


exports.setApi = setApi;

var api = function api() {
  return options.api || new _api.default(new _api.default.Provider.Ws('ws://localhost:8546'));
};

var _default = api;
exports.default = _default;