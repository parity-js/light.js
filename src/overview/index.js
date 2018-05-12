// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import * as rpc from '../rpc';

const subscribersCount = {};

/**
 * Set the number of subscribers (i.e. refCount) an Observable currently has.
 *
 * @param {String} key - The Observable name inside the rpc/ folder.
 * @param {Number} count - The number of subscribers the Observable currently
 * has.
 */
export const setSubscribersCount = (key, count) => {
  subscribersCount[key] = count;
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
