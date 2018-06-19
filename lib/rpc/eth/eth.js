"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.syncing$ = exports.myBalance$ = exports.me$ = exports.blockNumber$ = exports.height$ = exports.defaultAccount$ = exports.balanceOf$ = exports.accounts$ = void 0;

var _rxjs = require("rxjs");

var _operators = require("rxjs/operators");

var _operators2 = require("../../utils/operators");

var _api = _interopRequireDefault(require("../../api"));

var _createRpc = _interopRequireDefault(require("../utils/createRpc"));

var _getFrequency = _interopRequireDefault(require("../utils/getFrequency"));

var _isLoading = require("../../utils/isLoading");

var _frequency = require("../../frequency");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

/**
 * Observable which contains the array of all addresses managed by the light
 * client.
 *
 * Calls eth_accounts.
 *
 * @return {Observable<Array<String>>} - An Observable containing the list of
 * public addresses.
 */
var accounts$ = (0, _createRpc.default)({
  calls: ['eth_accounts'],
  frequency: [_frequency.onAccountsChanged$]
})(function () {
  return (0, _getFrequency.default)(accounts$).pipe();
});
/**
 * Get the balance of a given account. Calls `eth_getBalance`.
 *
 * @param {String} address - The account address to query the balance.
 * @return {Observable<BigNumber>} - An Observable containing the balance.
 */

exports.accounts$ = accounts$;
var balanceOf$ = (0, _createRpc.default)({
  calls: ['eth_getBalance'],
  frequency: [_frequency.onEvery2Blocks$, _frequency.onStartup$]
})(function (address) {
  return (0, _getFrequency.default)(balanceOf$).pipe((0, _operators2.switchMapPromise)(function () {
    return (0, _api.default)().eth.getBalance(address);
  }));
});
/**
 * Get the default account managed by the light client.
 *
 * @return {Observable<Address>} - An Observable containing the public address
 * of the default account.
 */

exports.balanceOf$ = balanceOf$;
var defaultAccount$ = (0, _createRpc.default)({
  dependsOn: ['accounts$']
})(function () {
  return accounts$().pipe((0, _operators.map)(function (accounts) {
    return accounts[0];
  }));
});
/**
 * Get the current block height.
 *
 * @return {Observable<Number>} - An Observable containing the block height.
 */

exports.defaultAccount$ = defaultAccount$;
var height$ = (0, _createRpc.default)({
  frequency: [_frequency.onEveryBlock$]
})(function () {
  return (0, _getFrequency.default)(height$);
});
/**
 * Alias for {@link height$}.
 *
 * @return {Observable<Number>} - An Observable containing the block height.
 */

exports.height$ = height$;
var blockNumber$ = (0, _createRpc.default)({
  dependsOn: ['height$']
})(function () {
  return height$();
});
/**
 * Alias for {@link defaultAccount$}.
 *
 * @return {Observable<Address>} - An Observable containing the public address
 * of the default account.
 */

exports.blockNumber$ = blockNumber$;
var me$ = (0, _createRpc.default)({
  dependsOn: ['defaultAccount$']
})(function () {
  return defaultAccount$();
});
/**
 * Shorthand for fetching the current account's balance.
 */

exports.me$ = me$;
var myBalance$ = (0, _createRpc.default)({
  dependsOn: ['balanceOf$', 'defaultAccount$']
})(function () {
  return defaultAccount$().pipe((0, _operators.switchMap)(function (defaultAccount) {
    return (0, _isLoading.isNullOrLoading)(defaultAccount) ? (0, _rxjs.of)(_isLoading.RPC_LOADING) : balanceOf$(defaultAccount);
  }));
});
/**
 * Get the syncing state.
 *
 * @return {Observable<Object | Boolean>} - An Observable containing the
 * syncing state object, or false.
 */

exports.myBalance$ = myBalance$;
var syncing$ = (0, _createRpc.default)({
  frequency: [_frequency.onSyncingChanged$]
})(function () {
  return (0, _getFrequency.default)(syncing$);
});
exports.syncing$ = syncing$;