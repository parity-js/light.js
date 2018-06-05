"use strict";

var _rxjs = require("rxjs");

var _createRpc = _interopRequireDefault(require("./createRpc"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT
test('isObservable of an Observable', function () {
  expect(isObservable((0, _rxjs.of)(1))).toBe(true);
});
test('isObservable of null', function () {
  expect(isObservable(null)).toBe(false);
});
test('isObservable of an object', function () {
  expect(isObservable({})).toBe(false);
});
test('isObservable of a function', function () {
  expect(isObservable(function () {})).toBe(false);
});