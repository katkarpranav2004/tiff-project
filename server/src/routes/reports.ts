import { Router } from 'express';
import prisma from '../lib/prisma';
import { authenticate, AuthRequest } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { reportCreateSchema } from '../validators/schemas';
import { asyncHandler } from '../middleware/errorHandler';

const router = Router();

// GET /api/reports - Public
router.get('/', asyncHandler(async (_req, res) => {
  const reports = await prisma.report.findMany({
    orderBy: { year: 'desc' },
  });

  res.json({ success: true, data: reports });
}));

// POST /api/reports - Admin
router.post('/', authenticate, validate(reportCreateSchema), asyncHandler(async (req: AuthRequest, res) => {
  const report = await prisma.report.create({ data: req.body });

  if (req.admin) {
    await prisma.activityLog.create({
      data: {
        adminId: req.admin.id,
        action: 'CREATE',
        entityType: 'report',
        entityId: report.id,
        metadata: JSON.stringify({ title: report.title, year: report.year }),
      },
    });
  }

  res.status(201).json({ success: true, data: report });
}));

// DELETE /api/reports/:id - Admin
router.delete('/:id', authenticate, asyncHandler(async (req: AuthRequest, res) => {
  const { id } = req.params;

  const existing = await prisma.report.findUnique({ where: { id } });
  if (!existing) {
    return res.status(404).json({ success: false, error: 'Report not found' });
  }

  await prisma.report.delete({ where: { id } });

  if (req.admin) {
    await prisma.activityLog.create({
      data: {
        adminId: req.admin.id,
        action: 'DELETE',
        entityType: 'report',
        entityId: id,
        metadata: JSON.stringify({ title: existing.title }),
      },
    });
  }

  res.json({ success: true, message: 'Report deleted successfully' });
}));

export { router as reportRoutes };
