"use strict";
// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.RPC_LOADING = Symbol('Fetching RPC...');
/**
 * Check if a rpc$ value is loading.
 *
 * @param value - The value to test.
 * @return Returns true if it's loading.
 */
exports.isLoading = function (value) { return value === exports.RPC_LOADING; };
/**
 * Check if a rpc$ value is `null, `undefined` or loading.
 *
 * @param value - The value to test.
 * @return Returns true if it's `null, `undefined` or loading.
 */
exports.isNullOrLoading = function (value) {
    return value == null || exports.isLoading(value);
};
