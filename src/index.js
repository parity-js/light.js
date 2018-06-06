// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import { setApi } from './api';
import * as frequency from './frequency';
import './overview';

export * from './rpc';

export { frequency, setApi };
export default { setApi };
