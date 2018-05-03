"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.onStartup$ = exports.onEvery2Seconds$ = exports.onEverySecond$ = exports.onEvery4Blocks$ = exports.onEvery2Blocks$ = exports.onEveryBlock$ = exports.onAccountsChanged$ = void 0;

var _BehaviorSubject = require("rxjs/BehaviorSubject");

var _operators = require("rxjs/operators");

var _Observable = require("rxjs/Observable");

var _of = require("rxjs/observable/of");

var _timer = require("rxjs/observable/timer");

var _api = _interopRequireDefault(require("../api"));

var _distinctReplayRefCount = require("../utils/operators/distinctReplayRefCount");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
// SPDX-License-Identifier: MIT

/**
 * Observable that emits each time accounts change.
 */
var onAccountsChanged$ = new _BehaviorSubject.BehaviorSubject(0);
exports.onAccountsChanged$ = onAccountsChanged$;
onAccountsChanged$.metadata = {
  name: 'onAccountsChanged$'
};
/**
 * Observable that emits on every new block.
 */

var onEveryBlock$ = _Observable.Observable.create(function (observer) {
  var subscription = (0, _api.default)().pubsub.eth.blockNumber(function (error, result) {
    if (error) {
      observer.error(error);
    } else {
      observer.next(+result);
    }
  });
  return function () {
    return subscription.then(function (subscriptionId) {
      return (0, _api.default)().pubsub.unsubscribe(subscriptionId);
    });
  };
}).pipe((0, _distinctReplayRefCount.distinctReplayRefCount)());

exports.onEveryBlock$ = onEveryBlock$;
onEveryBlock$.metadata = {
  name: 'onEveryBlock$'
};
/**
 * Observable that emits on every 2nd block.
 */

var onEvery2Blocks$ = onEveryBlock$.pipe((0, _operators.filter)(function (n) {
  return n % 2 === 0;
}) // Around ~30s on mainnet
);
exports.onEvery2Blocks$ = onEvery2Blocks$;
onEvery2Blocks$.metadata = {
  name: 'onEvery2Blocks$'
};
/**
 * Observable that emits on every 4th block.
 */

var onEvery4Blocks$ = onEveryBlock$.pipe((0, _operators.filter)(function (n) {
  return n % 4 === 0;
}) // Around ~1min on mainnet
);
exports.onEvery4Blocks$ = onEvery4Blocks$;
onEvery4Blocks$.metadata = {
  name: 'onEvery4Blocks$'
};
/**
 * Observable that emits on every second.
 */

var onEverySecond$ = (0, _timer.timer)(0, 1000);
exports.onEverySecond$ = onEverySecond$;
onEverySecond$.metadata = {
  name: 'onEverySecond$'
};
/**
 * Observable that emits on every other second.
 */

var onEvery2Seconds$ = (0, _timer.timer)(0, 2000);
exports.onEvery2Seconds$ = onEvery2Seconds$;
onEvery2Seconds$.metadata = {
  name: 'onEvery2Seconds$'
};
/**
 * Observable that emits only once.
 */

var onStartup$ = (0, _of.of)(0);
exports.onStartup$ = onStartup$;
onStartup$.metadata = {
  name: 'onStartup$'
};