// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import { Observable, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import api from '../api';
import { distinctReplayRefCount } from './operators/distinctReplayRefCount';

/**
 * Observable that emits on each pubsub event.
 * @example onAccountsChanged$, onEveryBlock$...
 */
const createOnFromPubsub = pubsub => {
  const [namespace, method] = pubsub.split('_');

  // There's a chance the provider doesn't support pubsub, for example
  // MetaMaskProvider. In this case, as suggested on their Github, the best
  // solution for now is to poll.
  if (!api().isPubsub) {
    return timer(0, 1000).pipe(switchMap(() => api()[namespace][method]()));
  }

  return Observable.create(observer => {
    const subscription = api().pubsub[namespace][method]((error, result) => {
      if (error) {
        observer.error(error);
      } else {
        observer.next(result);
      }
    });
    return () =>
      subscription.then(subscriptionId =>
        api().pubsub.unsubscribe(subscriptionId)
      );
  }).pipe(distinctReplayRefCount());
};

export default createOnFromPubsub;
