"use strict";

var rpc = _interopRequireWildcard(require("../rpc"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Add a property on window, so that the subscribed object can be viewed in the
 * JS console via `window.parity.rpcOverview()`
 */
if (typeof window !== 'undefined') {
  // == null means null or undefined
  if (window.parity == null) {
    window.parity = {};
  }

  Object.assign(window.parity, {
    rpcOverview: function rpcOverview() {
      var overview = {};
      Object.keys(rpc).forEach(function (key) {
        var rpc$ = rpc[key];
        var subscribersCount = rpc$.metadata.subscribersCount; // If the current rpc$ doesn't have any subscribers, then it means that
        // it isn't used in the current dapp. In this case, we don't show it in
        // the overview.

        if (!subscribersCount) {
          return;
        } // If there are subscribers, then we add


        overview[key] = _objectSpread({}, rpc$.metadata); // We make the `frequency` field human-readable

        if (rpc$.metadata.frequency) {
          overview[key].frequency = rpc$.metadata.frequency.map(function (frequency$) {
            return frequency$.metadata.name;
          });
        } // We remove all the metadata keys that are null, empty or functions,
        // for clarity while console.logging it.


        Object.keys(overview[key]).forEach(function (innerKey) {
          if (!overview[key][innerKey] || Array.isArray(overview[key][innerKey]) && !overview[key][innerKey].length || typeof overview[key][innerKey] === 'function') {
            delete overview[key][innerKey];
          }
        });
      });
      return overview;
    }
  });
}