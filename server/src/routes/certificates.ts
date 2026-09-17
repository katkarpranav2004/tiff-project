import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import prisma from '../lib/prisma';
import { authenticate, AuthRequest } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { certificateCreateSchema } from '../validators/schemas';
import { asyncHandler } from '../middleware/errorHandler';
import { paginationParams } from '../utils/helpers';
import { putFile } from '../lib/storage';
import { uploadSingle } from '../middleware/upload';

const router = Router();

// Rate limit public verification
const verifyLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  message: { success: false, error: 'Too many verification attempts. Please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// GET /api/certificates/verify/:caieNumber — Public: verify certificate
router.get('/verify/:caieNumber', verifyLimiter, asyncHandler(async (req, res) => {
  const { caieNumber } = req.params;

  // Sanitize input
  const sanitized = caieNumber.trim().toUpperCase();

  if (!/^CAIE-[A-Z0-9]{4}-[A-Z0-9]{4}$/.test(sanitized)) {
    return res.status(400).json({
      success: false,
      error: 'Invalid CAIE number format. Expected: CAIE-XXXX-XXXX',
    });
  }

  const certificate = await prisma.certificate.findUnique({
    where: { caieNumber: sanitized },
    select: {
      caieNumber: true,
      candidateName: true,
      courseName: true,
      issueDate: true,
      certificateFileUrl: true,
      certificateFileType: true,
    },
  });

  if (!certificate) {
    return res.status(404).json({
      success: false,
      error: 'Certificate not found. Please check the CAIE number and try again.',
    });
  }

  res.json({
    success: true,
    data: {
      verified: true,
      certificate,
    },
  });
}));

// GET /api/certificates — Admin: list all certificates
router.get('/', authenticate, asyncHandler(async (req, res) => {
  const { page, limit, skip } = paginationParams(req.query as any);
  const { search } = req.query;

  const where: any = {};
  if (search && typeof search === 'string') {
    where.OR = [
      { caieNumber: { contains: search } },
      { candidateName: { contains: search } },
      { courseName: { contains: search } },
    ];
  }

  const [certificates, total] = await Promise.all([
    prisma.certificate.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
    }),
    prisma.certificate.count({ where }),
  ]);

  res.json({
    success: true,
    data: certificates,
    pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
  });
}));

// POST /api/certificates — Admin: upload certificate
router.post('/', authenticate, asyncHandler(async (req: AuthRequest, res) => {
  uploadSingle(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ success: false, error: err.message });
    }

    try {
      const { caieNumber, candidateName, courseName, issueDate } = req.body;

      // Validate required fields
      const validation = certificateCreateSchema.safeParse({
        caieNumber,
        candidateName,
        courseName,
        issueDate,
      });

      if (!validation.success) {
        return res.status(400).json({
          success: false,
          error: 'Validation failed',
          details: validation.error.errors.map((e) => ({
            field: e.path.join('.'),
            message: e.message,
          })),
        });
      }

      // Check duplicate CAIE
      const existing = await prisma.certificate.findUnique({
        where: { caieNumber: caieNumber.trim().toUpperCase() },
      });

      if (existing) {
        return res.status(409).json({
          success: false,
          error: 'A certificate with this CAIE number already exists.',
        });
      }

      const file = req.file;
      const certificateFileUrl = file ? await putFile(file.buffer, file.originalname, file.mimetype) : '';
      const certificateFileType = file ? file.mimetype : null;

      const certificate = await prisma.certificate.create({
        data: {
          caieNumber: caieNumber.trim().toUpperCase(),
          candidateName: candidateName.trim(),
          courseName: courseName.trim(),
          issueDate: new Date(issueDate),
          certificateFileUrl,
          certificateFileType,
        },
      });

      if (req.admin) {
        await prisma.activityLog.create({
          data: {
            adminId: req.admin.id,
            action: 'CREATE',
            entityType: 'certificate',
            entityId: certificate.id,
            metadata: JSON.stringify({ caieNumber: certificate.caieNumber, candidateName: certificate.candidateName }),
          },
        });
      }

      res.status(201).json({ success: true, data: certificate });
    } catch (error: any) {
      res.status(500).json({ success: false, error: 'Failed to create certificate' });
    }
  });
}));

// PUT /api/certificates/:id — Admin: update certificate
router.put('/:id', authenticate, asyncHandler(async (req: AuthRequest, res) => {
  const { id } = req.params;

  const existing = await prisma.certificate.findUnique({ where: { id } });
  if (!existing) {
    return res.status(404).json({ success: false, error: 'Certificate not found' });
  }

  const data: any = {};
  if (req.body.candidateName) data.candidateName = req.body.candidateName.trim();
  if (req.body.courseName) data.courseName = req.body.courseName.trim();
  if (req.body.issueDate) data.issueDate = new Date(req.body.issueDate);

  const certificate = await prisma.certificate.update({ where: { id }, data });

  if (req.admin) {
    await prisma.activityLog.create({
      data: {
        adminId: req.admin.id,
        action: 'UPDATE',
        entityType: 'certificate',
        entityId: certificate.id,
        metadata: JSON.stringify({ caieNumber: certificate.caieNumber }),
      },
    });
  }

  res.json({ success: true, data: certificate });
}));

// DELETE /api/certificates/:id — Admin: delete certificate
router.delete('/:id', authenticate, asyncHandler(async (req: AuthRequest, res) => {
  const { id } = req.params;

  const existing = await prisma.certificate.findUnique({ where: { id } });
  if (!existing) {
    return res.status(404).json({ success: false, error: 'Certificate not found' });
  }

  await prisma.certificate.delete({ where: { id } });

  if (req.admin) {
    await prisma.activityLog.create({
      data: {
        adminId: req.admin.id,
        action: 'DELETE',
        entityType: 'certificate',
        entityId: id,
        metadata: JSON.stringify({ caieNumber: existing.caieNumber }),
      },
    });
  }

  res.json({ success: true, message: 'Certificate deleted successfully' });
}));

export { router as certificateRoutes };
