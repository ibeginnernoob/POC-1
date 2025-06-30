import { Router } from 'express';
import User from '../models/user';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

type JWTPayload = {
    userId: string;
    iat: number;
    exp: number;
};

const router = Router();

type Req = {
    pb_number: string;
    password: string;
    name: string;
    gender?: string;
    phone?: string;
    email: string;
    role?: string;
    division?: string;
    department?: string;
    designation?: string;
    snags: [];
};

router.post('/signup', async (req, res, next) => {
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

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        req.body.password = hashedPassword;

        const newUser = new User(req.body as Req);

        // const res = await User.create({
        //     details: details
        // });
        const savedUser = await newUser.save();

        console.log(res);

        const token = jwt.sign(
            {
                userId: savedUser._id,
            },
            process.env.JWT_SECRET as string,
            {
                expiresIn: '7d',
            }
        );

        res.status(200).json({
            msg: 'User sign up successful!',
            token: token,
        });
    } catch (e: any) {
        if (e instanceof mongoose.mongo.MongoServerError) {
            console.log(e.index);
            console.log(e.code);
            console.log(e.keyPattern);
            console.log(e.keyValue);

            if (e.keyValue.pb_number) {
                res.status(409).json({
                    msg: 'Duplicate pb_number!',
                });
                return;
            } else if (e.keyValue.email) {
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
});

router.post('/signin', async (req, res, next) => {
    try {
        const pb_number = req.body.pb_number;
        const password = req.body.password;

        const user = await User.findOne({
            pb_number: pb_number,
        });

        console.log(user);

        if (!user) {
            res.status(404).json({
                msg: 'User with pb_number does not exist!',
            });
            return;
        }

        const isVerify = await bcrypt.compare(password, user.password);

        if (!isVerify) {
            res.status(403).json({
                msg: 'Incorrect password!',
            });
            return;
        }

        const token = jwt.sign(
            {
                userId: user._id,
            },
            process.env.JWT_SECRET as string,
            {
                expiresIn: '7d',
            }
        );

        res.status(200).json({
            token: token,
            msg: 'Sign in successful!',
        });
    } catch (e: any) {
        console.log(e);
        res.status(500).json({
            msg: 'Something went wrong, please try again later!',
        });
    }
});

router.get('/check-auth', async (req, res, next) => {
    try {
        const header = req.headers.authorization;

        if (!header) {
            res.status(404).json({
                msg: 'JWT not found',
            });
            return;
        }

        const token: string = header?.split(' ')[1];
        const payload = jwt.verify(
            token,
            process.env.JWT_SECRET as string
        ) as JWTPayload;
        res.status(200).json({
            msg: 'Valid JWT, user authenticated',
        });
    } catch (e: any) {
        console.log(e);
        res.status(403).json({
            msg: 'Invalid JWT, please sign in',
        });
    }
});

export default router;
