// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import api from '../api';
import createOnFromPubsub from './utils/createOnFromPubsub';

/**
 * Observable that emits each time the default account changes
 */
export const onAccountsChanged$ = createOnFromPubsub('eth_accounts', api);
onAccountsChanged$.metadata = { name: 'onAccountsChanged$' };

/**
 * Observable that emits each time the default account changes
 */
export const onAccountsInfoChanged$ = createOnFromPubsub(
  'parity_accountsInfo',
  api
);
onAccountsInfoChanged$.metadata = { name: 'onAccountsInfoChanged$' };
