// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.

// SPDX-License-Identifier: MIT

import { Observable } from 'rxjs/Observable';

import { setSubscribersCount } from '../../overview';

/**
 * Same as tap, but passing in addtion (refCount, prevRefCount) as callback
 * arguments.
 *
 * @param {Function} onChange - The function to call every time the source
 * Observable's refCount changes (i.e. on subscribe or unsubscribe).
 * @see https://stackoverflow.com/questions/49976825/check-if-publishreplay-refcount-has-observers-or-not/49980784#49980784
 * @example
 * const source$ = Observable.of(1)
 *   .pipe(tapRefCount((refCount) => console.log('Refcount is now', refCount)));
 * source$.subscribe(() => {}); // Logs 'Refcount is now 1'
 */
export const tapRefCount = onChange => source$ => {
  // Mute the operator if it has nothing to do
  if (typeof onChange !== 'function') {
    return source$;
  }

  let refCount = 0;

  // Spy on subscribe
  return Observable.create(observer => {
    const subscription = source$.subscribe(observer);
    const prevRefCount = refCount;
    refCount++;
    onChange(refCount, prevRefCount);

    // Spy on unsubscribe
    return () => {
      subscription.unsubscribe();
      const prevRefCount = refCount;
      refCount--;
      onChange(refCount, prevRefCount);
    };
  });
};

/**
 * Calls {@link setSubscribersCount} every time a new observer subscribes or
 * unsubscribed to the Observable, passing in the refCount.
 *
 * @param {String} rpc - See {@link setSubscribersCount}
 */
export const addToOverview = rpc =>
  tapRefCount(refCount => setSubscribersCount(rpc, refCount));
