// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import { filter, map } from 'rxjs/operators';

import api from '../api';
import createOnFromPubsub from './utils/createOnFromPubsub';
import { FrequencyObservable } from '../types';

/**
 * Observable that emits on every new block.
 */
export const onEveryBlock$ = createOnFromPubsub('eth_blockNumber', api, {
  name: 'onEveryBlock$'
}).pipe(
  map(v => +v) // Return number instead of BigNumber
);

/**
 * Observable that emits on every 2nd block.
 */
export const onEvery2Blocks$ = <FrequencyObservable<number>>onEveryBlock$.pipe(
  filter(n => n % 2 === 0) // Around ~30s on mainnet
);
onEvery2Blocks$.metadata = { name: 'onEvery2Blocks$' };

/**
 * Observable that emits on every 4th block.
 */
export const onEvery4Blocks$ = <FrequencyObservable<number>>onEveryBlock$.pipe(
  filter(n => n % 4 === 0) // Around ~1min on mainnet
);
onEvery4Blocks$.metadata = { name: 'onEvery4Blocks$' };