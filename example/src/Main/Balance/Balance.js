// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import React, { Component } from 'react';
import { combineLatest } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import {
  accounts$,
  balanceOf$,
  chainName$,
  defaultAccount$,
  height$,
  makeContract$,
  syncing$
} from '../../light.js';
import api from '../../api';
import { gavCoinAbi, gavCoinAddress } from './gavcoin';
import light from '../../hoc';
import './Balance.css';

@light({
  accounts: accounts$,
  balance: ownProps => balanceOf$(ownProps.address).pipe(map(_ => +_)),
  chainName: chainName$,
  // Example of using RxJS operators for manipulating rpc$ observables
  gavBalance: () =>
    combineLatest(chainName$(), defaultAccount$()).pipe(
      switchMap(([chainName, defaultAccount]) =>
        makeContract$(gavCoinAddress(chainName), gavCoinAbi).balanceOf(
          defaultAccount
        )
      ),
      map(_ => +_)
    ),
  defaultAccount: defaultAccount$,
  height: height$,
  syncing: syncing$
})
class Balance extends Component {
  handleChange = ({ target: { value } }) => {
    api.parity.setNewDappsDefaultAddress(value);
  };

  render() {
    const {
      accounts,
      balance,
      chainName,
      defaultAccount,
      gavBalance,
      height,
      syncing
    } = this.props;
    return (
      <div className="Balance-container">
        <h3>This is the Balance component.</h3>
        <p>
          Chain: {chainName}. Block: {height}. My Account: {defaultAccount}.
          Syncing: {JSON.stringify(syncing)}.
        </p>
        {accounts && (
          <select onChange={this.handleChange} value={defaultAccount}>
            {accounts.map((account, index) => (
              <option key={account} value={account}>
                {account}
              </option>
            ))}
          </select>
        )}
        <p>
          My Balance: <strong>{balance}wei.</strong>
        </p>
        <p>
          Gavcoin Balance: <strong>{gavBalance}GAV.</strong>
        </p>
      </div>
    );
  }
}

export default Balance;
