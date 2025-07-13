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

        const newSnag = new Snag(generatedData);

        const DBRes = await newSnag.save();

    res.status(200).json({
      msg: "Response successfully generated!",
      snagId: DBRes._id,
    });
  } catch (e: any) {
    console.log(e);
    res.status(500).json({
      msg: "Data could not generated",
    });
  }
});

router.get("/fetch-sidebar", async (req, res, next) => {
  try {
    const userId = req.userId; // 👈 ensure this is set via middleware

    if (!userId) {
      res.status(401).json({ msg: "Unauthorized: No userId found in request" });
      return;
    }

    const snags = await Snag.find({ userId }).sort({ createdAt: -1 }); // latest first

    console.log("Fetching snags for userId:", userId);

    res.status(200).json({
      msg: "Snag details found successfully",
      snags,
    });
  } catch (e: any) {
    console.error("❌ Error fetching snags:", e);
    res.status(500).json({
      msg: "Snag details could not be retrieved",
    });
  }
});

router.delete("/delete-snag/:id", async (req, res) => {
  try {
    console.log("🔍 DELETE /snag/delete-snag/:id route hit");
    console.log("Snag ID:", req.params.id);
    console.log("User ID:", req.userId);
    const snagId = req.params.id;
    const userId = req.userId; 

    if (!userId) {
      res.status(401).json({ msg: "Unauthorized: No userId found" });
      return
    }

    const deleted = await Snag.findOneAndDelete({ _id: snagId, userId });

    if (!deleted) {
      res.status(404).json({ msg: "Snag not found or already deleted" });
      return
    }

    res.status(200).json({ msg: "Snag deleted successfully", deletedId: snagId });
  } catch (error) {
    console.error("❌ Error deleting snag:", error);
    res.status(500).json({ msg: "Failed to delete snag" });
  }
});



router.get("/fetch/:snagId", async (req, res, next) => {
  try {
    const snagId = req.params.snagId;
    console.log("Fetching snag for snagId:", snagId);

    const snag = await Snag.findById(snagId);
    
    console.log(snag);

    if (!snag) {
      res.status(404).json({
        msg: `Snag with id: ${snagId} could not be found`,
      });
      return;
    }

    res.json({
      msg: "Snag details found successfully",
      snagDetails: snag,
    });
  } catch (e: any) {
    console.log(e);
    res.status(500).json({
      msg: "Snag details could not be retreived",
    });
  }
});

router.post('/analyse', async (req, res) => {
    const { file_name, pb_number, query } = req.body;
  
    try {
      const fastapiUrl = `${process.env.FAST_API_ANLYSIS_URL}/analytics`; // Update this if hosted elsewhere
  
      const response = await axios.post(fastapiUrl, {
        file_name,
        pb_number,
        query
      });
  
      res.status(200).json(response.data);
    } catch (error) {
      console.error("Error communicating with FastAPI backend:", (error as any).message);
      res.status(500).json({ error: "FastAPI request failed", details: (error as any).message });
    }
  });
  
  module.exports = router;

router.post("/upload-file", async (req, res, next) => {
  if (!req.userId) {
    res.status(401).json({ error: "Unauthorized" });
  }

  const busboy = Busboy({ headers: req.headers });

  busboy.on("file", async (fieldname, file, info) => {
    const { filename, encoding, mimeType } = info;
    const chunks: Buffer[] = [];

    file.on("data", (chunk) => {
      chunks.push(chunk);
    });

    file.on("end", async () => {
      const buffer = Buffer.concat(chunks);
      const formData = new FormData();
      const blob = new Blob([buffer], { type: mimeType });

      if (!blob) {
        return res.status(400).json({ error: "Invalid file data" });
      }

      formData.append("file", blob, filename);
      formData.append("pb_number", `${req.pb_number}`);

      try {
        const response = await fetch(`${process.env.FAST_API_URL}/store_file`, {
          method: "POST",
          body: formData,
        });
    } catch (e: any) {
        console.log(e);
        res.status(500).json({
            msg: 'Data could not generated',
        });
    }
})})});

router.post('/analyse', async (req, res) => {
    const { file_name, snagId } = req.body;
    const pb_number = req.pb_number;
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

        const fastapiUrl = `${process.env.FAST_API_ANLYSIS_URL}/analytics`;

        // const response = await axios.post(fastapiUrl, {
        //     file_name,
        //     pb_number,
        //     query,
        // });

        // res.status(200).json(response.data);
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
