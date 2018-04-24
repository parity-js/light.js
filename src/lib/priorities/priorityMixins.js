// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.

// SPDX-License-Identifier: MIT

export const priorityMixins = {
  /**
   * Change the priority of a RPC Observable.
   *
   * @param {Object} priority - An array of priority Observables.
   * @return {Null}
   * @example
   * setPriority({balanceOf$: onEverySecond$}); // Will fetch balance every
   * second.
   */
  setPriority(priority) {
    // TODO Check that priority is well-formed

    this.metadata.priority = priority;

    // Object.keys(priority).forEach(key => {
    //   // If necessary, we clear the memoize cache
    //   if (typeof rpc[key].clear === 'function') {
    //     rpc[key].clear();
    //   }
    // });
  }
};
