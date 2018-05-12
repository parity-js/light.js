// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import Api from '@parity/api';

const options = {};

/**
 * Sets an Api object.
 *
 * @param {Object} api - The Api object.
 */
export const setApi = api => {
  options.api = api;
};

/**
 * We only ever use api() at call-time of functions; this allows the options
 * (particularly the transport option) to be changed dynamically and the
 * data structure to be reused.
 */
const api = () =>
  options.api || new Api(new Api.Provider.Ws('ws://localhost:8546'));

export default api;
