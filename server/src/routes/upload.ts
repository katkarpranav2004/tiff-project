import { Router } from 'express';
import { authenticate, AuthRequest } from '../middleware/auth';
import { uploadSingle } from '../middleware/upload';
import { putFile } from '../lib/storage';
import { asyncHandler } from '../middleware/errorHandler';

const router = Router();

// POST /api/upload - Admin
router.post('/', authenticate, asyncHandler(async (req: AuthRequest, res) => {
  uploadSingle(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ success: false, error: err.message });
    }

    if (!req.file) {
      return res.status(400).json({ success: false, error: 'No file uploaded' });
    }

    try {
      const fileUrl = await putFile(req.file.buffer, req.file.originalname, req.file.mimetype);
      res.status(201).json({
        success: true,
        data: {
          url: fileUrl,
          name: req.file.originalname,
          type: req.file.mimetype,
          size: req.file.size,
        },
      });
    } catch (e) {
      res.status(500).json({ success: false, error: (e as Error).message });
    }
  });
}));

export { router as uploadRoutes };
