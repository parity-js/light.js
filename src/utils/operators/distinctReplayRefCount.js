// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import { distinctUntilChanged, publishReplay, refCount } from 'rxjs/operators';

/**
 * Shorthand for distinctUntilChanged(), publishReplay(1) and refCount().
 */
export const distinctReplayRefCount = () => source$ =>
  source$.pipe(distinctUntilChanged(), publishReplay(1), refCount());
