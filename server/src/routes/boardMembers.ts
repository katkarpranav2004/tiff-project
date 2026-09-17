import { Router } from 'express';
import prisma from '../lib/prisma';
import { authenticate, AuthRequest } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { boardMemberCreateSchema, boardMemberUpdateSchema } from '../validators/schemas';
import { asyncHandler } from '../middleware/errorHandler';

const router = Router();

// GET /api/board-members - Public
router.get('/', asyncHandler(async (_req, res) => {
  const boardMembers = await prisma.boardMember.findMany({
    orderBy: { order: 'asc' },
  });
  res.json({ success: true, data: boardMembers });
}));

// POST /api/board-members - Admin
router.post('/', authenticate, validate(boardMemberCreateSchema), asyncHandler(async (req: AuthRequest, res) => {
  const member = await prisma.boardMember.create({ data: req.body });
  if (req.admin) {
    await prisma.activityLog.create({
      data: { adminId: req.admin.id, action: 'CREATE', entityType: 'boardMember', entityId: member.id, metadata: JSON.stringify({ name: member.name }) },
    });
  }
  res.status(201).json({ success: true, data: member });
}));

// PUT /api/board-members/:id - Admin
router.put('/:id', authenticate, validate(boardMemberUpdateSchema), asyncHandler(async (req: AuthRequest, res) => {
  const { id } = req.params;
  const existing = await prisma.boardMember.findUnique({ where: { id } });
  if (!existing) return res.status(404).json({ success: false, error: 'Board member not found' });
  
  const member = await prisma.boardMember.update({ where: { id }, data: req.body });
  if (req.admin) {
    await prisma.activityLog.create({
      data: { adminId: req.admin.id, action: 'UPDATE', entityType: 'boardMember', entityId: member.id },
    });
  }
  res.json({ success: true, data: member });
}));

// DELETE /api/board-members/:id - Admin
router.delete('/:id', authenticate, asyncHandler(async (req: AuthRequest, res) => {
  const { id } = req.params;
  const existing = await prisma.boardMember.findUnique({ where: { id } });
  if (!existing) return res.status(404).json({ success: false, error: 'Board member not found' });
  
  await prisma.boardMember.delete({ where: { id } });
  if (req.admin) {
    await prisma.activityLog.create({
      data: { adminId: req.admin.id, action: 'DELETE', entityType: 'boardMember', entityId: id, metadata: JSON.stringify({ name: existing.name }) },
    });
  }
  res.json({ success: true, message: 'Board member deleted successfully' });
}));

export { router as boardMemberRoutes };
