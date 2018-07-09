"use strict";
// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var rpc = require("../rpc");
/**
 * Add a property on window, so that the subscribed object can be viewed in the
 * JS console via `window.parity.rpcOverview()`
 */
if (typeof window !== 'undefined') {
    // == null means null or undefined
    if (window.parity == null) {
        window.parity = {};
    }
    window.parity.rpcOverview = function () {
        var overview = {};
        Object.keys(rpc).forEach(function (key) {
            var rpc$ = rpc[key];
            // If there are subscribers, then we add
            overview[key] = __assign({}, rpc$.metadata);
            // We make the `calledWithArgs` field human-readable
            if (rpc$.metadata.calledWithArgs) {
                Object.keys(rpc$.metadata.calledWithArgs).map(function (calledWithArgsKey) {
                    var subject$ = rpc$.metadata.calledWithArgs[calledWithArgsKey];
                    overview[key].calledWithArgs[calledWithArgsKey] = {
                        currentValue: subject$._events && subject$._events[0],
                        subscribersCount: subject$.observers.length
                    };
                });
            }
            // We make the `frequency` field human-readable
            if (rpc$.metadata.frequency) {
                overview[key].frequency = rpc$.metadata.frequency.map(function (frequency$) { return frequency$.metadata.name; });
            }
            // We remove all the metadata keys that are null, empty or functions,
            // for clarity while console.logging it.
            Object.keys(overview[key]).forEach(function (innerKey) {
                if (!overview[key][innerKey] ||
                    (Array.isArray(overview[key][innerKey]) &&
                        !overview[key][innerKey].length) ||
                    typeof overview[key][innerKey] === 'function') {
                    delete overview[key][innerKey];
                }
            });
        });
        return overview;
    };
}
