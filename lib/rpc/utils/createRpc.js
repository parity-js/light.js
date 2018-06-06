"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _memoizee = _interopRequireDefault(require("memoizee"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

/**
 * Mixins (aka. interface in Java or trait in Rust) that are added into an rpc$
 * Observable.
 *
 * @ignore
 */
var frequencyMixins = {
  /**
   * Change the frequency of a RPC Observable.
   *
   * @param {Array<Observable>} frequency - An array of frequency Observables.
   * @return {Null}
   * @example
   * balanceOf$.setFrequency([onEverySecond$, onStartup$]); // Will fetch
   * balance once on startup, and then every second.
   */
  setFrequency: function setFrequency(frequency) {
    // TODO Check that frequency is well-formed
    this.metadata.frequency = frequency; // If necessary, we clear the memoize cache

    if (typeof this.clear === 'function') {
      this.clear();
    }
  }
};
/**
 * Add metadata to an rpc$ Observable.
 *
 * @ignore
 * @param {Object} metadata - The metadata to add.
 * @return {Observable} - The original rpc$ Observable with patched metadata.
 */

var createRpc = function createRpc() {
  var metadata = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return function (rpc$) {
    var result$ = (0, _memoizee.default)(rpc$);
    Object.assign(result$, frequencyMixins, {
      metadata: metadata
    });
    return result$;
  };
};

var _default = createRpc;
exports.default = _default;