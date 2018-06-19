"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isNullOrLoading = exports.isLoading = exports.RPC_LOADING = void 0;
// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT
var RPC_LOADING = Symbol('Fetching RPC...');
/**
 * Check if a rpc$ value is loading.
 *
 * @param {Any} value - The value to test.
 * @return {Boolean} - Returns true if it's loading.
 */

exports.RPC_LOADING = RPC_LOADING;

var isLoading = function isLoading(value) {
  return value === RPC_LOADING;
};
/**
 * Check if a rpc$ value is `null, `undefined` or loading.
 *
 * @param {Any} value - The value to test.
 * @return {Boolean} - Returns true if it's `null, `undefined` or loading.
 */


exports.isLoading = isLoading;

var isNullOrLoading = function isNullOrLoading(value) {
  return value == null || isLoading(value);
};

exports.isNullOrLoading = isNullOrLoading;