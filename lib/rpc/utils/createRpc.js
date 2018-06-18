"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _memoizee = _interopRequireDefault(require("memoizee"));

var _rxjs = require("rxjs");

var _addToOverview = require("../../../example/src/light.js/utils/operators/addToOverview");

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
 * Add metadata to an rpc$ Observable, and transform it into a ReplaySubject(1).
 *
 * @ignore
 * @param {Object} metadata - The metadata to add.
 * @return {Observable} - The original rpc$ Observable with patched metadata.
 */

var createRpc = function createRpc() {
  var metadata = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return function (source$) {
    var rpc$ = function rpc$() {
      var subject$ = new _rxjs.ReplaySubject(1);
      source$.apply(void 0, arguments).pipe((0, _addToOverview.addToOverview)(metadata)).subscribe(subject$);
      return subject$;
    };

    var result$ = (0, _memoizee.default)(rpc$);
    Object.assign(result$, frequencyMixins, {
      metadata: metadata
    });
    return result$;
  };
};

var _default = createRpc;
exports.default = _default;