"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.post$ = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _rxjs = require("rxjs");

var _operators = require("../../utils/operators");

var _api = _interopRequireDefault(require("../../api"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } } function _next(value) { step("next", value); } function _throw(err) { step("throw", err); } _next(); }); }; }

/**
 * Post a transaction to the network.
 *
 * Calls, in this order, `eth_estimateGas`, `parity_postTransaction`,
 * `parity_checkRequest` and `eth_getTransactionReceipt` to get the status of
 * the transaction.
 *
 * @param {Object} tx - A transaction object.
 * @return {Observable<Object>} - The status of the transaction.
 */
var post$ = function post$(tx) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var source$ = _rxjs.Observable.create(
  /*#__PURE__*/
  function () {
    var _ref = _asyncToGenerator(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee(observer) {
      var gas, signerRequestId, transactionHash, receipt;
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;

              if (!options.estimate) {
                _context.next = 7;
                break;
              }

              observer.next({
                estimating: true
              });
              _context.next = 5;
              return (0, _api.default)().eth.estimateGas(tx);

            case 5:
              gas = _context.sent;
              observer.next({
                estimated: gas
              });

            case 7:
              _context.next = 9;
              return (0, _api.default)().parity.postTransaction(tx);

            case 9:
              signerRequestId = _context.sent;
              observer.next({
                requested: signerRequestId
              });
              _context.next = 13;
              return (0, _api.default)().pollMethod('parity_checkRequest', signerRequestId);

            case 13:
              transactionHash = _context.sent;

              if (!tx.condition) {
                _context.next = 18;
                break;
              }

              observer.next({
                signed: transactionHash,
                schedule: tx.condition
              });
              _context.next = 23;
              break;

            case 18:
              observer.next({
                signed: transactionHash
              });
              _context.next = 21;
              return (0, _api.default)().pollMethod('eth_getTransactionReceipt', transactionHash, function (receipt) {
                return receipt && receipt.blockNumber && !receipt.blockNumber.eq(0);
              });

            case 21:
              receipt = _context.sent;
              observer.next({
                confirmed: receipt
              });

            case 23:
              observer.complete();
              _context.next = 30;
              break;

            case 26:
              _context.prev = 26;
              _context.t0 = _context["catch"](0);
              observer.next({
                failed: _context.t0
              });
              observer.error(_context.t0);

            case 30:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this, [[0, 26]]);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }()).pipe((0, _operators.distinctReplayRefCount)());

  source$.subscribe(); // Run this Observable immediately;

  return source$;
};

exports.post$ = post$;
post$.metadata = {
  calls: ['eth_estimateGas', 'parity_postTransaction', 'parity_checkRequest', 'eth_getTransactionReceipt']
};