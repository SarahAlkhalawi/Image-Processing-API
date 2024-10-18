"use strict";
// // Create a mock Express app
// const app = express();
// app.use('/img', image_routes);
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
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../index"));
const request = (0, supertest_1.default)(index_1.default);
describe('Testing the img endpoint', () => {
    it('Using the endpoint without providing the imageName parameter returns 400', () => __awaiter(void 0, void 0, void 0, function* () {
        yield request.get('/img/resize').expect(400);
    }));
    it('Using the endpoint with a non-existent image returns 404', () => __awaiter(void 0, void 0, void 0, function* () {
        yield request.get('/img/resize?imageName=TestNotFound&width=200&height=200').expect(404);
    }));
    it('Using the endpoint with a valid image returns 200', () => __awaiter(void 0, void 0, void 0, function* () {
        yield request.get('/img/resize?imageName=fjord&width=200&height=200').expect(200);
    }));
});
