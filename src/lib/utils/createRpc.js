// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.

// SPDX-License-Identifier: MIT

import memoize from 'memoizee';

import { priorityMixins } from '../priorities/priorityMixins';

/**
 * Add metadata to an rpc$ Observable.
 *
 * @param {Object} metadata - The metadata to add.
 * @return {Observable} - The original rpc$ Observable with patched metadata.
 */
const createRpc = (metadata = {}) => rpc$ => {
  const result$ = memoize(rpc$);
  Object.assign(result$, priorityMixins);
  result$.metadata = metadata;
  return result$;
};

export default createRpc;
