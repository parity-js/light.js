"use strict";
// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT
Object.defineProperty(exports, "__esModule", { value: true });
var operators_1 = require("rxjs/operators");
var isLoading_1 = require("../isLoading");
/**
 * Filter out the loading states in our observable.
 *
 */
exports.withoutLoading = function () { return function (source$) {
    return source$.pipe(operators_1.filter(function (value) { return !isLoading_1.isLoading(value); }), operators_1.distinctUntilChanged());
}; };
