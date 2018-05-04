// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.

// SPDX-License-Identifier: MIT

import { catchError, switchMap } from 'rxjs/operators';
import { empty, from } from 'rxjs';

/**
 * SwitchMap to an Observable.from that catches errors and returns an
 * empty Observable. Will log an error in the console.
 */
export const switchMapPromise = promise =>
  switchMap(() => from(promise()).pipe(catchError(() => empty())));
