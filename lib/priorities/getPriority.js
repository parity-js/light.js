"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPriority = void 0;

var _rxjs = require("rxjs");

var _operators = require("rxjs/operators");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

/**
 * Get the priority of a RPC Observable, i.e. how often is this Observable
 * updated.
 *
 * @param {String} rpc$ - The RPC Observable.
 * @return {Observable} - An Observable that represents the priority.
 */
var getPriority = function getPriority(rpc$) {
  return (0, _rxjs.empty)().pipe(_operators.merge.apply(void 0, _toConsumableArray(rpc$.metadata.priority)));
};

exports.getPriority = getPriority;