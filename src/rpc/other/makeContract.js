// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import Abi from '@parity/abi';
import memoizee from 'memoizee';

import {
  addToOverview,
  distinctReplayRefCount,
  switchMapPromise
} from '../../utils/operators';
import api from '../../api';
import getPriority from '../utils/getPriority';
import { onEveryBlock$ } from '../../frequency';

/**
 * Cache contracts, so that they are:
 * - only created after the first call/transaction to a contract has been made
 * - further calls/transactions to the same contract doesn't recreate the
 *   contract
 *
 * @param {String} address - The contract address.
 * @param {Array<Object>} - The contract abi.
 * @return {Object} - The contract object as defined in @parity/api.
 */
const getContract = memoizee(
  (address, abiJson) => api().newContract(abiJson, address),
  { length: 1 } // Only memoize by address
);

/**
 * Create a contract.
 *
 * @param {Object} address - The contract address.
 * @param {Array<Object>} - The contract abi.
 * @return {Object} - An object whose keys are all the functions of the
 * contract, and each function return an Observable which will fire when the
 * function resolves.
 */
export const makeContract$ = memoizee(
  (address, abiJson) => {
    const abi = new Abi(abiJson);
    // Variable result will hold the final object to return
    const result = { abi: abi, address: address };

    // We then copy every key inside contract.instance into our `result` object,
    // replacing each the value by an Observable instead of a Promise.
    abi.functions.forEach(({ name }) => {
      result[`${name}$`] = (...args) => {
        const contract = getContract(address, abiJson);
        return getPriority(makeContract$).pipe(
          switchMapPromise(
            () =>
              contract.instance[name].constant
                ? contract.instance[name].call({}, args)
                : contract.instance[name].postTransaction({}, args)
          ),
          distinctReplayRefCount(),
          addToOverview(makeContract$)
        );
      };
    });

    return result;
  },
  { length: 1 } // Only memoize by address
);
makeContract$.metadata = {
  calls: [],
  priority: [onEveryBlock$]
};
