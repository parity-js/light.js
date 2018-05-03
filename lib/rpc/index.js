"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _eth = require("./eth");

Object.keys(_eth).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _eth[key];
    }
  });
});

var _parity = require("./parity");

Object.keys(_parity).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _parity[key];
    }
  });
});