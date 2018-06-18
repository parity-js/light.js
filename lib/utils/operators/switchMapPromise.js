"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.switchMapPromise = void 0;

var _operators = require("rxjs/operators");

var _rxjs = require("rxjs");

// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

/**
 * SwitchMap to an Observable.from. The Observable.from will return an empty
 * Observable if the Promise throws an error, will log an error in the console
 * on error.
 *
 * @ignore
 */
var switchMapPromise = function switchMapPromise(promise) {
  return (0, _operators.switchMap)(function () {
    return (0, _rxjs.from)(promise().then(function (result) {
      // The result can sometimes be {id: 2, jsonrpc: "2.0", error: {...}}
      if (result.error) {
        return Promise.reject(result);
      }

      return result;
    })).pipe((0, _operators.catchError)(function (err) {
      console.group();
      console.error({
        call: promise.toString(),
        err: err
      });
      console.error(new Error('Error while executing API call, see error log above for more information.'));
      console.groupEnd();
      return (0, _rxjs.empty)();
    }));
  });
};

exports.switchMapPromise = switchMapPromise;