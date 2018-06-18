// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import { addToOverview, tapRefCount } from './addToOverview';
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
  const metadata = {};
  const mockRpc$ = createMockRpc().pipe(addToOverview(metadata));

  it('should start with 0 subscriber', () => {
    expect(metadata.subscribersCount).toBe(undefined);
  });

  // TODO Fix this test
  it.skip('should increase subscribersCount on subscribe', () => {
    mockRpc$.subscribe();
    expect(metadata.subscribersCount).toBe(1);
  });

  // TODO Fix this test
  it.skip('should increase subscribersCount on further subscribe', () => {
    mockRpc$.subscribe();
    expect(metadata.subscribersCount).toBe(2);
  });
});
