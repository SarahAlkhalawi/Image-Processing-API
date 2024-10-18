"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const sharp_1 = __importDefault(require("sharp"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const image_routes = (0, express_1.Router)();
const ASSETS_DIR = path_1.default.join(__dirname, '../../..', 'assets');
const FULL_DIR = path_1.default.join(ASSETS_DIR, 'full');
const THUMB_DIR = path_1.default.join(ASSETS_DIR, 'thumb');
image_routes.get('/resize', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { imageName, width, height } = req.query;
    if (!imageName || !width || !height) {
        return res.status(400).send('Missing imageName, width, or height');
    }
    const widthNum = parseInt(width, 10);
    const heightNum = parseInt(height, 10);
    if (isNaN(widthNum) || isNaN(heightNum)) {
        return res.status(400).send('Width and height must be valid numbers');
    }
    //   const imageExtension = 'png' || 'jpeg'; 
    const fullImagePath = path_1.default.join(FULL_DIR, `${imageName}.jpg`);
    const thumbImageName = `${imageName}_${widthNum}_${heightNum}.jpg`;
    const thumbImagePath = path_1.default.join(THUMB_DIR, thumbImageName);
    try {
        yield fs_extra_1.default.ensureDir(THUMB_DIR);
        if (!(yield fs_extra_1.default.pathExists(fullImagePath))) {
            return res.status(404).send('Image not found');
        }
        if (yield fs_extra_1.default.pathExists(thumbImagePath)) {
            return res.sendFile(thumbImagePath);
        }
        yield (0, sharp_1.default)(fullImagePath)
            .resize(widthNum, heightNum)
            .toFile(thumbImagePath);
        res.sendFile(thumbImagePath);
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
}));
exports.default = image_routes;
