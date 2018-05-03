"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.distinctReplayRefCount = void 0;

var _operators = require("rxjs/operators");

// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
// SPDX-License-Identifier: MIT

/**
 * Shorthand for distinctUntilChanged(), publishReplay(1) and refCount().
 */
var distinctReplayRefCount = function distinctReplayRefCount() {
  return function (source$) {
    return source$.pipe((0, _operators.distinctUntilChanged)(), (0, _operators.publishReplay)(1), (0, _operators.refCount)());
  };
};

exports.distinctReplayRefCount = distinctReplayRefCount;