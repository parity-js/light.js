"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setDefaultAccount$ = exports.post$ = exports.nodeHealth$ = exports.me$ = exports.defaultAccount$ = exports.chainStatus$ = exports.chainName$ = exports.accounts$ = exports.allAccountsInfo$ = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _rxjs = require("rxjs");

var _operators = require("rxjs/operators");

var _operators2 = require("../../utils/operators");

var _api = _interopRequireDefault(require("../../api"));

var _createRpc = _interopRequireDefault(require("../../utils/createRpc"));

var _getPriority = require("../../priorities/getPriority");

var _priorities = require("../../priorities");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } } function _next(value) { step("next", value); } function _throw(err) { step("throw", err); } _next(); }); }; }

/**
 * Get all accounts info.
 *
 * Calls parity_allAccountsInfo.
 *
 * @return {Observable<String>} - An Observable containing the name of the
 * current chain.
 */
var allAccountsInfo$ = (0, _createRpc.default)({
  calls: ['parity_allAccountsInfo'],
  priority: [_priorities.onAccountsChanged$]
})(function () {
  return (0, _getPriority.getPriority)(allAccountsInfo$).pipe((0, _operators2.switchMapPromise)(function () {
    return (0, _api.default)().parity.allAccountsInfo();
  }), (0, _operators.map)(function (allAccountsInfo) {
    Object.keys(allAccountsInfo).forEach(function (address) {
      if (!allAccountsInfo[address].uuid) {
        // We remove the accounts that don't have uuid, they are not user
        // accounts (maybe contracts etc)
        delete allAccountsInfo[address];
      } else {
        // We add the address field
        allAccountsInfo[address].address = address;
      }
    });
    return allAccountsInfo;
  }), (0, _operators2.distinctReplayRefCount)(), (0, _operators2.addToOverview)(allAccountsInfo$));
});
/**
 * Observable which contains the array of all addresses managed by the light
 * client.
 * *
 * @return {Observable<Array<String>>} - An Observable containing the list of
 * public addresses.
 */

exports.allAccountsInfo$ = allAccountsInfo$;
var accounts$ = (0, _createRpc.default)({
  parent: 'allAccountsInfo$'
})(function () {
  return allAccountsInfo$().pipe((0, _operators.map)(function (info) {
    return Object.keys(info);
  }), (0, _operators2.addToOverview)(accounts$));
});
/**
 * Get the name of the current chain.
 *
 * Calls parity_netChain.
 *
 * @return {Observable<String>} - An Observable containing the name of the
 * current chain.
 */

exports.accounts$ = accounts$;
var chainName$ = (0, _createRpc.default)({
  calls: ['parity_netChain'],
  priority: [_priorities.onStartup$]
})(function () {
  return (0, _getPriority.getPriority)(chainName$).pipe((0, _operators2.switchMapPromise)(function () {
    return (0, _api.default)().parity.netChain();
  }), (0, _operators2.distinctReplayRefCount)(), (0, _operators2.addToOverview)(chainName$));
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
  return (0, _getPriority.getPriority)(chainStatus$).pipe((0, _operators2.switchMapPromise)(function () {
    return (0, _api.default)().parity.chainStatus();
  }), (0, _operators2.distinctReplayRefCount)(), (0, _operators2.addToOverview)(chainStatus$));
});
/**
 * Get the default account managed by the light client.
 *
 * Calls parity_getNewDappsDefaultAddress
 */

exports.chainStatus$ = chainStatus$;
var defaultAccount$ = (0, _createRpc.default)({
  calls: ['parity_getNewDappsDefaultAddress'],
  priority: [_priorities.onAccountsChanged$]
})(function () {
  return (0, _getPriority.getPriority)(defaultAccount$).pipe((0, _operators2.switchMapPromise)(function () {
    return (0, _api.default)().parity.getNewDappsDefaultAddress();
  }), (0, _operators2.distinctReplayRefCount)(), (0, _operators2.addToOverview)(defaultAccount$));
});
/**
 * Alias for {@link defaultAccount$}
 */

exports.defaultAccount$ = defaultAccount$;
var me$ = (0, _createRpc.default)({
  parent: 'defaultAccount$'
})(function () {
  return defaultAccount$().pipe((0, _operators2.addToOverview)(me$));
});
/**
 * Get the node's health.
 *
 * Calls parity_nodeHealth.
 *
 * @return {Observable<Object>} - An Observable containing the health.
 */

exports.me$ = me$;
var nodeHealth$ = (0, _createRpc.default)({
  calls: ['parity_nodeHealth'],
  priority: [_priorities.onEvery2Seconds$]
})(function () {
  return (0, _getPriority.getPriority)(nodeHealth$).pipe((0, _operators2.switchMapPromise)(function () {
    return (0, _api.default)().parity.nodeHealth();
  }), (0, _operators2.distinctReplayRefCount)(), (0, _operators2.addToOverview)(nodeHealth$));
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
    _regenerator.default.mark(function _callee(observer) {
      var gas, signerRequestId, transactionHash, receipt;
      return _regenerator.default.wrap(function _callee$(_context) {
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
  }()).pipe((0, _operators2.distinctReplayRefCount)(), (0, _operators2.addToOverview)(post$));

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
    _regenerator.default.mark(function _callee2(observer) {
      return _regenerator.default.wrap(function _callee2$(_context2) {
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
  }()).pipe((0, _operators2.distinctReplayRefCount)(), (0, _operators2.addToOverview)(setDefaultAccount$));

  source$.subscribe(); // Run this Observable immediately

  return source$;
};

exports.setDefaultAccount$ = setDefaultAccount$;
setDefaultAccount$.metadata = {
  calls: ['parity_setNewDappsDefaultAddress']
};