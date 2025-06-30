import { Router } from 'express';
import axios from 'axios';

const router = Router();

router.post('/rectify', async (req, res, next) => {
    try {
        console.log(req.userId);
		console.log(req.body);
        const generatedRes = await axios.post(`${process.env.FAST_API_URL}/rectify`, {
            query: 'TR vibrations',
        });

		console.log(generatedRes.data);

        res.status(200).json({
            msg: 'Data successfully generated!',
			generatedData: generatedRes.data
        });
    } catch (e: any) {
		console.log(e);
		res.status(500).json({
			msg: 'Data could not generated'
		})
	}
});

export default router;
