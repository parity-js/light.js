// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.

// SPDX-License-Identifier: MIT

import { empty } from 'rxjs';
import { merge } from 'rxjs/operators';

/**
 * Get the priority of a RPC Observable, i.e. how often is this Observable
 * updated.
 *
 * @param {String} rpc$ - The RPC Observable.
 * @return {Observable} - An Observable that represents the priority.
 */
export const getPriority = rpc$ =>
  empty().pipe(merge(...rpc$.metadata.priority));
