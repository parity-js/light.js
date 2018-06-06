// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import createRpc from './createRpc';
import mockRpc$ from './testHelpers/mockRpc';

it('should return a function', () => {
  expect(typeof createRpc()).toBe('function');
});

it('should contain priorityMixins', () => {
  expect(typeof createRpc()(mockRpc$).setPriority).toBe('function');
});

it('should add empty metadata by default', () => {
  expect(createRpc()(mockRpc$).metadata).toEqual({});
});

it('should append input metadata', () => {
  expect(createRpc({ foo: 'bar' })(mockRpc$).metadata).toEqual({ foo: 'bar' });
});
