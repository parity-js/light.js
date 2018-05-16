// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import Api from '@parity/api';

const api = new Api(
  // new Api.Provider.Ws('ws://127.0.0.1:8546', '0Oa4yRfuStyWYYPv')
  window.web3
    ? window.web3.currentProvider
    : new Api.Provider.Ws('ws://127.0.0.1:8546') // Can add PARITY_TOKEN as 2nd argument to access secure API, e.g. switch default account
);

export default api;
