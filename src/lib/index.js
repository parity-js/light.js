// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.

// SPDX-License-Identifier: MIT

import { setApi } from './api';
import { setPriority } from './priotization';
import './overview';

export * from './priotization/on';
export * from './rpc';

export default { setApi, setPriority };
