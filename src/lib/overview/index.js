// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.

// SPDX-License-Identifier: MIT

import { Subject } from 'rxjs/Subject';

import * as rpc from '../rpc';
import priotization from '../priotization';

const observersCount = method => {
  if (method instanceof Subject) {
    return method.observers.length;
  }
  if (typeof method === 'function') {
    return -1;
  }
  if (
    method.operator &&
    method.operator.connectable &&
    typeof method.operator.connectable.subjectFactory === 'function'
  ) {
    return method.operator.connectable.subjectFactory().observers.length;
  }
  return -1;
};

/**
 * Add a property on window, so that the subscribed object can be viewed in the
 * JS console via `window.parity.rpcOverview()`
 */
if (typeof window !== 'undefined') {
  window.parity = {
    ...window.parity,
    rpcOverview() {
      const overview = {};
      Object.keys(rpc).forEach(key => {
        console.log(key, rpc[key]);
        const count = observersCount(rpc[key]);
        if (count > 0) {
          overview[key] = {
            name: priotization[key].metadata.name,
            subscribersCount: count
          };
        }
      });
      return overview;
    }
  };
}
