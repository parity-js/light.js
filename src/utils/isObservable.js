// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.

// SPDX-License-Identifier: MIT

import { Observable } from 'rxjs';

const isObservable = source$ => {
  return source$ instanceof Observable;
};

export default isObservable;