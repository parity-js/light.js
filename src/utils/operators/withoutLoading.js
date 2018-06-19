// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import { distinctUntilChanged, filter } from 'rxjs/operators';

import { isLoading } from '../isLoading';
/**
 * Filter out the loading states in our observable.
 *
 *
 */
export const withoutLoading = () => source$ =>
  source$.pipe(
    filter(value => !isLoading(value)),
    distinctUntilChanged()
  );