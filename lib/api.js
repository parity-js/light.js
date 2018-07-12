"use strict";
// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT
Object.defineProperty(exports, "__esModule", { value: true });
var Api = require("@parity/api");
// import { name } from '../package.json';
var api;
/**
 * Sets an Api object.
 *
 * @param {object} newApi - The Api object.
 * @return {void}
 */
exports.setApi = function (newApi) {
    api = newApi;
    if (!api.isPubSub) {
        console.warn("Current provider does not support pubsub. @parity/light.js will poll every second to listen to changes.");
    }
};
/**
 * We only ever use api() at call-time of functions; this allows the options
 * (particularly the transport option) to be changed dynamically and the
 * data structure to be reused.
 *
 * @return {object} - The current Api object.
 */
exports.getApi = function () {
    if (!api) {
        api = new Api(new Api.Provider.Ws('ws://localhost:8546'));
    }
    return api;
};
exports.default = exports.getApi;
