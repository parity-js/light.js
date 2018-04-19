// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.

// SPDX-License-Identifier: MIT

import React, { Component } from 'react';

import Balance from './Balance';

class Accounts extends Component {
  state = {
    visible: true
  };

  componentWillMount() {
    this.handleClick();
  }

  handleClick = () => {
    this.setState({ visible: true });
    setTimeout(() => this.setState({ visible: false }), 10000);
  };

  render() {
    return (
      <div>
        This is the tokens page.{this.state.visible ? (
          <Balance address="0x00Ae02834e91810B223E54ce3f9B7875258a1747" />
        ) : (
          <button onClick={this.handleClick}>Show details</button>
        )}
      </div>
    );
  }
}

export default Accounts;
