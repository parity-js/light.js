"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withoutLoading = void 0;

var _operators = require("rxjs/operators");

var _isLoading = require("../isLoading");

// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

/**
 * Filter out the loading states in our observable.
 *
 *
 */
var withoutLoading = function withoutLoading() {
  return function (source$) {
    return source$.pipe((0, _operators.filter)(function (value) {
      return !(0, _isLoading.isLoading)(value);
    }), (0, _operators.distinctUntilChanged)());
  };
};

exports.withoutLoading = withoutLoading;