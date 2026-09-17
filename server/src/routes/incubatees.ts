import { Router } from 'express';
import prisma from '../lib/prisma';
import { authenticate, AuthRequest } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { incubateeCreateSchema, incubateeUpdateSchema } from '../validators/schemas';
import { asyncHandler } from '../middleware/errorHandler';

const router = Router();

// GET /api/incubatees - Public
router.get('/', asyncHandler(async (req, res) => {
  const { sector } = req.query;

  const where: any = {};
  if (sector && typeof sector === 'string') {
    where.sector = sector;
  }

  const incubatees = await prisma.incubatee.findMany({
    where,
    orderBy: [{ featured: 'desc' }, { createdAt: 'desc' }],
  });

  res.json({ success: true, data: incubatees });
}));

// POST /api/incubatees - Admin
router.post('/', authenticate, validate(incubateeCreateSchema), asyncHandler(async (req: AuthRequest, res) => {
  const incubatee = await prisma.incubatee.create({ data: req.body });

  if (req.admin) {
    await prisma.activityLog.create({
      data: {
        adminId: req.admin.id,
        action: 'CREATE',
        entityType: 'incubatee',
        entityId: incubatee.id,
        metadata: JSON.stringify({ name: incubatee.name }),
      },
    });
  }

  res.status(201).json({ success: true, data: incubatee });
}));

// PUT /api/incubatees/:id - Admin
router.put('/:id', authenticate, validate(incubateeUpdateSchema), asyncHandler(async (req: AuthRequest, res) => {
  const { id } = req.params;

  const existing = await prisma.incubatee.findUnique({ where: { id } });
  if (!existing) {
    return res.status(404).json({ success: false, error: 'Incubatee not found' });
  }

  const incubatee = await prisma.incubatee.update({ where: { id }, data: req.body });

  if (req.admin) {
    await prisma.activityLog.create({
      data: {
        adminId: req.admin.id,
        action: 'UPDATE',
        entityType: 'incubatee',
        entityId: incubatee.id,
      },
    });
  }

  res.json({ success: true, data: incubatee });
}));

// DELETE /api/incubatees/:id - Admin
router.delete('/:id', authenticate, asyncHandler(async (req: AuthRequest, res) => {
  const { id } = req.params;

  const existing = await prisma.incubatee.findUnique({ where: { id } });
  if (!existing) {
    return res.status(404).json({ success: false, error: 'Incubatee not found' });
  }

  await prisma.incubatee.delete({ where: { id } });

  if (req.admin) {
    await prisma.activityLog.create({
      data: {
        adminId: req.admin.id,
        action: 'DELETE',
        entityType: 'incubatee',
        entityId: id,
        metadata: JSON.stringify({ name: existing.name }),
      },
    });
  }

  res.json({ success: true, message: 'Incubatee deleted successfully' });
}));

export { router as incubateeRoutes };
