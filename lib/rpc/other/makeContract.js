"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeContract$ = void 0;

var _abi = _interopRequireDefault(require("@parity/abi"));

var _operators = require("../../utils/operators");

var _api = _interopRequireDefault(require("../../api"));

var _getPriority = require("../../priorities/getPriority");

var _priorities = require("../../priorities");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

/**
 * Create a contract.
 *
 * @param {Object} tx - A transaction object.
 * @return {Observable<Object>} - The status of the transaction.
 */
var makeContract$ = function makeContract$(address, abi) {
  console.log(new _abi.default(abi)); // Variable result will hold the final object to return

  var result = {
    address: address
  }; // Constant functions

  abi.filter(function (_ref) {
    var constant = _ref.constant,
        type = _ref.type;
    return constant === true && type === 'function';
  }).forEach(function (_ref2) {
    var inputs = _ref2.inputs,
        name = _ref2.name;

    var f = function f() {
      // Last argument can be optional options
      // const options = args.length === i.inputs.length + 1 ? args.pop() : {};
      if (arguments.length !== inputs.length) {
        throw new Error("Invalid number of arguments to ".concat(name, ". Expected ").concat(inputs.length, ", got ").concat(arguments.length, "."));
      }

      return (0, _api.default)().eth.call(address);
    };

    result[name] = (0, _getPriority.getPriority)(makeContract$).pipe((0, _operators.switchMapPromise)(f), (0, _operators.distinctReplayRefCount)(), (0, _operators.addToOverview)(makeContract$));
  });
};

exports.makeContract$ = makeContract$;
makeContract$.metadata = {
  calls: ['eth_estimateGas', 'parity_postTransaction', 'parity_checkRequest', 'eth_getTransactionReceipt'],
  priority: [_priorities.onEvery2Seconds$]
};