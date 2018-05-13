"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.onEvery2Seconds$ = exports.onEverySecond$ = void 0;

var _rxjs = require("rxjs");

// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

/**
 * Observable that emits on every second.
 */
var onEverySecond$ = (0, _rxjs.timer)(0, 1000);
exports.onEverySecond$ = onEverySecond$;
onEverySecond$.metadata = {
  name: 'onEverySecond$'
};
/**
 * Observable that emits on every other second.
 */

var onEvery2Seconds$ = (0, _rxjs.timer)(0, 2000);
exports.onEvery2Seconds$ = onEvery2Seconds$;
onEvery2Seconds$.metadata = {
  name: 'onEvery2Seconds$'
};