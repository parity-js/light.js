// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import { empty } from 'rxjs';
import { merge } from 'rxjs/operators';

/**
 * Get the priority Observable of a RPC Observable, which represents how often
 * this RPC Observable gets updated. Each RPC Observable has a metadata field
 * with an array of Observables, the priority Observable is constructed by
 * merging (as in Observable.merge) these Observables.
 *
 * @param {String} rpc$ - The RPC Observable.
 * @return {Observable} - An Observable that represents the priority.
 */
export const getPriority = rpc$ =>
  empty().pipe(merge(...rpc$.metadata.priority));
