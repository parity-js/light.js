// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import { empty } from 'rxjs';
import { merge } from 'rxjs/operators';

import { RpcObservable } from '../../types';

/**
 * Get the frequency Observable of a Rpc Observable, which represents how often
 * this RPC Observable gets updated. Each RPC Observable has a metadata field
 * with an array of Observables, the frequency Observable is constructed by
 * merging (as in Observable.merge) these Observables.
 *
 * @hidden
 * @param rpc$ - The Rpc Observable from which we're fetching the frequency.
 * @return The Frequency Observable of our Rpc Observable.
 */
const getFrequency = <T>(rpc$: RpcObservable<T>) => {
  return empty().pipe(merge(...rpc$.metadata.frequency));
};

export default getFrequency;
