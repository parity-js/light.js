"use strict";

var _rxjs = require("rxjs");

var _isObservable = _interopRequireDefault(require("./isObservable"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT
test('isObservable of an Observable', function () {
  expect((0, _isObservable.default)((0, _rxjs.of)(1))).toBe(true);
});
test('isObservable of null', function () {
  expect((0, _isObservable.default)(null)).toBe(false);
});
test('isObservable of an object', function () {
  expect((0, _isObservable.default)({})).toBe(false);
});
test('isObservable of a function', function () {
  expect((0, _isObservable.default)(function () {})).toBe(false);
});