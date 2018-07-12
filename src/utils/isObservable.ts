// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import { Observable } from 'rxjs';

/**
 * @hidden
 * @param source$ - The Observable to test.
 * @return Returns true if it's an Observable.
 */
const isObservable = (source$: Observable<any>): source$ is Observable<any> =>
  source$ instanceof Observable;

export default isObservable;
