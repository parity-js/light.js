"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.setApi = void 0;

var _api = _interopRequireDefault(require("@parity/api"));

var _package = require("../package.json");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT
var api;
/**
 * Sets an Api object.
 *
 * @param {Object} newApi - The Api object.
 */

var setApi = function setApi(newApi) {
  api = newApi;

  if (!api.isPubSub) {
    console.warn("Current provider does not support pubsub. ".concat(_package.name, " will poll every second to listen to changes."));
  }
};
/**
 * We only ever use api() at call-time of functions; this allows the options
 * (particularly the transport option) to be changed dynamically and the
 * data structure to be reused.
 */


exports.setApi = setApi;

var getApi = function getApi() {
  if (!api) {
    api = new _api.default(new _api.default.Provider.Ws('ws://localhost:8546'));
  }

  return api;
};

var _default = getApi;
exports.default = _default;