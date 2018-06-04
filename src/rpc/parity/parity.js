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
import createRpc$ from '../../utils/createRpc';
import { getPriority } from '../../priorities/getPriority';
import {
  onAccountsInfoChanged$,
  onEvery2Seconds$,
  onStartup$
} from '../../priorities';

/**
 * Get accounts info.
 *
 * Calls parity_accountsInfo.
 *
 * @return {Observable<Object>} - An Observable containing all info that can be
 * accessed by user concerning accounts.
 */
export const accountsInfo$ = createRpc$({
  calls: ['parity_accountsInfo'],
  priority: [onAccountsInfoChanged$]
})(() =>
  getPriority(accountsInfo$).pipe(
    switchMapPromise(() => api().parity.accountsInfo()),
    distinctReplayRefCount(),
    addToOverview(accountsInfo$)
  )
);

/**
 * Get the name of the current chain.
 *
 * Calls parity_netChain.
 *
 * @return {Observable<String>} - An Observable containing the name of the
 * current chain.
 */
export const chainName$ = createRpc$({
  calls: ['parity_netChain'],
  priority: [onStartup$]
})(() =>
  getPriority(chainName$).pipe(
    switchMapPromise(() => api().parity.netChain()),
    distinctReplayRefCount(),
    addToOverview(chainName$)
  )
);

/**
 * Get the node's health.
 *
 * Calls parity_nodeHealth.
 *
 * @return {Observable<Object>} - An Observable containing the health.
 */
export const nodeHealth$ = createRpc$({
  calls: ['parity_nodeHealth'],
  priority: [onEvery2Seconds$]
})(() =>
  getPriority(nodeHealth$).pipe(
    switchMapPromise(() => api().parity.nodeHealth()),
    distinctReplayRefCount(),
    addToOverview(nodeHealth$)
  )
);
