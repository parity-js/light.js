"use strict";
// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT
Object.defineProperty(exports, "__esModule", { value: true });
var operators_1 = require("rxjs/operators");
/**
 * Shorthand for distinctUntilChanged(), publishReplay(1) and refCount().
 *
 * @hidden
 */
exports.distinctReplayRefCount = function () { return function (source$) {
    return source$.pipe(operators_1.distinctUntilChanged(), operators_1.publishReplay(1), operators_1.refCount());
}; };
