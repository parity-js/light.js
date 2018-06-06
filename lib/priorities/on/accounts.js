"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.onAccountsInfoChanged$ = exports.onAccountsChanged$ = void 0;

var _api = _interopRequireDefault(require("../../api"));

var _createOnFromPubsub = _interopRequireDefault(require("../../utils/createOnFromPubsub"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

/**
 * Observable that emits each time the default account changes
 */
var onAccountsChanged$ = (0, _createOnFromPubsub.default)(_api.default, 'eth_accounts');
exports.onAccountsChanged$ = onAccountsChanged$;
onAccountsChanged$.metadata = {
  name: 'onAccountsChanged$'
};
/**
 * Observable that emits each time the default account changes
 */

var onAccountsInfoChanged$ = (0, _createOnFromPubsub.default)(_api.default, 'parity_accountsInfo');
exports.onAccountsInfoChanged$ = onAccountsInfoChanged$;
onAccountsInfoChanged$.metadata = {
  name: 'onAccountsInfoChanged$'
};