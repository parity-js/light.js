"use strict";
// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
/**
 * Get the frequency Observable of a Rpc Observable, which represents how often
 * this RPC Observable gets updated. Each RPC Observable has a metadata field
 * with an array of Observables, the frequency Observable is constructed by
 * merging (as in Observable.merge) these Observables.
 *
 * @ignore
 * @param rpc$ - The Rpc Observable from which we're fetching the frequency.
 * @return The Frequency Observable of our Rpc Observable.
 */
var getFrequency = function (rpc$) {
    return rxjs_1.empty().pipe(operators_1.merge.apply(void 0, rpc$.metadata.frequency));
};
exports.default = getFrequency;
