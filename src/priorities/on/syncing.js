// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import { filter, map } from 'rxjs/operators';

import createOnFromPubsub from '../../utils/createOnFromPubsub';

/**
 * Observable that emits when syncing status changes.
 */
export const onSyncingChanged$ = createOnFromPubsub('eth_syncing');
onSyncingChanged$.metadata = { name: 'onSyncingChanged$' };
