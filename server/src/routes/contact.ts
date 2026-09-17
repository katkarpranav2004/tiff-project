import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import prisma from '../lib/prisma';
import { authenticate } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { contactSchema } from '../validators/schemas';
import { asyncHandler } from '../middleware/errorHandler';
import { paginationParams } from '../utils/helpers';

const router = Router();

const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5,
  message: { success: false, error: 'Too many messages sent. Please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// POST /api/contact - Public
router.post('/', contactLimiter, validate(contactSchema), asyncHandler(async (req, res) => {
  const submission = await prisma.contactSubmission.create({ data: req.body });
  res.status(201).json({ success: true, message: 'Message sent successfully' });
}));

// GET /api/contact - Admin
router.get('/', authenticate, asyncHandler(async (req, res) => {
  const { page, limit, skip } = paginationParams(req.query as any);
  
  const [submissions, total] = await Promise.all([
    prisma.contactSubmission.findMany({
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
    }),
    prisma.contactSubmission.count(),
  ]);

  res.json({
    success: true,
    data: submissions,
    pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
  });
}));

export { router as contactRoutes };
