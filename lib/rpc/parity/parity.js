"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setDefaultAccount$ = exports.post$ = exports.nodeHealth$ = exports.chainStatus$ = exports.chainName$ = void 0;

var _rxjs = require("rxjs");

var _operators = require("../../utils/operators");

var _api = _interopRequireDefault(require("../../api"));

var _createRpc = _interopRequireDefault(require("../../utils/createRpc"));

var _getPriority = require("../../priorities/getPriority");

var _priorities = require("../../priorities");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } } function _next(value) { step("next", value); } function _throw(err) { step("throw", err); } _next(); }); }; }

/**
 * Get the name of the current chain.
 *
 * Calls parity_netChain.
 *
 * @return {Observable<String>} - An Observable containing the name of the
 * current chain.
 */
var chainName$ = (0, _createRpc.default)({
  calls: ['parity_netChain'],
  priority: [_priorities.onStartup$]
})(function () {
  return (0, _getPriority.getPriority)(chainName$).pipe((0, _operators.switchMapPromise)(function () {
    return (0, _api.default)().parity.netChain();
  }), (0, _operators.distinctReplayRefCount)(), (0, _operators.addToOverview)('chainName$'));
});
/**
 * Get the status of the current chain.
 *
 * Calls parity_chainStatus.
 *
 * @return {Observable<String>} - An Observable containing the status.
 */

exports.chainName$ = chainName$;
var chainStatus$ = (0, _createRpc.default)({
  calls: ['parity_chainStatus'],
  priority: [_priorities.onEveryBlock$]
})(function () {
  return (0, _getPriority.getPriority)(chainStatus$).pipe((0, _operators.switchMapPromise)(function () {
    return (0, _api.default)().parity.chainStatus();
  }), (0, _operators.distinctReplayRefCount)(), (0, _operators.addToOverview)('chainStatus$'));
});
/**
 * Get the node's health.
 *
 * Calls parity_nodeHealth.
 *
 * @return {Observable<Object>} - An Observable containing the health.
 */

exports.chainStatus$ = chainStatus$;
var nodeHealth$ = (0, _createRpc.default)({
  calls: ['parity_nodeHealth'],
  priority: [_priorities.onEvery2Seconds$]
})(function () {
  return (0, _getPriority.getPriority)(nodeHealth$).pipe((0, _operators.switchMapPromise)(function () {
    return (0, _api.default)().parity.nodeHealth();
  }), (0, _operators.distinctReplayRefCount)(), (0, _operators.addToOverview)('nodeHealth$'));
});
/**
 * Post a transaction to the network.
 *
 * Calls, in this order, eth_estimateGas, parity_postTransaction,
 * parity_checkRequest and eth_getTransactionReceipt to get the status of the
 * transaction.
 *
 * @param {Object} tx - A transaction object.
 * @return {Observable<Object>} - The status of the transaction.
 */

exports.nodeHealth$ = nodeHealth$;

var post$ = function post$(tx) {
  var source$ = _rxjs.Observable.create(
  /*#__PURE__*/
  function () {
    var _ref = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(observer) {
      var gas, signerRequestId, transactionHash, receipt;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              observer.next({
                estimating: null
              });
              _context.next = 4;
              return (0, _api.default)().eth.estimateGas(tx);

            case 4:
              gas = _context.sent;
              observer.next({
                estimated: gas
              });
              _context.next = 8;
              return (0, _api.default)().parity.postTransaction(tx);

            case 8:
              signerRequestId = _context.sent;
              observer.next({
                requested: signerRequestId
              });
              _context.next = 12;
              return (0, _api.default)().pollMethod('parity_checkRequest', signerRequestId);

            case 12:
              transactionHash = _context.sent;

              if (!tx.condition) {
                _context.next = 17;
                break;
              }

              observer.next({
                signed: transactionHash,
                schedule: tx.condition
              });
              _context.next = 22;
              break;

            case 17:
              observer.next({
                signed: transactionHash
              });
              _context.next = 20;
              return (0, _api.default)().pollMethod('eth_getTransactionReceipt', transactionHash, function (receipt) {
                return receipt && receipt.blockNumber && !receipt.blockNumber.eq(0);
              });

            case 20:
              receipt = _context.sent;
              observer.next({
                confirmed: receipt
              });

            case 22:
              observer.complete();
              _context.next = 29;
              break;

            case 25:
              _context.prev = 25;
              _context.t0 = _context["catch"](0);
              observer.next({
                failed: _context.t0
              });
              observer.error(_context.t0);

            case 29:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this, [[0, 25]]);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }()).pipe((0, _operators.distinctReplayRefCount)(), (0, _operators.addToOverview)('post$'));

  source$.subscribe(); // Run this Observable immediately;

  return source$;
};

exports.post$ = post$;
post$.metadata = {
  calls: ['eth_estimateGas', 'parity_postTransaction', 'parity_checkRequest', 'eth_getTransactionReceipt']
};
/**
 * Set a new default account for dapps.
 *
 * @param {String} value - The public address of the account to make default.
 * @return {Observable<Object>} - An empty Observable that completes when the
 * api calls succeeds.
 */

var setDefaultAccount$ = function setDefaultAccount$(value) {
  var source$ = _rxjs.Observable.create(
  /*#__PURE__*/
  function () {
    var _ref2 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2(observer) {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return (0, _api.default)().parity.setNewDappsDefaultAddress(value);

            case 3:
              _priorities.onAccountsChanged$.next();

              observer.complete();
              _context2.next = 10;
              break;

            case 7:
              _context2.prev = 7;
              _context2.t0 = _context2["catch"](0);
              observer.error(_context2.t0);

            case 10:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this, [[0, 7]]);
    }));

    return function (_x2) {
      return _ref2.apply(this, arguments);
    };
  }()).pipe((0, _operators.distinctReplayRefCount)(), (0, _operators.addToOverview)('setDefaultAccount$'));

  source$.subscribe(); // Run this Observable immediately

  return source$;
};

exports.setDefaultAccount$ = setDefaultAccount$;
setDefaultAccount$.metadata = {
  calls: ['parity_setNewDappsDefaultAddress']
};