"use strict";
// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
/**
 * Observable that emits only once.
 */
exports.onStartup$ = rxjs_1.of(0);
exports.onStartup$.metadata = { name: 'onStartup$' };
