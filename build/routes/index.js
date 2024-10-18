"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const image_1 = __importDefault(require("./api/image"));
const routes = (0, express_1.Router)();
routes.get('/', (_req, res) => {
    res.send('Welcome to image resizeing API');
});
routes.use('/img', image_1.default);
exports.default = routes;
