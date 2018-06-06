// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import * as syncing from './syncing';
import testFrequency from '../utils/testHelpers/testFrequency';

Object.keys(syncing).forEach(key => testFrequency(key, syncing[key]));
