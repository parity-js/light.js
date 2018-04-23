// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.

// SPDX-License-Identifier: MIT

import { Observable } from 'rxjs/Observable';

import api from '../../api';
import {
  addToOverview,
  distinctReplayRefCount,
  switchMapPromise
} from '../../utils/operators';
import { onAccountsChanged$ } from '../../priotization/on';
import priotization from '../../priotization';

/**
 * Get the name of the current chain.
 *
 * Calls parity_netChain.
 *
 * @return {Observable<String>} - An Observable containing the name of the
 * current chain.
 */
export const chainName$ = priotization.chainName$.pipe(
  switchMapPromise(() => api().parity.netChain()),
  distinctReplayRefCount(),
  addToOverview('chainName$')
);
chainName$.metadata = { calls: ['parity_netChain'] };

/**
 * Get the status of the current chain.
 *
 * Calls parity_chainStatus.
 *
 * @return {Observable<String>} - An Observable containing the status.
 */
export const chainStatus$ = priotization.chainStatus$.pipe(
  switchMapPromise(() => api().parity.chainStatus()),
  distinctReplayRefCount(),
  addToOverview('chainStatus$')
);
chainStatus$.metadata = { calls: ['parity_chainStatus'] };

/**
 * Get the node's health.
 *
 * Calls parity_nodeHealth.
 *
 * @return {Observable<Object>} - An Observable containing the health.
 */
export const nodeHealth$ = priotization.nodeHealth$.pipe(
  switchMapPromise(() => api().parity.nodeHealth()),
  distinctReplayRefCount(),
  addToOverview('nodeHealth$')
);
nodeHealth$.metadata = { calls: ['parity_nodeHealth'] };

/**
 * Post a transaction to the network.
 *
 * Calls, in this order, eth_estimateGas, parity_postTransaction,
 * parity_checkRequest and eth_getTransactionReceipt to get the status of the
 * transaction.
 *
 * @param {Object} tx - A transaction object
 * @return {Observable<Object>}
 */
export const post$ = tx => {
  const source$ = Observable.create(async observer => {
    try {
      observer.next({ estimating: null });
      const gas = await api().eth.estimateGas(tx);
      observer.next({ estimated: gas });
      const signerRequestId = await api().parity.postTransaction(tx);
      observer.next({ requested: signerRequestId });
      const transactionHash = await api().pollMethod(
        'parity_checkRequest',
        signerRequestId
      );
      if (tx.condition) {
        observer.next({ signed: transactionHash, schedule: tx.condition });
      } else {
        observer.next({ signed: transactionHash });
        const receipt = await api().pollMethod(
          'eth_getTransactionReceipt',
          transactionHash,
          receipt =>
            receipt && receipt.blockNumber && !receipt.blockNumber.eq(0)
        );
        observer.next({ confirmed: receipt });
      }

      observer.complete();
    } catch (error) {
      observer.next({ failed: error });
      observer.error(error);
    }
  }).pipe(distinctReplayRefCount(), addToOverview('post$'));

  source$.subscribe(); // Run this Observable immediately;
  return source$;
};
post$.metadata = {
  calls: [
    'eth_estimateGas',
    'parity_postTransaction',
    'parity_checkRequest',
    'eth_getTransactionReceipt'
  ]
};

export const setDefaultAccount$ = value => {
  const source$ = Observable.create(async observer => {
    try {
      await api().parity.setNewDappsDefaultAddress(value);
      onAccountsChanged$.next();
      observer.complete();
    } catch (error) {
      observer.error(error);
    }
  }).pipe(distinctReplayRefCount(), addToOverview('setDefaultAccount$'));

  source$.subscribe(); // Run this Observable immediately
  return source$;
};
setDefaultAccount$.metadata = { calls: ['parity_setNewDappsDefaultAddress'] };
