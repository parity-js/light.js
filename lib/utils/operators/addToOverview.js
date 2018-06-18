"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addToOverview = exports.tapRefCount = void 0;

var _rxjs = require("rxjs");

// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

/**
 * Same as tap, but passing in addtion (refCount, prevRefCount) as callback
 * arguments.
 *
 * @ignore
 * @param {Function} onChange - The function to call every time the source
 * Observable's refCount changes (i.e. on subscribe or unsubscribe).
 * @see https://stackoverflow.com/questions/49976825/check-if-publishreplay-refcount-has-observers-or-not/49980784#49980784
 * @example
 * const source$ = Observable.of(1)
 *   .pipe(tapRefCount((refCount) => console.log('Refcount is now', refCount)));
 * source$.subscribe(() => {}); // Logs 'Refcount is now 1'
 */
var tapRefCount = function tapRefCount(onChange) {
  return function (source$) {
    // Mute the operator if it has nothing to do
    if (typeof onChange !== 'function') {
      return source$;
    }

    var refCount = 0; // Spy on subscribe

    return _rxjs.Observable.create(function (observer) {
      var subscription = source$.subscribe(observer);
      var prevRefCount = refCount;
      refCount++;
      onChange(refCount, prevRefCount); // Spy on unsubscribe

      return function () {
        subscription.unsubscribe();
        var prevRefCount = refCount;
        refCount--;
        onChange(refCount, prevRefCount);
      };
    });
  };
};
/**
 * Updates the subscribersCount field in the rpc$ Observable's metadata object
 * every time there's a new subscription or unsubscription.
 *
 * @ignore
 * @param {Object} metadata - The metadata Object to change.
 */


exports.tapRefCount = tapRefCount;

var addToOverview = function addToOverview(metadata) {
  return tapRefCount(function (refCount) {
    Object.assign(metadata, {
      subscribersCount: refCount
    });
  });
};

exports.addToOverview = addToOverview;