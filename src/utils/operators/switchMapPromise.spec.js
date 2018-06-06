// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import mockRpc$ from '../testHelpers/mockRpc';
import { rejectApi, resolveApi } from '../testHelpers/mockApi';
import { switchMapPromise } from './switchMapPromise';

it('should fire an event when the promise resolves', done => {
  mockRpc$()
    .pipe(switchMapPromise(resolveApi().fake.method))
    .subscribe(data => {
      expect(data).toBe('foo');
      done();
    });
});

it('should not error when the promise rejects', done => {
  mockRpc$()
    .pipe(switchMapPromise(rejectApi().fake.method))
    .subscribe();

  // If after 0.5s, nothing has been called, then our Observable has not fired
  // any event, which is what we want
  setTimeout(done, 500);
});
