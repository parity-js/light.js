// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import * as rpc from '../rpc';

// We centrally store the number of subscribers each RPC Observable rpc$ has.
// TODO If possible, it would be nice to store this inside each rpc$ itself.
const subscribersCount = {};

/**
 * Set the number of subscribers (i.e. refCount) an Observable currently has.
 *
 * @param {String} rpc$ - The Observable name inside the rpc/ folder.
 * @param {Number} count - The number of subscribers the Observable currently
 * has.
 */
export const setSubscribersCount = (rpc$, count) => {
  subscribersCount[rpc$] = count;
};

/**
 * Add a property on window, so that the subscribed object can be viewed in the
 * JS console via `window.parity.rpcOverview()`
 */
if (typeof window !== 'undefined') {
  window.parity = {
    ...window.parity,
    rpcOverview () {
      const overview = {};
      Object.keys(rpc).forEach(key => {
        const count = subscribersCount[key];
        if (count > 0) {
          overview[key] = {
            calls: rpc[key].metadata.calls,
            priority: (rpc[key].metadata.priority || []).map(
              priority => priority.metadata.name
            ),
            subscribersCount: count
          };
        }
      });
      return overview;
    }
  };
}
