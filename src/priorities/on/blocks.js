// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

import api from '../../api';
import { distinctReplayRefCount } from '../../utils/operators/distinctReplayRefCount';

/**
 * Observable that emits on every new block.
 */
export const onEveryBlock$ = Observable.create(observer => {
  const subscription = api().pubsub.eth.blockNumber((error, result) => {
    if (error) {
      observer.error(error);
    } else {
      observer.next(+result);
    }
  });
  return () =>
    subscription.then(subscriptionId =>
      api().pubsub.unsubscribe(subscriptionId)
    );
}).pipe(distinctReplayRefCount());
onEveryBlock$.metadata = { name: 'onEveryBlock$' };

/**
 * Observable that emits on every 2nd block.
 */
export const onEvery2Blocks$ = onEveryBlock$.pipe(
  filter(n => n % 2 === 0) // Around ~30s on mainnet
);
onEvery2Blocks$.metadata = { name: 'onEvery2Blocks$' };

/**
 * Observable that emits on every 4th block.
 */
export const onEvery4Blocks$ = onEveryBlock$.pipe(
  filter(n => n % 4 === 0) // Around ~1min on mainnet
);
onEvery4Blocks$.metadata = { name: 'onEvery4Blocks$' };
