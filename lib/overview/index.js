"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setSubscribersCount = void 0;

var rpc = _interopRequireWildcard(require("../rpc"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var subscribersCount = {};
/**
 * Set the number of subscribers (i.e. refCount) an Observable currently has.
 *
 * @param {String} key - The Observable name inside the rpc/ folder.
 * @param {Number} count - The number of subscribers the Observable currently
 * has.
 */

var setSubscribersCount = function setSubscribersCount(key, count) {
  subscribersCount[key] = count;
};
/**
 * Add a property on window, so that the subscribed object can be viewed in the
 * JS console via `window.parity.rpcOverview()`
 */


exports.setSubscribersCount = setSubscribersCount;

if (typeof window !== 'undefined') {
  window.parity = _objectSpread({}, window.parity, {
    rpcOverview: function rpcOverview() {
      var overview = {};
      Object.keys(rpc).forEach(function (key) {
        var count = subscribersCount[key];

        if (count > 0) {
          overview[key] = {
            calls: rpc[key].metadata.calls,
            priority: (rpc[key].metadata.priority || []).map(function (priority) {
              return priority.metadata.name;
            }),
            subscribersCount: count
          };
        }
      });
      return overview;
    }
  });
}