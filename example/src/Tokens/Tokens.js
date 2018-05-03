// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.

// SPDX-License-Identifier: MIT

import React, { Component } from 'react';

import Balance from './Balance';
import { defaultAccount$ } from '../light.js';
import light from '../hoc';

@light({
  defaultAccount: defaultAccount$
})
class Tokens extends Component {
  state = {
    visible: true
  };

  handleClick = () => {
    this.setState({ visible: true });
    setTimeout(() => this.setState({ visible: false }), 10000);
  };

  render() {
    const { defaultAccount } = this.props;
    return (
      <div>
        This is the tokens page.{this.state.visible && defaultAccount ? (
          <Balance address={defaultAccount} />
        ) : (
          <button onClick={this.handleClick}>Show details</button>
        )}
      </div>
    );
  }
}

export default Tokens;
