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
const user_1 = __importDefault(require("../models/user"));
const mongoose_1 = __importDefault(require("mongoose"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const router = (0, express_1.Router)();
router.post('/signup', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const pb_number = req.body.pb_number;
        // const password = req.body.password;
        // const name = req.body.pb_number;
        // const gender = req.body.name;
        // const phone = req.body.phone;
        // const email = req.body.email;
        // const role = req.body.role;
        // const division = req.body.division;
        // const department = req.body.department;
        // const designation = req.body.designation;
        const password = req.body.password;
        const salt = yield bcryptjs_1.default.genSalt(10);
        const hashedPassword = yield bcryptjs_1.default.hash(password, salt);
        req.body.password = hashedPassword;
        const newUser = new user_1.default(req.body);
        // const res = await User.create({
        //     details: details
        // });
        const savedUser = yield newUser.save();
        console.log(res);
        const token = jsonwebtoken_1.default.sign({
            userId: savedUser._id,
        }, process.env.JWT_SECRET, {
            expiresIn: '7d',
        });
        res.status(200).json({
            token: token,
        });
    }
    catch (e) {
        if (e instanceof mongoose_1.default.mongo.MongoServerError) {
            console.log(e.index);
            console.log(e.code);
            console.log(e.keyPattern);
            console.log(e.keyValue);
            if (e.keyValue.pb_number) {
                res.status(409).json({
                    msg: 'Duplicate pb_number!',
                });
                return;
            }
            else if (e.keyValue.email) {
                res.status(409).json({
                    msg: 'Duplicate email!',
                });
                return;
            }
        }
        res.status(500).json({
            msg: 'Something went wrong, please try again later!',
        });
    }
}));
router.post('/signin', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pb_number = req.body.pb_number;
        const password = req.body.password;
        const user = yield user_1.default.findOne({
            pb_number: pb_number,
        });
        console.log(user);
        if (!user) {
            res.status(404).json({
                msg: 'User with pb_number does not exist!',
            });
            return;
        }
        const isVerify = yield bcryptjs_1.default.compare(password, user.password);
        if (!isVerify) {
            res.status(403).json({
                msg: 'Incorrect password!',
            });
            return;
        }
        const token = jsonwebtoken_1.default.sign({
            userId: user._id,
        }, process.env.JWT_SECRET, {
            expiresIn: '7d',
        });
        res.json({
            token: token,
        });
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            msg: 'Something went wrong, please try again later!',
        });
    }
}));
exports.default = router;
