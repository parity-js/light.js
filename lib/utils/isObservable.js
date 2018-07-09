"use strict";
// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
/**
 * @ignore
 * @param {Any} source$ - The Observable to test.
 * @return {Boolean} - Returns true if it's an Observable.
 */
var isObservable = function (source$) {
    return source$ instanceof rxjs_1.Observable;
};
exports.default = isObservable;
