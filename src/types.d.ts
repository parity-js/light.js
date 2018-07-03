// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import { Observable } from 'rxjs';

export type AccountsInfo = {
  name: String;
};

export type Address = String;

export type ObservableWithMetadata<T> = Observable<T> & {
  metadata: { name: String };
};
