"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.onEvery4Blocks$ = exports.onEvery2Blocks$ = exports.onEveryBlock$ = void 0;

var _operators = require("rxjs/operators");

var _api = _interopRequireDefault(require("../api"));

var _createOnFromPubsub = _interopRequireDefault(require("./utils/createOnFromPubsub"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

/**
 * Observable that emits on every new block.
 */
var onEveryBlock$ = (0, _createOnFromPubsub.default)('eth_blockNumber', _api.default).pipe((0, _operators.map)(function (v) {
  return +v;
}) // Return number instead of BigNumber
);
exports.onEveryBlock$ = onEveryBlock$;
onEveryBlock$.metadata = {
  name: 'onEveryBlock$'
};
/**
 * Observable that emits on every 2nd block.
 */

var onEvery2Blocks$ = onEveryBlock$.pipe((0, _operators.filter)(function (n) {
  return n % 2 === 0;
}) // Around ~30s on mainnet
);
exports.onEvery2Blocks$ = onEvery2Blocks$;
onEvery2Blocks$.metadata = {
  name: 'onEvery2Blocks$'
};
/**
 * Observable that emits on every 4th block.
 */

var onEvery4Blocks$ = onEveryBlock$.pipe((0, _operators.filter)(function (n) {
  return n % 4 === 0;
}) // Around ~1min on mainnet
);
exports.onEvery4Blocks$ = onEvery4Blocks$;
onEvery4Blocks$.metadata = {
  name: 'onEvery4Blocks$'
};