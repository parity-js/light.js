"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeContract$ = void 0;

var _abi = _interopRequireDefault(require("@parity/abi"));

var _encode = require("@parity/api/lib/util/encode");

var _memoizee = _interopRequireDefault(require("memoizee"));

var _operators = require("../../utils/operators");

var _api = _interopRequireDefault(require("../../api"));

var _getFrequency = _interopRequireDefault(require("../utils/getFrequency"));

var _frequency = require("../../frequency");

var _post = require("./post");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
    address: address,

    get contractObject() {
      return getContract(address, abiJson);
    }

  }; // We then copy every key inside contract.instance into our `result` object,
  // replacing each the value by an Observable instead of a Promise.

  abi.functions.forEach(function (_ref) {
    var name = _ref.name;

    result["".concat(name, "$")] = function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      // We only get the contract when the function is called for the 1st
      // time. Note: getContract is memoized, won't create contract on each
      // call.
      var contract = getContract(address, abiJson);
      var method = contract.instance[name]; // Hold the method from the Abi
      // The last arguments in args can be an options object

      var options = args.length === method.inputs.length + 1 ? args.pop() : {};

      if (method.constant) {
        return (0, _getFrequency.default)(makeContract$).pipe((0, _operators.switchMapPromise)(function () {
          return contract.instance[name].call(options, args);
        }), (0, _operators.distinctReplayRefCount)(), (0, _operators.addToOverview)(makeContract$));
      } else {
        return (0, _post.post$)(_objectSpread({
          to: address,
          data: (0, _encode.abiEncode)(method.name, method.inputs.map(function (_ref2) {
            var type = _ref2.kind.type;
            return type;
          }), args)
        }, options));
      }
    };
  });
  return result;
}, {
  length: 1 // Only memoize by address

});
exports.makeContract$ = makeContract$;
makeContract$.metadata = {
  calls: [],
  frequency: [_frequency.onEveryBlock$]
};