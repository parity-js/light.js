// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import getPriority from './getPriority';
import isObservable from '../../utils/isObservable';
import mockRpc$ from '../../utils/testHelpers/mockRpc';

it('should return the correct priority', () => {
  expect(isObservable(getPriority(mockRpc$))).toBe(true);
});
