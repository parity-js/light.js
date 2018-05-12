// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import { map } from 'rxjs/operators';

import {
  addToOverview,
  distinctReplayRefCount,
  switchMapPromise
} from '../../utils/operators';
import api from '../../api';
import createRpc$ from '../../utils/createRpc';
import { getPriority } from '../../priorities/getPriority';
import {
  onEvery2Blocks$,
  onEveryBlock$,
  onEverySecond$,
  onStartup$
} from '../../priorities';

/**
 * Get the balance of a given account.
 *
 * Calls eth_getBalance.
 *
 * @param {String} address - The account address to query the balance.
 * @return {Observable<Number>} - An Observable containing the balance.
 */
export const balanceOf$ = createRpc$({
  calls: ['eth_getBalance'],
  priority: [onEvery2Blocks$, onStartup$]
})(address =>
  getPriority(balanceOf$).pipe(
    switchMapPromise(() => api().eth.getBalance(address)),
    map(_ => +_), // Return number instead of BigNumber
    distinctReplayRefCount(),
    addToOverview('balanceOf$')
  )
);

/**
 * Get the current block height.
 *
 * Calls parity_subscribe('eth_blockNumber').
 *
 * @return {Observable<Number>} - An Observable containing the block height
 */
export const height$ = createRpc$({ priority: [onEveryBlock$] })(() =>
  getPriority(height$).pipe(addToOverview('height$'))
);

/**
 * Alias for {@link height$}
 */
export const blockNumber$ = createRpc$()(() =>
  height$().pipe(addToOverview('blockNumber'))
);

/**
 * Get the syncing state.
 *
 * Calls eth_syncing.
 *
 * @param {String} address - The account address to query the balance.
 * @return {Observable<Number>} - An Observable containing the balance.
 */
export const syncing$ = createRpc$({
  calls: ['eth_syncing'],
  priority: [onEverySecond$]
})(() =>
  getPriority(syncing$).pipe(
    switchMapPromise(() => api().eth.syncing()),
    distinctReplayRefCount(),
    addToOverview('syncing$')
  )
);
