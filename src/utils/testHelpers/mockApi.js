// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

/**
 * A pubsub Api object that rejects.
 */
export const rejectApi = (isPubSub = true) => ({
  fake: {
    method () {
      return Promise.reject(new Error('bar'));
    }
  },
  isPubSub,
  pubsub: {
    fake: {
      method (callback) {
        callback(new Error('bar'), null);
        return Promise.resolve(1); // Resolves to subscriptionId
      }
    },
    unsubscribe: () => Promise.resolve()
  }
});

/**
 * A pubsub Api object that resolves.
 */
export const resolveApi = (isPubSub = true) => ({
  fake: {
    method () {
      return Promise.resolve('foo');
    }
  },
  isPubSub,
  pubsub: {
    fake: {
      method (callback) {
        callback(null, 'foo');
        return Promise.resolve(1); // Resolves to subscriptionId
      }
    },
    unsubscribe: () => Promise.resolve()
  }
});
