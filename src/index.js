// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.

// SPDX-License-Identifier: MIT

import React from 'react';
import ReactDOM from 'react-dom';
import Api from '@parity/api';

import App from './App';
import light, { onEvery2Seconds$ } from './lib';

light.setApi(
  new Api(new Api.Provider.Ws('ws://127.0.0.1:8546', 'g8OzIgL6VXDv201E'))
);
// light.setPriority({ balanceOf$: [onEvery2Seconds$] });

ReactDOM.render(<App />, document.getElementById('root'));
