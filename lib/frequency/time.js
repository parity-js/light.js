"use strict";
// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
/**
 * Observable that emits on every second.
 */
exports.onEverySecond$ = rxjs_1.timer(0, 1000);
exports.onEverySecond$.metadata = { name: 'onEverySecond$' };
/**
 * Observable that emits on every other second.
 */
exports.onEvery2Seconds$ = rxjs_1.timer(0, 2000);
exports.onEvery2Seconds$.metadata = { name: 'onEvery2Seconds$' };
