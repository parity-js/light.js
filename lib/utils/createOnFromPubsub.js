"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _rxjs = require("rxjs");

var _operators = require("rxjs/operators");

var _api = _interopRequireDefault(require("../api"));

var _distinctReplayRefCount = require("./operators/distinctReplayRefCount");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 * Observable that emits on each pubsub event.
 *
 * @ignore
 * @example onAccountsChanged$, onEveryBlock$...
 */
var createOnFromPubsub = function createOnFromPubsub(pubsub) {
  var _pubsub$split = pubsub.split('_'),
      _pubsub$split2 = _slicedToArray(_pubsub$split, 2),
      namespace = _pubsub$split2[0],
      method = _pubsub$split2[1]; // There's a chance the provider doesn't support pubsub, for example
  // MetaMaskProvider. In this case, as suggested on their Github, the best
  // solution for now is to poll.


  if (!(0, _api.default)().isPubSub) {
    return (0, _rxjs.timer)(0, 1000).pipe((0, _operators.switchMap)(function () {
      return (0, _api.default)()[namespace][method]();
    }));
  }

  return _rxjs.Observable.create(function (observer) {
    var subscription = (0, _api.default)().pubsub[namespace][method](function (error, result) {
      if (error) {
        observer.error(error);
      } else {
        observer.next(result);
      }
    });
    return function () {
      return subscription.then(function (subscriptionId) {
        return (0, _api.default)().pubsub.unsubscribe(subscriptionId);
      });
    };
  }).pipe((0, _distinctReplayRefCount.distinctReplayRefCount)());
};

var _default = createOnFromPubsub;
exports.default = _default;