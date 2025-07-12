import { Router } from 'express';
import axios from 'axios';
import Snag from '../models/snag';
import Busboy from 'busboy';

const router = Router();

type GeneratedData = {
    userId?: string; // add this to store in DB once the ML response arrives
    timestamp: string;
    query: string;
    rectification: {
        ai_recommendation: string;
        based_on_historical_cases: string;
    };
    similar_historical_snags: any[];
};

router.post('/rectify', async (req, res, next) => {
    try {
        console.log(req.userId);
        console.log(req.pb_number);

        const reqBody: {
            prompt: string;
            filename: string;
        } = req.body;

        const prompt = reqBody.prompt;
        const filename = reqBody.filename;

        if (!filename || filename.length === 0) {
            res.status(404).json({
                msg: 'No file provided!',
            });
            return;
        }
        if (prompt.length === 0) {
            res.status(404).json({
                msg: 'No prompt provided!',
            });
            return;
        }

        let generatedRes = null;

        if (filename === 'default') {
            const MLreqPayload = {
                query: prompt,
            };

            console.log(MLreqPayload);

            generatedRes = await axios.post(
                `${process.env.FAST_API_URL}/rectify-file`,
                MLreqPayload
            );
        } else {
            const MLreqPayload = {
                query: prompt,
                file_name: filename,
                pb_number: req.pb_number?.toString(),
            };

            console.log(MLreqPayload);

            generatedRes = await axios.post(
                `${process.env.FAST_API_URL}/rectify-file`,
                MLreqPayload
            );
        }

        if (!generatedRes || generatedRes.status !== 200) {
            res.status(500).json({
                msg: 'Could not generate rectification!',
            });
        }

        const generatedData = generatedRes.data as GeneratedData;
        generatedData.userId = req.userId;

        console.log(generatedData);

        const newSnag = new Snag(generatedData);

        const DBRes = await newSnag.save();

        res.status(200).json({
            msg: 'Response successfully generated!',
            snagId: DBRes._id,
        });
    } catch (e: any) {
        console.log(e);
        res.status(500).json({
            msg: 'Data could not generated',
        });
    }
});

router.get('/fetch/:snagId', async (req, res, next) => {
    try {
        const snagId = req.params.snagId;

        const snag = await Snag.findById(snagId);

        console.log(snag);

        if (!snag) {
            res.status(404).json({
                msg: `Snag with id: ${snagId} could not be found`,
            });
            return;
        }

        res.json({
            msg: 'Snag details found successfully',
            snagDetails: snag,
        });
    } catch (e: any) {
        console.log(e);
        res.status(500).json({
            msg: 'Snag details could not be retreived',
        });
    }
});

router.post('/upload-file', async (req, res, next) => {
    if (!req.userId) {
        res.status(401).json({ error: 'Unauthorized' });
    }

    const busboy = Busboy({ headers: req.headers });

    busboy.on('file', async (fieldname, file, info) => {
        const { filename, encoding, mimeType } = info;
        const chunks: Buffer[] = [];

        file.on('data', (chunk) => {
            chunks.push(chunk);
        });

        file.on('end', async () => {
            const buffer = Buffer.concat(chunks);
            const formData = new FormData();
            const blob = new Blob([buffer], { type: mimeType });

            if (!blob) {
                return res.status(400).json({ error: 'Invalid file data' });
            }

            formData.append('file', blob, filename);
            formData.append('pb_number', `${req.pb_number}`);

            try {
                const response = await fetch(
                    `${process.env.FAST_API_URL}/store_file`,
                    {
                        method: 'POST',
                        body: formData,
                    }
                );

                if (!response.ok || response.status !== 200) {
                    return res
                        .status(500)
                        .json({ msg: 'Failed to upload file' });
                }

                res.json({
                    msg: 'File uploaded successfully',
                });
            } catch (error) {
                res.status(500).json({ msg: 'Failed to forward file' });
            }
        });
    });

    req.pipe(busboy);
});

router.get('/user-files', async (req, res, next) => {
    try {
        const pb_number = req.pb_number;

        const MLres = await axios.post(
            `${process.env.FAST_API_URL}/send_file_names/`,
            {
                pb_number: pb_number,
            }
        );

        console.log(process.env.FAST_API_URL);

        if (MLres.status !== 200) {
            res.status(500).json({
                msg: 'Failed to fetch user files',
            });
        }

        const resData = MLres.data as {
            files: string[];
        };

        res.status(200).json({
            msg: 'User files fetched successfully',
            files: resData.files,
        });
    } catch (e: any) {
        console.log(e);
        res.status(500).json({
            msg: 'User files could not be retreived',
        });
    }
});

router.post('/fetch-cols', async (req, res, next) => {
    try {
        const pb_number = req.pb_number;

        if (!pb_number || pb_number.length === 0) {
            res.status(404).json({
                msg: 'PB_number not found',
            });
            return;
        }

        if (!req.body.filename || req.body.filename.length === 0) {
            res.status(404).json({
                msg: 'Filename not provided',
            });
            return;
        }

        const MLres = await axios.post(
            `${process.env.FAST_API_URL}/get_unique_row/`,
            {
                pb_number: pb_number,
                filename: req.body.filename,
            }
        );

        if (MLres.status !== 200) {
            res.status(500).json({
                msg: 'Columns from file could not be fetched',
            });
            return;
        }

        res.status(200).json({
            msg: 'Columns fetched successfully',
            columns: MLres.data,
        });
    } catch (e: any) {
        console.log(e);
        res.status(500).json({
            msg: 'Columns could not be fetched',
        });
    }
});

export default router;
