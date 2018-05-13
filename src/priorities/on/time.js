// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import { timer } from 'rxjs';

/**
 * Observable that emits on every second.
 */
export const onEverySecond$ = timer(0, 1000);
onEverySecond$.metadata = { name: 'onEverySecond$' };

/**
 * Observable that emits on every other second.
 */
export const onEvery2Seconds$ = timer(0, 2000);
onEvery2Seconds$.metadata = { name: 'onEvery2Seconds$' };
