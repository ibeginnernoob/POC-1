import { Router, Request, Response } from 'express';
import axios from 'axios';
import Snag from '../models/snag';
import Busboy from 'busboy';

const router = Router();

type GeneratedData = {
    filename?: string;
    userId?: string; // add this to store in DB once the ML response arrives
    timestamp: string;
    query: string;
    rectification: {
        ai_recommendation: string;
        based_on_historical_cases: string;
    };
    similar_historical_snags: any[];
};

router.get('/user-files', async (req, res, next) => {
    try {
        const pb_number = req.pb_number;

        const MLres = await axios.post(
            `${process.env.FAST_API_URL}/send_file_names/`,
            {
                pb_number: pb_number,
            }
        );

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

router.get('/fetch-sidebar', async (req, res, next) => {
    try {
        const userId = req.userId;

        const snags = await Snag.find({ userId })
            .select('_id query timestamp')
            .sort({ createdAt: -1 });

        if (!snags) {
            res.status(404).json({
                msg: 'user snags could not be fetched',
            });
            return;
        }

        res.status(200).json({
            msg: 'Snag details found successfully',
            snags,
        });
    } catch (e: any) {
        console.error('❌ Error fetching snags:', e);
        res.status(500).json({
            msg: 'Snag details could not be retrieved',
        });
    }
});

router.get('/fetch/:snagId', async (req, res, next) => {
    try {
        const snagId = req.params.snagId;

        const snag = await Snag.findById(snagId);

        if (!snag) {
            res.status(404).json({
                msg: `Snag with id: ${snagId} could not be found`,
            });
            return;
        }

        res.json({
            msg: 'Snag details found successfully',
            snagDetails: snag,
            pb_number: req.pb_number,
        });
    } catch (e: any) {
        console.log(e);
        res.status(500).json({
            msg: 'Snag details could not be retreived',
        });
    }
});

router.post('/rectify', async (req, res, next) => {
    try {
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
        if (!prompt || prompt.length === 0) {
            res.status(404).json({
                msg: 'No prompt provided!',
            });
            return;
        }

        const MLreqPayload = {
            query: prompt,
            file_name: filename,
            pb_number: req.pb_number?.toString(),
        };

        const generatedRes = await axios.post(
            `${process.env.FAST_API_URL}/rectify`,
            MLreqPayload
        );

        if (!generatedRes || generatedRes.status !== 200) {
            res.status(500).json({
                msg: 'Could not generate rectification!',
            });
        }

        const generatedData = generatedRes.data as GeneratedData;
        generatedData.userId = req.userId;
        generatedData.filename = filename;

        console.log('Generated Data file name:', generatedData.filename);

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

router.delete('/delete-snag/:id', async (req, res) => {
    try {
        const snagId = req.params.id;
        const userId = req.userId;

        const deleted = await Snag.findOneAndDelete({ _id: snagId, userId });

        if (!deleted) {
            res.status(404).json({ msg: 'Snag not found or already deleted' });
            return;
        }

        res.status(200).json({
            msg: 'Snag deleted successfully',
        });
    } catch (error) {
        console.error('❌ Error deleting snag:', error);
        res.status(500).json({ msg: 'Failed to delete snag' });
    }
});

type AnalysisData = {
    based_on_historical_cases: string;
    analytics: {
        total_similar_cases_found: string;
        average_similarity_percentage: string;

        highest_similarity_percentage: string;
        lowest_similarity_percentage: string;
        recommendation_reliability: string;
    };
    graphs: any;
};

router.post('/analyse', async (req, res) => {
    const { file_name, snagId } = req.body;
    try {
        if (!file_name || file_name.length === 0) {
            res.status(404).json({
                msg: 'No file provided!',
            });
            return;
        }

        const snag = await Snag.findById(snagId);
        if (!snag) {
            res.status(404).json({
                msg: `Snag with id: ${snagId} could not be found`,
            });
            return;
        }

        const response = await axios.post(
            `${process.env.FAST_API_URL}/analytics`,
            {
                file_name: file_name,
                pb_number: req.pb_number,
                query: snag.query,
            }
        );

        if (!response || response.status !== 200) {
            res.status(500).json({
                msg: 'Analysis could not be fetched',
            });
            return;
        }

        const analysisData: AnalysisData = response.data as AnalysisData;

        snag.isAnalysisFetch = true;
        snag.based_on_historical_cases = analysisData.based_on_historical_cases;
        snag.analytics = analysisData.analytics;
        snag.graphs = analysisData.graphs;

        const saveRes = await snag.save();
        if (!saveRes) {
            res.status(500).json({
                msg: 'Failed to save analysis data to the snag',
            });
            return;
        }

        res.status(200).json({
            msg: 'Analysis fetched successfully',
            analysis: analysisData,
        });
    } catch (error) {
        console.error(
            'Error communicating with FastAPI backend:',
            (error as any).message
        );
        res.status(500).json({
            error: 'FastAPI request failed',
            details: (error as any).message,
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

                res.status(200).json({
                    msg: 'File uploaded successfully',
                });
            } catch (error) {
                res.status(500).json({ msg: 'Failed to forward file' });
            }
        });
    });

    req.pipe(busboy);
});

router.post('/fetch-cols', async (req, res, next) => {
    try {
        const pb_number = req.pb_number;

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
