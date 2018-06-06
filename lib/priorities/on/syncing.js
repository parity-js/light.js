"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.onSyncingChanged$ = void 0;

var _api = _interopRequireDefault(require("../../api"));

var _createOnFromPubsub = _interopRequireDefault(require("../../utils/createOnFromPubsub"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

/**
 * Observable that emits when syncing status changes.
 */
var onSyncingChanged$ = (0, _createOnFromPubsub.default)(_api.default, 'eth_syncing');
exports.onSyncingChanged$ = onSyncingChanged$;
onSyncingChanged$.metadata = {
  name: 'onSyncingChanged$'
};