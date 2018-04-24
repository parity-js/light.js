// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.

// SPDX-License-Identifier: MIT

import { priorityMixins } from '../priorities/priorityMixins';

/**
 * Add metadata to an rpc$ Observable.
 *
 * @param {Object} metadata - The metadata to add.
 * @return {Observable} - The original rpc$ Observable with patched metadata.
 */
const createRpc = (metadata = {}) => rpc$ => {
  Object.assign(rpc$, priorityMixins);
  rpc$.metadata = metadata;
  return rpc$;
};

export default createRpc;
