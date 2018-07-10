"use strict";
// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT
Object.defineProperty(exports, "__esModule", { value: true });
var operators_1 = require("rxjs/operators");
var api_1 = require("../api");
var createOnFromPubsub_1 = require("./utils/createOnFromPubsub");
/**
 * Observable that emits on every new block.
 */
exports.onEveryBlock$ = createOnFromPubsub_1.default('eth_blockNumber', api_1.default).pipe(operators_1.map(function (v) { return +v; }) // Return number instead of BigNumber
);
exports.onEveryBlock$.metadata = { name: 'onEveryBlock$' };
/**
 * Observable that emits on every 2nd block.
 */
exports.onEvery2Blocks$ = exports.onEveryBlock$.pipe(operators_1.filter(function (n) { return n % 2 === 0; }) // Around ~30s on mainnet
);
exports.onEvery2Blocks$.metadata = { name: 'onEvery2Blocks$' };
/**
 * Observable that emits on every 4th block.
 */
exports.onEvery4Blocks$ = exports.onEveryBlock$.pipe(operators_1.filter(function (n) { return n % 4 === 0; }) // Around ~1min on mainnet
);
exports.onEvery4Blocks$.metadata = { name: 'onEvery4Blocks$' };
