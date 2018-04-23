// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.

// SPDX-License-Identifier: MIT

import {
  onAccountsChanged$,
  onEvery2Blocks$,
  onEveryBlock$,
  onEvery2Seconds$,
  onlyAtStartup$
} from './on';

const priotization = {
  accounts$: onAccountsChanged$,
  balanceOf$: onEvery2Blocks$,
  blockNumber$: onEveryBlock$,
  chainName$: onlyAtStartup$,
  chainStatus$: onEveryBlock$,
  defaultAccount$: onAccountsChanged$,
  height$: onEveryBlock$,
  nodeHealth$: onEvery2Seconds$
};

/**
 * Change the priority of an Observable.
 *
 * @param {Object} priority - An Object where the key is an RPC Observable
 * name, and the value is a priority Observable.
 * @example
 * setPriority({balanceOf$: onEverySecond$}); // Will fetch balance every
 * second.
 */
export const setPriority = priority => {
  Object.assign(priotization, priority);
};

export default priotization;
