"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.me$ = exports.blockNumber$ = exports.height$ = exports.defaultAccount$ = exports.balanceOf$ = exports.accounts$ = void 0;

var _api = _interopRequireDefault(require("@parity/api"));

var _operators = require("rxjs/operators");

var _operators2 = require("../../utils/operators");

var _api2 = _interopRequireDefault(require("../../api"));

var _createRpc = _interopRequireDefault(require("../../utils/createRpc"));

var _getPriority = require("../../priorities/getPriority");

var _priorities = require("../../priorities");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
// SPDX-License-Identifier: MIT

/**
 * Observable which contains the array of all accounts managed by the light
 * client.
 *
 * Calls eth_accounts.
 *
 * @return {Observable<Array<String>>} - An Observable containing the list of accounts.
 */
var accounts$ = (0, _createRpc.default)({
  calls: ['eth_accounts'],
  priority: [_priorities.onAccountsChanged$]
})(function () {
  return (0, _getPriority.getPriority)(accounts$).pipe((0, _operators2.switchMapPromise)(function () {
    return (0, _api2.default)().eth.accounts();
  }), (0, _operators.map)(function (accounts) {
    return accounts.map(_api.default.util.toChecksumAddress);
  }), (0, _operators2.distinctReplayRefCount)(), (0, _operators2.addToOverview)('accounts$'));
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
    return (0, _api2.default)().eth.getBalance(address);
  }), (0, _operators.map)(function (_) {
    return +_;
  }), // Return number instead of BigNumber
  (0, _operators2.distinctReplayRefCount)(), (0, _operators2.addToOverview)('balanceOf$'));
});
/**
 * Get the default account managed by the light client.
 *
 * Fetches the first account in {@link accounts$}.
 */

exports.balanceOf$ = balanceOf$;
var defaultAccount$ = (0, _createRpc.default)()(function () {
  return accounts$().pipe((0, _operators.map)(function (accounts) {
    return accounts[0];
  }), (0, _operators2.addToOverview)('defaultAccount$'));
});
/**
 * Get the current block height.
 *
 * Calls parity_subscribe('eth_blockNumber').
 *
 * @return {Observable<Number>} - An Observable containing the block height
 */

exports.defaultAccount$ = defaultAccount$;
var height$ = (0, _createRpc.default)({
  priority: [_priorities.onEveryBlock$]
})(function () {
  return (0, _getPriority.getPriority)(height$).pipe((0, _operators2.addToOverview)('height$'));
});
/**
 * Alias for {@link height$}
 */

exports.height$ = height$;
var blockNumber$ = (0, _createRpc.default)()(function () {
  return height$.pipe((0, _operators2.addToOverview)('blockNumber'));
});
/**
 * Alias for {@link defaultAccount$}
 */

exports.blockNumber$ = blockNumber$;
var me$ = (0, _createRpc.default)()(function () {
  return defaultAccount$.pipe((0, _operators2.addToOverview)('me$'));
});
exports.me$ = me$;