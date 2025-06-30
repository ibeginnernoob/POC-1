"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const router = (0, express_1.Router)();
router.use((req, res, next) => {
    try {
        const header = req.headers.authorization;
        if (!header) {
            res.json({
                msg: 'Please sign in first!',
            });
            return;
        }
        const token = header === null || header === void 0 ? void 0 : header.split(' ')[1];
        const payload = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.userId = payload.userId;
        console.log(req.userId);
        next();
    }
    catch (e) {
        console.log(e);
        res.status(403).json({
            msg: 'Invalid JWT, please sign in'
        });
    }
});
exports.default = router;
