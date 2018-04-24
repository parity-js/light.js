// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.

// SPDX-License-Identifier: MIT

import Api from '@parity/api';
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
  onAccountsChanged$,
  onEvery2Blocks$,
  onEveryBlock$,
  onStartup$
} from '../../priorities';

/**
 * Observable which contains the array of all accounts managed by the light
 * client.
 *
 * Calls eth_accounts.
 *
 * @return {Observable<Array<String>>} - An Observable containing the list of accounts.
 */
export const accounts$ = createRpc$({
  calls: ['eth_accounts'],
  priority: [onAccountsChanged$]
})(() =>
  getPriority(accounts$).pipe(
    switchMapPromise(() => api().eth.accounts()),
    map(accounts => accounts.map(Api.util.toChecksumAddress)),
    distinctReplayRefCount(),
    addToOverview('accounts$')
  )
);

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
 * Get the default account managed by the light client.
 *
 * Fetches the first account in {@link accounts$}.
 */
export const defaultAccount$ = createRpc$()(() =>
  accounts$().pipe(
    map(accounts => accounts[0]),
    addToOverview('defaultAccount$')
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
  height$.pipe(addToOverview('blockNumber'))
);

/**
 * Alias for {@link defaultAccount$}
 */
export const me$ = createRpc$()(() =>
  defaultAccount$.pipe(addToOverview('me$'))
);
