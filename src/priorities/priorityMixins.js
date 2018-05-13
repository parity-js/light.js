// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

// Mixins (aka. interface in Java or trait in Rust) that are added into an rpc$
// Observable.
const priorityMixins = {
  /**
   * Change the priority of a RPC Observable.
   *
   * @param {Array<Observable>} priority - An array of priority Observables.
   * @return {Null}
   * @example
   * balanceOf$.setPriority([onEverySecond$, onStartup$]); // Will fetch
   * balance once on startup, and then every second.
   */
  setPriority (priority) {
    // TODO Check that priority is well-formed

    this.metadata.priority = priority;

    // If necessary, we clear the memoize cache
    if (typeof this.clear === 'function') {
      this.clear();
    }
  }
};

export default priorityMixins;
