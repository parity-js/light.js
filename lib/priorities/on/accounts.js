"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.onAccountsChanged$ = void 0;

var _rxjs = require("rxjs");

// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

/**
 * Observable that emits each time accounts change.
 */
var onAccountsChanged$ = new _rxjs.BehaviorSubject(0);
exports.onAccountsChanged$ = onAccountsChanged$;
onAccountsChanged$.metadata = {
  name: 'onAccountsChanged$'
};