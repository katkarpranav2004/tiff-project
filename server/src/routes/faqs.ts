import { Router } from 'express';
import prisma from '../lib/prisma';
import { authenticate, AuthRequest } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { faqCreateSchema, faqUpdateSchema } from '../validators/schemas';
import { asyncHandler } from '../middleware/errorHandler';

const router = Router();

// GET /api/faqs - Public
router.get('/', asyncHandler(async (_req, res) => {
  const faqs = await prisma.fAQ.findMany({
    where: { isPublished: true },
    orderBy: { order: 'asc' },
  });
  res.json({ success: true, data: faqs });
}));

// GET /api/faqs/all - Admin
router.get('/all', authenticate, asyncHandler(async (_req, res) => {
  const faqs = await prisma.fAQ.findMany({
    orderBy: { order: 'asc' },
  });
  res.json({ success: true, data: faqs });
}));

// POST /api/faqs - Admin
router.post('/', authenticate, validate(faqCreateSchema), asyncHandler(async (req: AuthRequest, res) => {
  const faq = await prisma.fAQ.create({ data: req.body });
  if (req.admin) {
    await prisma.activityLog.create({
      data: { adminId: req.admin.id, action: 'CREATE', entityType: 'faq', entityId: faq.id },
    });
  }
  res.status(201).json({ success: true, data: faq });
}));

// PUT /api/faqs/:id - Admin
router.put('/:id', authenticate, validate(faqUpdateSchema), asyncHandler(async (req: AuthRequest, res) => {
  const { id } = req.params;
  const existing = await prisma.fAQ.findUnique({ where: { id } });
  if (!existing) return res.status(404).json({ success: false, error: 'FAQ not found' });
  
  const faq = await prisma.fAQ.update({ where: { id }, data: req.body });
  if (req.admin) {
    await prisma.activityLog.create({
      data: { adminId: req.admin.id, action: 'UPDATE', entityType: 'faq', entityId: faq.id },
    });
  }
  res.json({ success: true, data: faq });
}));

// DELETE /api/faqs/:id - Admin
router.delete('/:id', authenticate, asyncHandler(async (req: AuthRequest, res) => {
  const { id } = req.params;
  const existing = await prisma.fAQ.findUnique({ where: { id } });
  if (!existing) return res.status(404).json({ success: false, error: 'FAQ not found' });
  
  await prisma.fAQ.delete({ where: { id } });
  if (req.admin) {
    await prisma.activityLog.create({
      data: { adminId: req.admin.id, action: 'DELETE', entityType: 'faq', entityId: id },
    });
  }
  res.json({ success: true, message: 'FAQ deleted successfully' });
}));

export { router as faqRoutes };
