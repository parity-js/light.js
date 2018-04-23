// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.

// SPDX-License-Identifier: MIT

import React, { Component } from 'react';

import light from '../../../hoc';
import {
  accounts$,
  balanceOf$,
  defaultAccount$,
  nodeHealth$
} from '../../../lib'; // from '@parity/light'

@light({
  accounts: accounts$,
  balanceOf: balanceOf$('0x00Ae02834e91810B223E54ce3f9B7875258a1747'),
  defaultAccount: defaultAccount$
  // nodeHealth: nodeHealth$
})
class Bal extends Component {
  render() {
    const { balanceOf, defaultAccount, nodeHealth } = this.props;
    return (
      <div>
        <p>balanceOf: {balanceOf}</p>
        <p>nodeHealth: {JSON.stringify(nodeHealth)}</p>
        <p>defaultAccount: {defaultAccount}</p>
      </div>
    );
  }
}

export default Bal;
