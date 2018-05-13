"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _memoizee = _interopRequireDefault(require("memoizee"));

var _priorityMixins = require("../priorities/priorityMixins");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

/**
 * Add metadata to an rpc$ Observable.
 *
 * @param {Object} metadata - The metadata to add.
 * @return {Observable} - The original rpc$ Observable with patched metadata.
 */
var createRpc = function createRpc() {
  var metadata = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return function (rpc$) {
    var result$ = (0, _memoizee.default)(rpc$);
    Object.assign(result$, _priorityMixins.priorityMixins, {
      metadata: metadata
    });
    return result$;
  };
};

var _default = createRpc;
exports.default = _default;