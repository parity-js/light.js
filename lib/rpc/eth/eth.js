"use strict";
// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var api_1 = require("../../api");
var createRpc_1 = require("../utils/createRpc");
var getFrequency_1 = require("../utils/getFrequency");
var isLoading_1 = require("../../utils/isLoading");
var frequency_1 = require("../../frequency");
var operators_2 = require("../../utils/operators");
/**
 * Observable which contains the array of all addresses managed by the light
 * client.
 *
 * Calls eth_accounts.
 *
 * @return {Observable<Array<String>>} - An Observable containing the list of
 * public addresses.
 */
exports.accounts$ = createRpc_1.default({
    calls: ['eth_accounts'],
    frequency: [frequency_1.onAccountsChanged$]
})(function () { return getFrequency_1.default(exports.accounts$); });
/**
 * Get the balance of a given account. Calls `eth_getBalance`.
 *
 * @param {String} address - The account address to query the balance.
 * @return {Observable<BigNumber>} - An Observable containing the balance.
 */
exports.balanceOf$ = createRpc_1.default({
    calls: ['eth_getBalance'],
    frequency: [frequency_1.onEvery2Blocks$, frequency_1.onStartup$]
})(function (address) {
    return getFrequency_1.default(exports.balanceOf$).pipe(operators_2.switchMapPromise(function () { return api_1.default().eth.getBalance(address); }));
});
/**
 * Get the default account managed by the light client.
 *
 * @return {Observable<Address>} - An Observable containing the public address
 * of the default account.
 */
exports.defaultAccount$ = createRpc_1.default({
    dependsOn: ['accounts$']
})(function () { return exports.accounts$().pipe(operators_1.map(function (accounts) { return accounts[0]; })); });
/**
 * Get the current block height.
 *
 * @return {Observable<Number>} - An Observable containing the block height.
 */
exports.height$ = createRpc_1.default({ frequency: [frequency_1.onEveryBlock$] })(function () {
    return getFrequency_1.default(exports.height$);
});
/**
 * Alias for {@link height$}.
 *
 * @return {Observable<Number>} - An Observable containing the block height.
 */
exports.blockNumber$ = createRpc_1.default({ dependsOn: ['height$'] })(function () {
    return exports.height$();
});
/**
 * Alias for {@link defaultAccount$}.
 *
 * @return {Observable<Address>} - An Observable containing the public address
 * of the default account.
 */
exports.me$ = createRpc_1.default({
    dependsOn: ['defaultAccount$']
})(function () { return exports.defaultAccount$(); });
/**
 * Shorthand for fetching the current account's balance.
 */
exports.myBalance$ = createRpc_1.default({
    dependsOn: ['balanceOf$', 'defaultAccount$']
})(function () {
    return exports.defaultAccount$().pipe(operators_1.switchMap(function (defaultAccount) {
        return isLoading_1.isNullOrLoading(defaultAccount)
            ? rxjs_1.of(isLoading_1.RPC_LOADING)
            : exports.balanceOf$(defaultAccount);
    }));
});
/**
 * Get the syncing state.
 *
 * @return {Observable<Object | Boolean>} - An Observable containing the
 * syncing state object, or false.
 */
exports.syncing$ = createRpc_1.default({
    frequency: [frequency_1.onSyncingChanged$]
})(function () { return getFrequency_1.default(exports.syncing$); });
