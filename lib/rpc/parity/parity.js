"use strict";
// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT
Object.defineProperty(exports, "__esModule", { value: true });
var api_1 = require("../../api");
var createRpc_1 = require("../utils/createRpc");
var getFrequency_1 = require("../utils/getFrequency");
var frequency_1 = require("../../frequency");
var operators_1 = require("../../utils/operators");
/**
 * Get accounts info. Calls `parity_accountsInfo`.
 *
 * @return {Observable<Object>} - An Observable containing all info that can be
 * accessed by user concerning accounts.
 */
exports.accountsInfo$ = createRpc_1.default({
    calls: ['parity_accountsInfo'],
    frequency: [frequency_1.onAccountsInfoChanged$]
})(function () { return getFrequency_1.default(exports.accountsInfo$); });
/**
 * Get the name of the current chain. Calls `parity_netChain`.
 *
 * @return {Observable<String>} - An Observable containing the name of the
 * current chain.
 */
exports.chainName$ = createRpc_1.default({
    calls: ['parity_netChain'],
    frequency: [frequency_1.onStartup$]
})(function () {
    return getFrequency_1.default(exports.chainName$).pipe(operators_1.switchMapPromise(function () { return api_1.default().parity.netChain(); }));
});
/**
 * Get the node's health. Calls `parity_nodeHealth`.
 *
 * @return {Observable<Object>} - An Observable containing the health.
 */
exports.nodeHealth$ = createRpc_1.default({
    calls: ['parity_nodeHealth'],
    frequency: [frequency_1.onNodeHealthChanged$]
})(function () { return getFrequency_1.default(exports.nodeHealth$); });
