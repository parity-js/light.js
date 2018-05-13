// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import { of } from 'rxjs';

/**
 * Observable that emits only once.
 */
export const onStartup$ = of(0);
onStartup$.metadata = { name: 'onStartup$' };
