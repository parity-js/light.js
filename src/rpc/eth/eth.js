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
  onAccountsChanged$,
  onEvery2Blocks$,
  onEveryBlock$,
  onEverySecond$,
  onStartup$
} from '../../priorities';

/**
 * Observable which contains the array of all addresses managed by the light
 * client.
 *
 * Calls eth_accounts.
 *
 * @return {Observable<Array<String>>} - An Observable containing the list of
 * public addresses.
 */
export const accounts$ = createRpc$({
  calls: ['eth_accounts'],
  priority: [onAccountsChanged$]
})(() => getPriority(accounts$).pipe(addToOverview(accounts$)));

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
    addToOverview(balanceOf$)
  )
);

/**
 * Get the default account managed by the light client.
 *
 * @return {Observable<Address>} - An Observable containing the public address
 * of the default account.
 */
export const defaultAccount$ = createRpc$({
  parent: 'accounts$'
})(() =>
  accounts$().pipe(map(accounts => accounts[0]), addToOverview(defaultAccount$))
);

/**
 * Get the current block height.
 *
 * @return {Observable<Number>} - An Observable containing the block height.
 */
export const height$ = createRpc$({ priority: [onEveryBlock$] })(() =>
  getPriority(height$).pipe(addToOverview(height$))
);

/**
 * Alias for {@link height$}.
 */
export const blockNumber$ = createRpc$({ parent: 'height$' })(() =>
  height$().pipe(addToOverview(blockNumber$))
);

/**
 * Alias for {@link defaultAccount$}.
 */
export const me$ = createRpc$({
  parent: 'defaultAccount$'
})(() => defaultAccount$().pipe(addToOverview(me$)));

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
    addToOverview(syncing$)
  )
);
