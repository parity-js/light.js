"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {};
exports.default = void 0;

var _api = require("./api");

require("./overview");

var _priorities = require("./priorities");

Object.keys(_priorities).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _priorities[key];
    }
  });
});

var _rpc = require("./rpc");

Object.keys(_rpc).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _rpc[key];
    }
  });
});
// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
// SPDX-License-Identifier: MIT
var _default = {
  setApi: _api.setApi
};
exports.default = _default;