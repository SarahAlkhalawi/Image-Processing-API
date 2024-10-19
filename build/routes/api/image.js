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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const imageResize_1 = require("../../utils/imageResize");
const image_routes = (0, express_1.Router)();
image_routes.get('/resize', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { imageName, width, height } = req.query;
    if (!imageName || !width || !height) {
        res.status(400).send('Missing imageName, width, or height');
        return;
    }
    const widthNum = parseInt(width, 10);
    const heightNum = parseInt(height, 10);
    if (isNaN(widthNum) || isNaN(heightNum)) {
        res.status(400).send('Width and height must be valid numbers');
        return;
    }
    try {
        const thumbnailPath = yield (0, imageResize_1.resizeImage)(imageName, widthNum, heightNum);
        res.sendFile(thumbnailPath);
    }
    catch (error) {
        console.error(error);
        if (error instanceof Error) {
            if (error.message === 'Image not found') {
                res.status(404).send('Image not found');
                return;
            }
        }
        res.status(500).send('Internal server error');
        return;
    }
}));
exports.default = image_routes;
