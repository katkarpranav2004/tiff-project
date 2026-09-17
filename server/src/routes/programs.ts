import { Router } from 'express';
import prisma from '../lib/prisma';
import { authenticate, AuthRequest } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { programCreateSchema, programUpdateSchema } from '../validators/schemas';
import { asyncHandler } from '../middleware/errorHandler';
import { slugify } from '../utils/helpers';

const router = Router();

// GET /api/programs - Public: published programs
router.get('/', asyncHandler(async (_req, res) => {
  const programs = await prisma.program.findMany({
    where: { isPublished: true },
    orderBy: { order: 'asc' },
  });
  res.json({ success: true, data: programs });
}));

// GET /api/programs/all - Admin
router.get('/all', authenticate, asyncHandler(async (_req, res) => {
  const programs = await prisma.program.findMany({ orderBy: { order: 'asc' } });
  res.json({ success: true, data: programs });
}));

// POST /api/programs - Admin
router.post('/', authenticate, validate(programCreateSchema), asyncHandler(async (req: AuthRequest, res) => {
  const data = { ...req.body };
  const base = slugify(data.title);
  const existing = await prisma.program.findUnique({ where: { slug: base } });
  data.slug = existing ? `${base}-${Date.now().toString(36).slice(-4)}` : base;

  const program = await prisma.program.create({ data });
  if (req.admin) {
    await prisma.activityLog.create({
      data: { adminId: req.admin.id, action: 'CREATE', entityType: 'program', entityId: program.id, metadata: JSON.stringify({ title: program.title }) },
    });
  }
  res.status(201).json({ success: true, data: program });
}));

// PUT /api/programs/:id - Admin
router.put('/:id', authenticate, validate(programUpdateSchema), asyncHandler(async (req: AuthRequest, res) => {
  const { id } = req.params;
  const existing = await prisma.program.findUnique({ where: { id } });
  if (!existing) return res.status(404).json({ success: false, error: 'Program not found' });

  const program = await prisma.program.update({ where: { id }, data: req.body });
  if (req.admin) {
    await prisma.activityLog.create({
      data: { adminId: req.admin.id, action: 'UPDATE', entityType: 'program', entityId: program.id },
    });
  }
  res.json({ success: true, data: program });
}));

// DELETE /api/programs/:id - Admin
router.delete('/:id', authenticate, asyncHandler(async (req: AuthRequest, res) => {
  const { id } = req.params;
  const existing = await prisma.program.findUnique({ where: { id } });
  if (!existing) return res.status(404).json({ success: false, error: 'Program not found' });

  await prisma.program.delete({ where: { id } });
  if (req.admin) {
    await prisma.activityLog.create({
      data: { adminId: req.admin.id, action: 'DELETE', entityType: 'program', entityId: id, metadata: JSON.stringify({ title: existing.title }) },
    });
  }
  res.json({ success: true, message: 'Program deleted successfully' });
}));

export { router as programRoutes };
