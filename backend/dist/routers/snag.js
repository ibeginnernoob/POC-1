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
const axios_1 = __importDefault(require("axios"));
const router = (0, express_1.Router)();
router.post('/rectify', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.userId);
        console.log(req.body);
        const generatedRes = yield axios_1.default.post(`${process.env.FAST_API_URL}/rectify`, {
            query: 'TR vibrations',
        });
        console.log(generatedRes.data);
        res.status(200).json({
            msg: 'Data successfully generated!',
            generatedData: generatedRes.data
        });
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            msg: 'Data could not generated'
        });
    }
}));
exports.default = router;
