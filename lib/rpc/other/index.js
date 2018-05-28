"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _makeContract = require("./makeContract");

Object.keys(_makeContract).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _makeContract[key];
    }
  });
});

var _post = require("./post");

Object.keys(_post).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _post[key];
    }
  });
});