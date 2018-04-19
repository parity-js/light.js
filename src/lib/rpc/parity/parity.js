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
import priotization from '../../priotization';

/**
 * Get the name of the current chain.
 *
 * Calls parity_netChain.
 *
 * @returns {Observable<String>} - An Observable containing the name of the current chain.
 */
export const chainName$ = priotization.chainName$.pipe(
  switchMapPromise(() => api.parity.netChain()),
  addToOverview('chainName$')
);

/**
 * Get the status of the current chain.
 *
 * Calls parity_chainStatus.
 *
 * @returns {Observable<String>} - An Observable containing the status.
 */
export const chainStatus$ = priotization.chainStatus$.pipe(
  switchMapPromise(() => api.parity.chainStatus()),
  addToOverview('chainStatus$'),
  distinctReplayRefCount()
);

/**
 * Get the node's health.
 *
 * Calls parity_nodeHealth.
 *
 * @returns {Observable<Object>} - An Observable containing the health.
 */
export const nodeHealth$ = priotization.nodeHealth$.pipe(
  switchMapPromise(() => api.parity.nodeHealth()),
  addToOverview('nodeHealth$')
);

/**
 * Post a transaction to the network.
 *
 * Calls parity_postTransaction. Subsequently calls parity_checkRequest and
 * eth_getTransactionReceipt to get the status of the transaction.
 *
 * @param {Object} tx - A transaction object
 * @returns {Observable<Object>}
 */
export const post$ = tx =>
  Observable.create(async observer => {
    try {
      observer.next({ estimating: null });
      const gas = await api.eth.estimateGas(tx);
      observer.next({ estimated: gas });
      const signerRequestId = await api.parity.postTransaction(tx);
      observer.next({ requested: signerRequestId });
      const transactionHash = await api.pollMethod(
        'parity_checkRequest',
        signerRequestId
      );
      if (tx.condition) {
        observer.next({ signed: transactionHash, schedule: tx.condition });
      } else {
        observer.next({ signed: transactionHash });
        const receipt = await api.pollMethod(
          'eth_getTransactionReceipt',
          transactionHash,
          receipt =>
            receipt && receipt.blockNumber && !receipt.blockNumber.eq(0)
        );
        observer.next({ confirmed: receipt });
      }

      observer.complete();
    } catch (error) {
      observer.error({ failed: error });
    }
  });
