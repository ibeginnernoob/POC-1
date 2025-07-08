import { Router } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user';

const router = Router();

type JWTPayload = {
    userId: string;
    iat: number;
    exp: number;
};

router.use(async (req, res, next) => {
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

        if (!payload.userId) {
			res.status(404).json({
                msg: 'JWT payload incorrect',
            });
			return;
        }

		const user = await User.findById(payload.userId);

		if (!user) {
			res.status(404).json({
                msg: 'Invalid user credentials, please sign in',
            });
			return;
		}

		console.log(user.pb_number);

        req.userId = payload.userId;
		req.pb_number = user.pb_number;
        console.log(req.userId);
        next();
    } catch (e: any) {
        console.log(e);
        res.status(403).json({
            msg: 'Invalid JWT, please sign in',
        });
    }
});

export default router;
