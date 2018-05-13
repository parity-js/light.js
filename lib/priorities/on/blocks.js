"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.onEvery4Blocks$ = exports.onEvery2Blocks$ = exports.onEveryBlock$ = void 0;

var _rxjs = require("rxjs");

var _operators = require("rxjs/operators");

var _api = _interopRequireDefault(require("../../api"));

var _distinctReplayRefCount = require("../../utils/operators/distinctReplayRefCount");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

/**
 * Observable that emits on every new block.
 */
var onEveryBlock$ = _rxjs.Observable.create(function (observer) {
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