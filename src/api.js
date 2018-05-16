// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import Api from '@parity/api';

import { name } from '../package.json';

let api;

/**
 * Sets an Api object.
 *
 * @param {Object} newApi - The Api object.
 */
export const setApi = newApi => {
  api = newApi;
  if (!api.isPubSub) {
    console.warn(
      `Current provider does not support pubsub. ${name} will poll every second to listen to changes.`
    );
  }
};

/**
 * We only ever use api() at call-time of functions; this allows the options
 * (particularly the transport option) to be changed dynamically and the
 * data structure to be reused.
 */
const getApi = () => {
  if (!api) {
    api = new Api(new Api.Provider.Ws('ws://localhost:8546'));
  }
  return api;
};

export default getApi;
