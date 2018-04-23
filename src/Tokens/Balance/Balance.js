// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.

// SPDX-License-Identifier: MIT

import React, { Component } from 'react';

import Bal from './Bal';
import light from '../../hoc';
import {
  accounts$,
  balanceOf$,
  chainName$,
  defaultAccount$,
  height$,
  setDefaultAccount$
} from '../../lib'; // from '@parity/light'
import TxProgress from './TxProgress';

@light({
  accounts: accounts$,
  balance: ownProps => balanceOf$(ownProps.address),
  chainName: chainName$,
  defaultAccount: defaultAccount$,
  height: height$
})
class Balance extends Component {
  state = { visible: false };

  componentDidMount() {
    setTimeout(() => this.setState({ visible: true }), 3000);
  }

  handleChange = ({ target: { value } }) => {
    setDefaultAccount$(value).subscribe(
      console.log,
      () => console.log('error'),
      () => console.log('completed')
    );
  };

  handleSend = () => {
    this.setState({
      tx: {
        from: this.props.defaultAccount,
        to: this.props.defaultAccount,
        value: '0x2386f26fc10000' // 0.01ETH
      }
    });
  };

  render() {
    const { accounts, balance, chainName, defaultAccount, height } = this.props;
    const { tx, visible } = this.state;
    return (
      <div>
        <p>Chain: {chainName}.</p>
        <p>Block: {height}.</p>
        <p>My Account: {defaultAccount}.</p>
        {accounts && (
          <select onChange={this.handleChange} value={accounts[0]}>
            {accounts.map((account, index) => (
              <option key={account} value={account}>
                {account}
              </option>
            ))}
          </select>
        )}
        <p>My Balance: {balance}.</p>
        <button onClick={this.handleSend}>Send 0.01ETH to myself</button>
        {tx && <TxProgress tx={tx} />}
        {visible && <Bal />}
      </div>
    );
  }
}

export default Balance;
