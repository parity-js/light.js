// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import memoizee from 'memoizee';

/**
 * Mixins (aka. interface in Java or trait in Rust) that are added into an rpc$
 * Observable.
 *
 * @ignore
 */
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

/**
 * Add metadata to an rpc$ Observable.
 *
 * @ignore
 * @param {Object} metadata - The metadata to add.
 * @return {Observable} - The original rpc$ Observable with patched metadata.
 */
const createRpc = (metadata = {}) => rpc$ => {
  const result$ = memoizee(rpc$);
  Object.assign(result$, priorityMixins, { metadata });
  return result$;
};

export default createRpc;
