// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.

// SPDX-License-Identifier: MIT

import {
  catchError,
  distinctUntilChanged,
  multicast,
  publishReplay,
  refCount,
  switchMap
} from 'rxjs/operators';
import { defer } from 'rxjs/observable/defer';
import { empty } from 'rxjs/observable/empty';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { ReplaySubject } from 'rxjs/ReplaySubject';

// import { addSubscribedRpc } from '../overview';

export const addReplaySubject = (n = 1) => source$ => {
  const subject = new ReplaySubject(n);
  const result$ = source$.pipe(multicast(() => subject));
  result$.getReplaySubject = () => subject; // Patching Observable here
  return result$;
};

/**
 * Calls a function everytime an observer subscribes to an Observable.
 *
 * @param {Function} onSubscribe - The function to call every time the source
 * observable is subscribed.
 * @see https://stackoverflow.com/questions/41883339/observable-onsubscribe-equivalent-in-rxjs
 * @example
 * const source$ = Observable.of(1)
 *   .pipe(doOnSubscribe(() => console.log('Subscribed!')));
 * source$.subscribe(() => {}); // Logs 'Subscribed!'
 */
export const doOnSubscribe = onSubscribe => source =>
  defer(() => {
    onSubscribe();
    return source;
  });

/**
 * Calls {@link addSubscribedRpc} every time a new observer subscribes to the
 * Observable.
 *
 * @param {String} rpc - See {@link addSubscribedRpc}
 * @param {String} source - See {@link addSubscribedRpc}
 */
// export const addToOverview = (rpc, source$) =>
// doOnSubscribe(() => addSubscribedRpc(rpc, source$));

/**
 * Shorthand for distinctUntilChanged(), addReplaySubject(1) and refCount().
 */
export const distinctReplayRefCount = () => source$ =>
  source$.pipe(distinctUntilChanged(), addReplaySubject(1), refCount());

/**
 * SwitchMap to an Observable.fromPromise that catches errors and returns an
 * empty Observable. Will log an error in the console.
 */
export const switchMapPromise = promise =>
  switchMap(() => fromPromise(promise()).pipe(catchError(() => empty())));
