"use strict";
// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT
Object.defineProperty(exports, "__esModule", { value: true });
var api_1 = require("../api");
var createOnFromPubsub_1 = require("./utils/createOnFromPubsub");
/**
 * Observable that emits when syncing status changes.
 */
exports.onNodeHealthChanged$ = createOnFromPubsub_1.default('parity_nodeHealth', api_1.default, { name: 'onNodeHealthChanged$' });
/**
 * Observable that emits when syncing status changes.
 */
exports.onSyncingChanged$ = createOnFromPubsub_1.default('eth_syncing', api_1.default, {
    name: 'onSyncingChanged$'
});
