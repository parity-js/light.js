// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import { catchError, startWith, switchMap } from 'rxjs/operators';
import { empty, from } from 'rxjs';

import { RPC_LOADING } from '../isLoading';

/**
 * SwitchMap to an Observable.from. The Observable.from will return an empty
 * Observable if the Promise throws an error, will log an error in the console
 * on error.
 *
 * @ignore
 */
export const switchMapPromise = promise => source$ =>
  source$.pipe(
    switchMap(() =>
      from(
        promise().then(result => {
          // The result can sometimes be {id: 2, jsonrpc: "2.0", error: {...}}
          if (result.error) {
            return Promise.reject(result);
          }
          return result;
        })
      ).pipe(
        startWith(RPC_LOADING),
        catchError(err => {
          console.group();
          console.error({ call: promise.toString(), err });
          console.error(
            new Error(
              'Error while executing API call, see error log above for more information.'
            )
          );
          console.groupEnd();
          return empty();
        })
      )
    )
  );
