"use strict";
// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT
Object.defineProperty(exports, "__esModule", { value: true });
var api_1 = require("../api");
var createOnFromPubsub_1 = require("./utils/createOnFromPubsub");
/**
 * Observable that emits each time the default account changes
 */
exports.onAccountsChanged$ = createOnFromPubsub_1.default('eth_accounts', api_1.default, { name: 'onAccountsChanged$' });
/**
 * Observable that emits each time the default account changes
 */
exports.onAccountsInfoChanged$ = createOnFromPubsub_1.default('parity_accountsInfo', api_1.default, { name: 'onAccountsInfoChanged$' });
