"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.onStartup$ = void 0;

var _rxjs = require("rxjs");

// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

/**
 * Observable that emits only once.
 */
var onStartup$ = (0, _rxjs.of)(0);
exports.onStartup$ = onStartup$;
onStartup$.metadata = {
  name: 'onStartup$'
};