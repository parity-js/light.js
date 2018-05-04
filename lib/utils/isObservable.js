"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _rxjs = require("rxjs");

// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
// SPDX-License-Identifier: MIT
var isObservable = function isObservable(source$) {
  return source$ instanceof _rxjs.Observable;
};

var _default = isObservable;
exports.default = _default;