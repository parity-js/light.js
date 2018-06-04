"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.syncing$ = exports.myBalance$ = exports.me$ = exports.blockNumber$ = exports.height$ = exports.defaultAccount$ = exports.balanceOf$ = exports.accounts$ = void 0;

var _operators = require("rxjs/operators");

var _operators2 = require("../../utils/operators");

var _api = _interopRequireDefault(require("../../api"));

var _createRpc = _interopRequireDefault(require("../../utils/createRpc"));

var _getPriority = require("../../priorities/getPriority");

var _priorities = require("../../priorities");

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
  priority: [_priorities.onAccountsChanged$]
})(function () {
  return (0, _getPriority.getPriority)(accounts$).pipe((0, _operators2.addToOverview)(accounts$));
});
/**
 * Get the balance of a given account.
 *
 * Calls eth_getBalance.
 *
 * @param {String} address - The account address to query the balance.
 * @return {Observable<Number>} - An Observable containing the balance.
 */

exports.accounts$ = accounts$;
var balanceOf$ = (0, _createRpc.default)({
  calls: ['eth_getBalance'],
  priority: [_priorities.onEvery2Blocks$, _priorities.onStartup$]
})(function (address) {
  return (0, _getPriority.getPriority)(balanceOf$).pipe((0, _operators2.switchMapPromise)(function () {
    return (0, _api.default)().eth.getBalance(address);
  }), (0, _operators2.distinctReplayRefCount)(), (0, _operators2.addToOverview)(balanceOf$));
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
  }), (0, _operators2.addToOverview)(defaultAccount$));
});
/**
 * Get the current block height.
 *
 * @return {Observable<Number>} - An Observable containing the block height.
 */

exports.defaultAccount$ = defaultAccount$;
var height$ = (0, _createRpc.default)({
  priority: [_priorities.onEveryBlock$]
})(function () {
  return (0, _getPriority.getPriority)(height$).pipe((0, _operators2.addToOverview)(height$));
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
  return height$().pipe((0, _operators2.addToOverview)(blockNumber$));
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
  return defaultAccount$().pipe((0, _operators2.addToOverview)(me$));
});
/**
 * Shorthand for fetching the current account's balance.
 */

exports.me$ = me$;
var myBalance$ = (0, _createRpc.default)({
  dependsOn: ['balanceOf$', 'defaultAccount$']
})(function () {
  return defaultAccount$().pipe((0, _operators.switchMap)(balanceOf$), (0, _operators2.addToOverview)(myBalance$));
});
/**
 * Get the syncing state.
 *
 * @return {Observable<Object | Boolean>} - An Observable containing the
 * syncing state object, or false.
 */

exports.myBalance$ = myBalance$;
var syncing$ = (0, _createRpc.default)({
  priority: [_priorities.onSyncingChanged$]
})(function () {
  return (0, _getPriority.getPriority)(syncing$).pipe((0, _operators2.distinctReplayRefCount)(), (0, _operators2.addToOverview)(syncing$));
});
exports.syncing$ = syncing$;