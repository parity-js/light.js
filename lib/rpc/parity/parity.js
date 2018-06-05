"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.nodeHealth$ = exports.chainName$ = exports.accountsInfo$ = void 0;

var _operators = require("../../utils/operators");

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
 * Get accounts info.
 *
 * Calls parity_accountsInfo.
 *
 * @return {Observable<Object>} - An Observable containing all info that can be
 * accessed by user concerning accounts.
 */
var accountsInfo$ = (0, _createRpc.default)({
  calls: ['parity_accountsInfo'],
  priority: [_priorities.onAccountsInfoChanged$]
})(function () {
  return (0, _getPriority.getPriority)(accountsInfo$).pipe((0, _operators.switchMapPromise)(function () {
    return (0, _api.default)().parity.accountsInfo();
  }), (0, _operators.distinctReplayRefCount)(), (0, _operators.addToOverview)(accountsInfo$));
});
/**
 * Get the name of the current chain.
 *
 * Calls parity_netChain.
 *
 * @return {Observable<String>} - An Observable containing the name of the
 * current chain.
 */

exports.accountsInfo$ = accountsInfo$;
var chainName$ = (0, _createRpc.default)({
  calls: ['parity_netChain'],
  priority: [_priorities.onStartup$]
})(function () {
  return (0, _getPriority.getPriority)(chainName$).pipe((0, _operators.switchMapPromise)(function () {
    return (0, _api.default)().parity.netChain();
  }), (0, _operators.distinctReplayRefCount)(), (0, _operators.addToOverview)(chainName$));
});
/**
 * Get the node's health.
 *
 * Calls parity_nodeHealth.
 *
 * @return {Observable<Object>} - An Observable containing the health.
 */

exports.chainName$ = chainName$;
var nodeHealth$ = (0, _createRpc.default)({
  calls: ['parity_nodeHealth'],
  priority: [_priorities.onEvery2Seconds$]
})(function () {
  return (0, _getPriority.getPriority)(nodeHealth$).pipe((0, _operators.switchMapPromise)(function () {
    return (0, _api.default)().parity.nodeHealth();
  }), (0, _operators.distinctReplayRefCount)(), (0, _operators.addToOverview)(nodeHealth$));
});
exports.nodeHealth$ = nodeHealth$;