// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.

// SPDX-License-Identifier: MIT

import Api from '@parity/api';
import { map } from 'rxjs/operators';
import memoize from 'lodash/memoize';

import api from '../../api';
import {
  addToOverview,
  distinctReplayRefCount,
  switchMapPromise
} from '../../utils/operators';
import priotization from '../../priotization';

/**
 * Get all accounts managed by the light client.
 *
 * Calls eth_accounts.
 *
 * @returns {Observable<Array<String>>} - An Observable containing the list of accounts
 */
export const accounts$ = priotization.accounts$.pipe(
  switchMapPromise(() => api.eth.accounts()),
  map(accounts => accounts.map(Api.util.toChecksumAddress)),
  addToOverview('accounts$'),
  distinctReplayRefCount()
);

/**
 * Get the balance of a given account.
 *
 * Calls eth_getBalance.
 *
 * @param {String} address - The account address to query the balance.
 * @returns {Observable<Number>} - An Observable containing the balance.
 */
export const balanceOf$ = memoize(address =>
  priotization.balanceOf$.pipe(
    switchMapPromise(() => api.eth.getBalance(address)),
    map(_ => +_), // Return number instead of BigNumber
    addToOverview('balanceOf$'),
    distinctReplayRefCount()
  )
);

/**
 * Get the default account managed by the light client.
 *
 * Fetches the first account in {@link accounts$}.
 */
export const defaultAccount$ = accounts$.pipe(
  map(accounts => accounts[0]),
  addToOverview('defaultAccount$', 'accounts$'),
  distinctReplayRefCount()
);

/**
 * Get the current block height.
 *
 * Calls parity_subscribe('eth_blockNumber').
 *
 * @returns {Observable<Number>} - An Observable containing the block height
 */
export const height$ = priotization.height$.pipe(addToOverview('height$'));

/**
 * Alias for {@link height$}
 */
export const blockNumber$ = height$.pipe(
  addToOverview('blockNumber', 'height$')
);

/**
 * Alias for {@link defaultAccount$}
 */
export const me$ = defaultAccount$.pipe(addToOverview('me$', 'accounts$'));
