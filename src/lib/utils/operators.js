import {
  catchError,
  switchMap,
  publishReplay,
  refCount,
  distinctUntilChanged
} from 'rxjs/operators';
import { defer } from 'rxjs/observable/defer';
import { empty } from 'rxjs/observable/empty';
import { fromPromise } from 'rxjs/observable/fromPromise';

import { addSubscribedRpc } from '../overview';

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
export const addToOverview = (rpc, source) =>
  doOnSubscribe(() => addSubscribedRpc(rpc, source));

/**
 * Shorthand for distinctUntilChanged(), publishReplay(1) and refCount().
 */
export const distinctReplayRefCount = () => source =>
  source.pipe(distinctUntilChanged(), publishReplay(1), refCount());

/**
 * SwitchMap to an Observable.fromPromise that catches errors and returns an
 * empty Observable. Will log an error in the console.
 */
export const switchMapPromise = promise =>
  switchMap(() => fromPromise(promise()).pipe(catchError(() => empty())));
