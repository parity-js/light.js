"use strict";
// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
/**
 * @hidden
 * @param source$ - The Observable to test.
 * @return Returns true if it's an Observable.
 */
var isObservable = function (source$) {
    return source$ instanceof rxjs_1.Observable;
};
exports.default = isObservable;
