// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.

// SPDX-License-Identifier: MIT

import { merge } from 'rxjs/observable/merge';

import priorities from './';
import * as rpc from '../rpc';

/**
 * Get the priority of a RPC Observable, i.e. how often is this Observable
 * updated.
 *
 * @param {String} name - The name of the Observable.
 * @return {Observable} - An Observable that represents the priority.
 */
export const getPriority = name => {
  return merge(...priorities[name]);
};

/**
 * Change the priority of a RPC Observable.
 *
 * @param {Object} priority - An Object where the key is an RPC Observable
 * name, and the value is a priority Observable.
 * @return {Null}
 * @example
 * setPriority({balanceOf$: onEverySecond$}); // Will fetch balance every
 * second.
 */
export const setPriority = priority => {
  // TODO Check that priority is well-formed

  Object.assign(priorities, priority);

  Object.keys(priority).forEach(key => {
    console.log(rpc[key]());
    // If necessary, we clear the memoize cache
    if (typeof rpc[key].clear === 'function') {
      rpc[key].clear();
    }
  });
};
