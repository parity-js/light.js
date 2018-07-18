"use strict";
// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT
Object.defineProperty(exports, "__esModule", { value: true });
var operators_1 = require("rxjs/operators");
var rxjs_1 = require("rxjs");
var isLoading_1 = require("../isLoading");
/**
 * SwitchMap to an Observable.from. The Observable.from will return an empty
 * Observable if the Promise throws an error, will log an error in the console
 * on error.
 *
 * @hidden
 */
exports.switchMapPromise = function (promise) { return function (source$) {
    return source$.pipe(operators_1.switchMap(function () {
        return rxjs_1.from(promise().then(function (result) {
            // The result can sometimes be {id: 2, jsonrpc: "2.0", error: {...}}
            if (result.error) {
                return Promise.reject(result);
            }
            return Promise.resolve(result);
        })).pipe(operators_1.startWith(isLoading_1.RPC_LOADING), operators_1.catchError(function (err) {
            console.group();
            console.error({ call: promise.toString(), err: err });
            console.error(new Error('Error while executing API call, see error log above for more information.'));
            console.groupEnd();
            return rxjs_1.empty();
        }));
    }));
}; };
