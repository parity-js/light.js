// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import { setApi } from './api';
import * as priorities from './priorities';
import './overview';

export * from './rpc';

export { priorities, setApi };
export default { setApi };
