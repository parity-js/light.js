// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import { addToOverview, tapRefCount } from './addToOverview';
import createRpc from '../createRpc';
import createMockRpc from '../testHelpers/mockRpc';

describe('tapRefCount', () => {
  let onChange;
  let mockRpc$;

  beforeAll(() => {
    onChange = jest.fn();
    mockRpc$ = createMockRpc().pipe(tapRefCount(onChange));
  });

  it('should call onChange on subscribe with correct arguments', () => {
    mockRpc$.subscribe();
    expect(onChange).toBeCalledWith(1, 0);
  });

  // TODO Fix this test
  it.skip('should call onChange on subscribe with correct arguments on further subscribes', () => {
    mockRpc$.subscribe();
    expect(onChange).toBeCalledWith(2, 1);
  });
});

describe('addToOverview', () => {
  let mockRpc$;

  beforeAll(() => {
    mockRpc$ = createRpc()(() => createMockRpc().pipe(addToOverview(mockRpc$)));
  });

  it('should start with 0 subscriber', () => {
    expect(mockRpc$.metadata.subscribersCount).toBe(undefined);
  });

  // TODO Fix this test
  it.skip('should have 1 subscriber after 1 subscribe', done => {
    mockRpc$().subscribe(() => {
      expect(mockRpc$.metadata.subscribersCount).toBe(1);
      done();
    });
  });

  // TODO Fix this test
  it.skip('should have 2 subscriber after 2 subscribes', done => {
    mockRpc$().subscribe(() => {
      expect(mockRpc$.metadata.subscribersCount).toBe(2);
      done();
    });
  });
});
