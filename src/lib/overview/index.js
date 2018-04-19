// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.

// SPDX-License-Identifier: MIT

import priotization from '../priotization';

// Mapping of subscribed
const subscribed = {};

/**
 * Add an Observable from the rpc/ folder into the subscribed object.
 * This function should be called every time an Observable is subscribed to.
 *
 * @param {String} rpc - The RPC Observable name.
 * @param {String} [source] - The source Observable `rpc` is listening to
 * (optional). If none is specified, will default to `rpc`.
 */
export const addSubscribedRpc = (rpc, source) => {
  subscribed[rpc] = priotization[source || rpc].metadata.name;
};

/**
 * Add a property on window, so that the subscribed object can be viewed in the
 * JS console via `window.parity.rpcOverview()`
 */
if (typeof window !== 'undefined') {
  window.parity = {
    ...window.parity,
    rpcOverview() {
      return subscribed;
    }
  };
}

export default subscribed;
