"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.priorityMixins = void 0;
// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
// SPDX-License-Identifier: MIT
var priorityMixins = {
  /**
   * Change the priority of a RPC Observable.
   *
   * @param {Object} priority - An array of priority Observables.
   * @return {Null}
   * @example
   * setPriority({balanceOf$: onEverySecond$}); // Will fetch balance every
   * second.
   */
  setPriority: function setPriority(priority) {
    // TODO Check that priority is well-formed
    this.metadata.priority = priority; // If necessary, we clear the memoize cache

    if (typeof this.clear === 'function') {
      this.clear();
    }
  }
};
exports.priorityMixins = priorityMixins;