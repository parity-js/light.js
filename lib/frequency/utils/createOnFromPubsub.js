"use strict";
// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var distinctReplayRefCount_1 = require("../../utils/operators/distinctReplayRefCount");
/**
 * Observable that emits on each pubsub event.
 *
 * @ignore
 * @example onAccountsChanged$, onEveryBlock$...
 */
var createOnFromPubsub = function (pubsub, api, metadata) {
    var _a = pubsub.split('_'), namespace = _a[0], method = _a[1];
    // There's a chance the provider doesn't support pubsub, for example
    // MetaMaskProvider. In this case, as suggested on their Github, the best
    // solution for now is to poll.
    if (!api().isPubSub) {
        var result = (rxjs_1.timer(0, 1000).pipe(operators_1.switchMap(function () { return api()[namespace][method](); })));
        result.metadata = metadata;
        return result;
    }
    return rxjs_1.Observable.create(function (observer) {
        var subscription = api().pubsub[namespace][method](function (error, result) {
            if (error) {
                observer.error(error);
            }
            else {
                observer.next(result);
            }
        });
        return function () {
            return subscription.then(function (subscriptionId) {
                return api().pubsub.unsubscribe(subscriptionId);
            });
        };
    }).pipe(distinctReplayRefCount_1.distinctReplayRefCount());
};
exports.default = createOnFromPubsub;
