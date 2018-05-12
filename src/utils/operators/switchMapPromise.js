// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import { catchError, switchMap } from 'rxjs/operators';
import { empty, from } from 'rxjs';

/**
 * SwitchMap to an Observable.from. The Observable.from will return an empty
 * Observable if the Promise throws an error, will log an error in the console
 * on error.
 */
export const switchMapPromise = promise =>
  switchMap(() => from(promise()).pipe(catchError(() => empty())));
