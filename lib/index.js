"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  setApi: true,
  frequency: true
};
Object.defineProperty(exports, "setApi", {
  enumerable: true,
  get: function get() {
    return _api.setApi;
  }
});
exports.frequency = exports.default = void 0;

var _api = require("./api");

var frequency = _interopRequireWildcard(require("./frequency"));

exports.frequency = frequency;

require("./overview");

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

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT
var _default = {
  setApi: _api.setApi
};
exports.default = _default;