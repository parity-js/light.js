// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import Abi from '@parity/abi';

import {
  addToOverview,
  distinctReplayRefCount,
  switchMapPromise
} from '../../utils/operators';
import api from '../../api';
import { getPriority } from '../../priorities/getPriority';
import { onEvery2Seconds$ } from '../../priorities';

/**
 * Create a contract.
 *
 * @param {Object} tx - A transaction object.
 * @return {Observable<Object>} - The status of the transaction.
 */
export const makeContract$ = (address, abi) => {
  console.log(new Abi(abi));
  // Variable result will hold the final object to return
  const result = { address };
  // Constant functions
  abi
    .filter(({ constant, type }) => constant === true && type === 'function')
    .forEach(({ inputs, name }) => {
      const f = (...args) => {
        // Last argument can be optional options
        // const options = args.length === i.inputs.length + 1 ? args.pop() : {};
        if (args.length !== inputs.length) {
          throw new Error(
            `Invalid number of arguments to ${name}. Expected ${inputs.length}, got ${args.length}.`
          );
        }
        return api().eth.call(address);
      };
      result[name] = getPriority(makeContract$).pipe(
        switchMapPromise(f),
        distinctReplayRefCount(),
        addToOverview(makeContract$)
      );
    });
};
makeContract$.metadata = {
  calls: [
    'eth_estimateGas',
    'parity_postTransaction',
    'parity_checkRequest',
    'eth_getTransactionReceipt'
  ],
  priority: [onEvery2Seconds$]
};
