// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import { timer } from 'rxjs';

import createRpc from './createRpc';
import mockRpc$ from '../../utils/testHelpers/mockRpc';

it('should return a function', () => {
  expect(typeof createRpc()).toBe('function');
});

it('should add empty metadata by default', () => {
  expect(createRpc()(mockRpc$).metadata).toEqual({});
});

it('should append input metadata', () => {
  expect(createRpc({ foo: 'bar' })(mockRpc$).metadata).toEqual({ foo: 'bar' });
});

it('should contain frequencyMixins', () => {
  expect(typeof createRpc()(mockRpc$).setFrequency).toBe('function');
});

it('should set correct frequency', () => {
  const frequency = timer(0, 1000);
  const rpc$ = createRpc()(mockRpc$);
  rpc$.setFrequency([frequency]);
  expect(rpc$.metadata.frequency).toEqual([frequency]);
});
