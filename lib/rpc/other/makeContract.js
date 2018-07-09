"use strict";
// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var abi_1 = require("@parity/abi");
var encode_1 = require("@parity/api/lib/util/encode");
var memoizee_1 = require("memoizee");
var operators_1 = require("../../utils/operators");
var api_1 = require("../../api");
var getFrequency_1 = require("../utils/getFrequency");
var frequency_1 = require("../../frequency");
var post_1 = require("./post");
/**
 * Cache contracts, so that they are:
 * - only created after the first call/transaction to a contract has been made
 * - further calls/transactions to the same contract doesn't recreate the
 *   contract
 *
 * @param {String} address - The contract address.
 * @param {Array<Object>} abiJson - The contract abi.
 * @return {Object} - The contract object as defined in @parity/api.
 */
var getContract = memoizee_1.default(function (address, abiJson) { return api_1.default().newContract(abiJson, address); }, { length: 1 } // Only memoize by address
);
/**
 * Create a contract.
 *
 * @param {Object} address - The contract address.
 * @param {Array<Object>} - The contract abi.
 * @return {Object} - An object whose keys are all the functions of the
 * contract, and each function return an Observable which will fire when the
 * function resolves.
 */
exports.makeContract$ = memoizee_1.default(function (address, abiJson) {
    var abi = new abi_1.default(abiJson);
    // Variable result will hold the final object to return
    var result = {
        abi: abi,
        address: address,
        get contractObject() {
            return getContract(address, abiJson);
        }
    };
    // We then copy every key inside contract.instance into our `result` object,
    // replacing each the value by an Observable instead of a Promise.
    abi.functions.forEach(function (_a) {
        var name = _a.name;
        result[name + "$"] = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            // We only get the contract when the function is called for the 1st
            // time. Note: getContract is memoized, won't create contract on each
            // call.
            var contract = getContract(address, abiJson);
            var method = contract.instance[name]; // Hold the method from the Abi
            // The last arguments in args can be an options object
            var options = args.length === method.inputs.length + 1 ? args.pop() : {};
            if (method.constant) {
                return getFrequency_1.default(exports.makeContract$).pipe(operators_1.switchMapPromise(function () { return contract.instance[name].call(options, args); }), operators_1.distinctReplayRefCount());
            }
            else {
                return post_1.post$(__assign({ to: address, data: encode_1.abiEncode(method.name, method.inputs.map(function (_a) {
                        var type = _a.kind.type;
                        return type;
                    }), args) }, options));
            }
        };
    });
    return result;
}, { length: 1 } // Only memoize by address
);
exports.makeContract$.metadata = {
    calls: [],
    frequency: [frequency_1.onEveryBlock$]
};
