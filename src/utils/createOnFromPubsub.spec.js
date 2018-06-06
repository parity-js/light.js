// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import createOnFromPubsub from './createOnFromPubsub';
import isObservable from './isObservable';
import { rejectApi, resolveApi } from './testHelpers/mockApi';

it('should return an Observable', () => {
  expect(isObservable(createOnFromPubsub(resolveApi, 'fake_method'))).toBe(
    true
  );
});

it('should fire an event when pubsub publishes', done => {
  createOnFromPubsub(resolveApi, 'fake_method').subscribe(data => {
    expect(data).toBe('foo');
    done();
  });
});

it('should fire an error when pubsub errors', done => {
  createOnFromPubsub(rejectApi, 'fake_method').subscribe(null, err => {
    expect(err).toEqual(new Error('bar'));
    done();
  });
});

it('should fire an event when polling pubsub  publishes', done => {
  createOnFromPubsub(
    () => resolveApi(undefined, false),
    'fake_method'
  ).subscribe(data => {
    expect(data).toBe('foo');
    done();
  });
});

it('should fire an error when polling pubsub errors', done => {
  createOnFromPubsub(
    () => rejectApi(undefined, false),
    'fake_method'
  ).subscribe(null, err => {
    expect(err).toEqual(new Error('bar'));
    done();
  });
});
