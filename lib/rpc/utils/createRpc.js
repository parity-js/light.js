"use strict";
// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT
Object.defineProperty(exports, "__esModule", { value: true });
var memoizee_1 = require("memoizee");
var operators_1 = require("rxjs/operators");
var json_prune_1 = require("json-prune");
var rxjs_1 = require("rxjs");
var operators_2 = require("../../utils/operators");
/**
 * Mixins (aka. interface in Java or trait in Rust) that are added into an rpc$
 * Observable.
 *
 * @ignore
 */
var frequencyMixins = {
    /**
     * Change the frequency of a RPC Observable.
     *
     * @param {Array<Observable>} frequency - An array of frequency Observables.
     * @return {Null}
     * @example
     * balanceOf$.setFrequency([onEverySecond$, onStartup$]); // Will fetch
     * balance once on startup, and then every second.
     */
    setFrequency: function (frequency) {
        // TODO Check that frequency is well-formed
        this.metadata.frequency = frequency;
        // If necessary, we clear the memoize cache
        if (typeof this.clear === 'function') {
            this.clear();
        }
    }
};
/**
 * Add metadata to an rpc$ Observable, and transform it into a ReplaySubject(1).
 *
 * @ignore
 * @param {Object} metadata - The metadata to add.
 * @return {Observable} - The original rpc$ Observable with patched metadata.
 */
var createRpc = function (metadata) {
    if (metadata === void 0) { metadata = {}; }
    return function (source$) {
        var rpc$ = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var _a;
            // The last arguments is an options, if it's an object
            // TODO What if we pass a single object as argument, which is not options?
            var options = args && args.length && typeof args[args.length - 1] === 'object'
                ? args.pop()
                : {};
            var subject$ = new rxjs_1.ReplaySubject(1);
            // The pipes to add, from the options
            var pipes = [operators_1.multicast(function () { return subject$; }), operators_1.refCount()];
            if (options.withoutLoading === true) {
                pipes.push(operators_2.withoutLoading());
            }
            // Add a field in the calledWithArgs object, so that we know this function has
            // been called with these particular args in the app. See overview.js on
            // how this is used.
            if (!metadata.calledWithArgs) {
                metadata.calledWithArgs = {};
            }
            metadata.calledWithArgs[json_prune_1.default(args)] = subject$;
            return (_a = source$.apply(void 0, args)).pipe.apply(_a, pipes);
        };
        var result$ = memoizee_1.default(rpc$, { length: false });
        Object.assign(result$, frequencyMixins, { metadata: metadata });
        return result$;
    };
};
exports.default = createRpc;
