import { Router } from 'express';
import prisma from '../lib/prisma';
import { authenticate, AuthRequest } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { mentorCreateSchema, mentorUpdateSchema } from '../validators/schemas';
import { asyncHandler } from '../middleware/errorHandler';

const router = Router();

// GET /api/mentors - Public
router.get('/', asyncHandler(async (_req, res) => {
  const mentors = await prisma.mentor.findMany({
    orderBy: { createdAt: 'desc' },
  });
  res.json({ success: true, data: mentors });
}));

// POST /api/mentors - Admin
router.post('/', authenticate, validate(mentorCreateSchema), asyncHandler(async (req: AuthRequest, res) => {
  const mentor = await prisma.mentor.create({ data: req.body });
  if (req.admin) {
    await prisma.activityLog.create({
      data: { adminId: req.admin.id, action: 'CREATE', entityType: 'mentor', entityId: mentor.id, metadata: JSON.stringify({ name: mentor.name }) },
    });
  }
  res.status(201).json({ success: true, data: mentor });
}));

// PUT /api/mentors/:id - Admin
router.put('/:id', authenticate, validate(mentorUpdateSchema), asyncHandler(async (req: AuthRequest, res) => {
  const { id } = req.params;
  const existing = await prisma.mentor.findUnique({ where: { id } });
  if (!existing) return res.status(404).json({ success: false, error: 'Mentor not found' });
  
  const mentor = await prisma.mentor.update({ where: { id }, data: req.body });
  if (req.admin) {
    await prisma.activityLog.create({
      data: { adminId: req.admin.id, action: 'UPDATE', entityType: 'mentor', entityId: mentor.id },
    });
  }
  res.json({ success: true, data: mentor });
}));

// DELETE /api/mentors/:id - Admin
router.delete('/:id', authenticate, asyncHandler(async (req: AuthRequest, res) => {
  const { id } = req.params;
  const existing = await prisma.mentor.findUnique({ where: { id } });
  if (!existing) return res.status(404).json({ success: false, error: 'Mentor not found' });
  
  await prisma.mentor.delete({ where: { id } });
  if (req.admin) {
    await prisma.activityLog.create({
      data: { adminId: req.admin.id, action: 'DELETE', entityType: 'mentor', entityId: id, metadata: JSON.stringify({ name: existing.name }) },
    });
  }
  res.json({ success: true, message: 'Mentor deleted successfully' });
}));

export { router as mentorRoutes };
