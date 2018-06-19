"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _memoizee = _interopRequireDefault(require("memoizee"));

var _rxjs = require("rxjs");

var _withoutLoading = require("../../utils/operators/withoutLoading");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * Mixins (aka. interface in Java or trait in Rust) that are added into an rpc$
 * Observable.
 *
 * @ignore
 */
var frequencyMixins = {
  /**
   * Change the frequency of a RPC Observable.
   *
   * @param {Array<Observable>} frequency - An array of frequency Observables.
   * @return {Null}
   * @example
   * balanceOf$.setFrequency([onEverySecond$, onStartup$]); // Will fetch
   * balance once on startup, and then every second.
   */
  setFrequency: function setFrequency(frequency) {
    // TODO Check that frequency is well-formed
    this.metadata.frequency = frequency; // If necessary, we clear the memoize cache

    if (typeof this.clear === 'function') {
      this.clear();
    }
  }
};
/**
 * Add metadata to an rpc$ Observable, and transform it into a ReplaySubject(1).
 *
 * @ignore
 * @param {Object} metadata - The metadata to add.
 * @return {Observable} - The original rpc$ Observable with patched metadata.
 */

var createRpc = function createRpc() {
  var metadata = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return function (source$) {
    var rpc$ = function rpc$() {
      var _source$;

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      // The last arguments is an options, if it's an object
      // TODO What if we pass a single object as argument, which is not options?
      var options = args && args.length && _typeof(args[args.length - 1]) === 'object' ? args.pop() : {};
      var subject$ = new _rxjs.ReplaySubject(1); // The pipes to add, from the options

      var pipes = [];

      if (options.withoutLoading === true) {
        pipes.push((0, _withoutLoading.withoutLoading)());
      }

      (_source$ = source$.apply(void 0, args)).pipe.apply(_source$, pipes).subscribe(subject$);

      return subject$;
    };

    var result$ = (0, _memoizee.default)(rpc$);
    Object.assign(result$, frequencyMixins, {
      metadata: metadata
    });
    return result$;
  };
};

var _default = createRpc;
exports.default = _default;