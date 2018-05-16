// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT
import { timer } from 'rxjs';
import createOnFromPubsub from '../../utils/createOnFromPubsub';

/**
 * Observable that emits each time the default account changes
 */
export const onAccountsChanged$ = createOnFromPubsub('eth_accounts');
onAccountsChanged$.metadata = { name: 'onAccountsChanged$' };

/**
 * Observable that emits each time the default account changes
 */
export const onAccountsInfoChanged$ = createOnFromPubsub('parity_accountsInfo');
onAccountsInfoChanged$.metadata = { name: 'onAccountsInfoChanged$' };
