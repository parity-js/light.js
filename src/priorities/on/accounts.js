// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import { BehaviorSubject } from 'rxjs';

/**
 * Observable that emits each time accounts change.
 */
export const onAccountsChanged$ = new BehaviorSubject(0);
onAccountsChanged$.metadata = { name: 'onAccountsChanged$' };
