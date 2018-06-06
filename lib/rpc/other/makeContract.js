"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeContract$ = void 0;

var _abi = _interopRequireDefault(require("@parity/abi"));

var _memoizee = _interopRequireDefault(require("memoizee"));

var _operators = require("../../utils/operators");

var _api = _interopRequireDefault(require("../../api"));

var _getPriority = _interopRequireDefault(require("../utils/getPriority"));

var _frequency = require("../../frequency");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

/**
 * Cache contracts, so that they are:
 * - only created after the first call/transaction to a contract has been made
 * - further calls/transactions to the same contract doesn't recreate the
 *   contract
 *
 * @param {String} address - The contract address.
 * @param {Array<Object>} - The contract abi.
 * @return {Object} - The contract object as defined in @parity/api.
 */
var getContract = (0, _memoizee.default)(function (address, abiJson) {
  return (0, _api.default)().newContract(abiJson, address);
}, {
  length: 1 // Only memoize by address

});
/**
 * Create a contract.
 *
 * @param {Object} address - The contract address.
 * @param {Array<Object>} - The contract abi.
 * @return {Object} - An object whose keys are all the functions of the
 * contract, and each function return an Observable which will fire when the
 * function resolves.
 */

var makeContract$ = (0, _memoizee.default)(function (address, abiJson) {
  var abi = new _abi.default(abiJson); // Variable result will hold the final object to return

  var result = {
    abi: abi,
    address: address
  }; // We then copy every key inside contract.instance into our `result` object,
  // replacing each the value by an Observable instead of a Promise.

  abi.functions.forEach(function (_ref) {
    var name = _ref.name;

    result["".concat(name, "$")] = function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var contract = getContract(address, abiJson);
      return (0, _getPriority.default)(makeContract$).pipe((0, _operators.switchMapPromise)(function () {
        return contract.instance[name].constant ? contract.instance[name].call({}, args) : contract.instance[name].postTransaction({}, args);
      }), (0, _operators.distinctReplayRefCount)(), (0, _operators.addToOverview)(makeContract$));
    };
  });
  return result;
}, {
  length: 1 // Only memoize by address

});
exports.makeContract$ = makeContract$;
makeContract$.metadata = {
  calls: [],
  priority: [_frequency.onEveryBlock$]
};