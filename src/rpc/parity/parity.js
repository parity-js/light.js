// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import {
  addToOverview,
  distinctReplayRefCount,
  switchMapPromise
} from '../../utils/operators';
import api from '../../api';
import createRpc$ from '../utils/createRpc';
import getFrequency from '../utils/getFrequency';
import {
  onAccountsInfoChanged$,
  onEvery2Seconds$,
  onStartup$
} from '../../frequency';

/**
 * Get accounts info. Calls `parity_accountsInfo`.
 *
 * @return {Observable<Object>} - An Observable containing all info that can be
 * accessed by user concerning accounts.
 */
export const accountsInfo$ = createRpc$({
  calls: ['parity_accountsInfo'],
  frequency: [onAccountsInfoChanged$]
})(() =>
  getFrequency(accountsInfo$).pipe(
    switchMapPromise(() => api().parity.accountsInfo()),
    distinctReplayRefCount(),
    addToOverview(accountsInfo$)
  )
);

/**
 * Get the name of the current chain. Calls `parity_netChain`.
 *
 * @return {Observable<String>} - An Observable containing the name of the
 * current chain.
 */
export const chainName$ = createRpc$({
  calls: ['parity_netChain'],
  frequency: [onStartup$]
})(() =>
  getFrequency(chainName$).pipe(
    switchMapPromise(() => api().parity.netChain()),
    distinctReplayRefCount(),
    addToOverview(chainName$)
  )
);

/**
 * Get the node's health. Calls `parity_nodeHealth`.
 *
 * @return {Observable<Object>} - An Observable containing the health.
 */
export const nodeHealth$ = createRpc$({
  calls: ['parity_nodeHealth'],
  frequency: [onEvery2Seconds$]
})(() =>
  getFrequency(nodeHealth$).pipe(
    switchMapPromise(() => api().parity.nodeHealth()),
    distinctReplayRefCount(),
    addToOverview(nodeHealth$)
  )
);
