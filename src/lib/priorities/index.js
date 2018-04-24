// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.

// SPDX-License-Identifier: MIT

import {
  onAccountsChanged$,
  onEvery2Blocks$,
  onEveryBlock$,
  onEvery2Seconds$,
  onStartup$
} from './on';

const priorities = {
  accounts$: [onAccountsChanged$],
  balanceOf$: [onEvery2Blocks$, onStartup$],
  blockNumber$: [onEveryBlock$],
  chainName$: [onStartup$],
  chainStatus$: [onEveryBlock$],
  defaultAccount$: [onAccountsChanged$],
  height$: [onEveryBlock$],
  nodeHealth$: [onEvery2Seconds$]
};

export * from './priority';

export default priorities;
