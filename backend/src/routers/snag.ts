import { Router } from 'express';
import axios from 'axios';
import Snag from '../models/snag';
import Busboy from 'busboy';

const router = Router();

type FrontendReqPayload = {
    query: string;
    helicopter_type?: string;
    event_type?: string;
    raised_by?: string;
    isChecked: boolean;
    flight_hours?: {
        upper: string;
        lower: string;
    };
};

type MLreqPayload = {
    query: string;
    helicopter_type?: string;
    event_type?: string;
    raised_by?: string;
    flight_hours?: {
        upper: string;
        lower: string;
    };
};

type PrevSnag = {
    rank: string;
    snag: string;
    rectification: string;
    metadata: {
        helicopter: string;
        raised_by: string;
        category: string;
        snag_date: string;
        rectified_on: string;
    };
    similarity_score: string;
    similarity_percentage: string;
};

export type GeneratedData = {
    timestamp: string;
    query: string;
    rectification: {
        ai_recommendation: string;
        based_on_historical_case: string;
    };
    similar_historical_snags: PrevSnag[];
    summary: {
        total_similar_cases_found: string;
        average_similarity_percentage: string;
        highest_similarity_percentage: string;
        lowest_similarity_percentage: string;
    };
};

router.post('/rectify', async (req, res, next) => {
    try {
        console.log(req.userId);
        console.log(req.body);

        const reqBody = req.body as FrontendReqPayload;

        let MLreqPayload: MLreqPayload = {
            query: reqBody.query,
        };

        if (reqBody.helicopter_type && reqBody.helicopter_type.length > 0) {
            MLreqPayload = {
                ...MLreqPayload,
                helicopter_type: reqBody.helicopter_type,
            };
        }
        if (reqBody.event_type && reqBody.event_type.length > 0) {
            MLreqPayload = {
                ...MLreqPayload,
                event_type: reqBody.event_type,
            };
        }
        if (reqBody.raised_by && reqBody.raised_by.length > 0) {
            MLreqPayload = {
                ...MLreqPayload,
                event_type: reqBody.event_type,
            };
        }
        if (reqBody.isChecked && reqBody.flight_hours) {
            MLreqPayload = {
                ...MLreqPayload,
                flight_hours: {
                    upper: reqBody.flight_hours.upper,
                    lower: reqBody.flight_hours.lower,
                },
            };
        }

        const generatedRes = await axios.post(
            `${process.env.FAST_API_URL}/rectify`,
            MLreqPayload
        );

        const generatedResData = generatedRes.data as GeneratedData;

        console.log(generatedResData);

        const newSnag = new Snag({
            title: 'Snag Data',
            details: reqBody,
            generated: generatedResData,
        });

        const DBres = await newSnag.save();
        console.log(DBres);

        res.status(200).json({
            msg: 'Data successfully generated!',
            snagId: DBres._id,
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
            formData.append('pb_number', `${req.userId}`);

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

export default router;
