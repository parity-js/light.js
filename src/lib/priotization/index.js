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

export default priotization;
