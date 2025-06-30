import { Router } from 'express';
import jwt from 'jsonwebtoken';

const router = Router();

type JWTPayload = {
	userId: string;
	iat: number;
	exp: number;
}

router.use((req, res, next) => {
    try {
        const header = req.headers.authorization;

        if (!header) {
            res.status(404).json({
                msg: 'JWT not found',
            });
            return;
        }

        const token: string = header?.split(' ')[1];
        const payload = jwt.verify(token, process.env.JWT_SECRET as string) as JWTPayload;
		req.userId = payload.userId;
		console.log(req.userId);
		next()
    } catch (e: any) {
		console.log(e);
		res.status(403).json({
			msg: 'Invalid JWT, please sign in'
		})
	}
});

export default router;
