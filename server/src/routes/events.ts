import { Router } from 'express';
import prisma from '../lib/prisma';
import { authenticate, AuthRequest } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { eventCreateSchema, eventUpdateSchema } from '../validators/schemas';
import { asyncHandler } from '../middleware/errorHandler';
import { slugify, paginationParams } from '../utils/helpers';

const router = Router();

// GET /api/events - Public: get published events
router.get('/', asyncHandler(async (req, res) => {
  const { page, limit, skip } = paginationParams(req.query as any);
  
  const where = { isPublished: true };

  const [events, total] = await Promise.all([
    prisma.event.findMany({
      where,
      orderBy: { date: 'asc' }, // Upcoming first
      skip,
      take: limit,
    }),
    prisma.event.count({ where }),
  ]);

  res.json({
    success: true,
    data: events,
    pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
  });
}));

// GET /api/events/all - Admin: get all events
router.get('/all', authenticate, asyncHandler(async (req, res) => {
  const { page, limit, skip } = paginationParams(req.query as any);
  const { search } = req.query;

  const where: any = {};
  if (search && typeof search === 'string') {
    where.OR = [
      { title: { contains: search } },
      { location: { contains: search } },
    ];
  }

  const [events, total] = await Promise.all([
    prisma.event.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
    }),
    prisma.event.count({ where }),
  ]);

  res.json({
    success: true,
    data: events,
    pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
  });
}));

// GET /api/events/:slug - Public: get event by slug
router.get('/:slug', asyncHandler(async (req, res) => {
  const event = await prisma.event.findUnique({
    where: { slug: req.params.slug },
  });

  if (!event || !event.isPublished) {
    return res.status(404).json({ success: false, error: 'Event not found' });
  }

  res.json({ success: true, data: event });
}));

// POST /api/events - Admin: create event
router.post('/', authenticate, validate(eventCreateSchema), asyncHandler(async (req: AuthRequest, res) => {
  const data = req.body;
  const slug = slugify(data.title);

  const existing = await prisma.event.findUnique({ where: { slug } });
  data.slug = existing ? `${slug}-${Date.now().toString(36).slice(-4)}` : slug;
  data.date = new Date(data.date);

  const event = await prisma.event.create({ data });

  if (req.admin) {
    await prisma.activityLog.create({
      data: {
        adminId: req.admin.id,
        action: 'CREATE',
        entityType: 'event',
        entityId: event.id,
        metadata: JSON.stringify({ title: event.title }),
      },
    });
  }

  res.status(201).json({ success: true, data: event });
}));

// PUT /api/events/:id - Admin: update event
router.put('/:id', authenticate, validate(eventUpdateSchema), asyncHandler(async (req: AuthRequest, res) => {
  const { id } = req.params;
  const data = req.body;

  const existing = await prisma.event.findUnique({ where: { id } });
  if (!existing) {
    return res.status(404).json({ success: false, error: 'Event not found' });
  }

  if (data.title && data.title !== existing.title) {
    const newSlug = slugify(data.title);
    const slugExists = await prisma.event.findFirst({
      where: { slug: newSlug, id: { not: id } },
    });
    data.slug = slugExists ? `${newSlug}-${Date.now().toString(36).slice(-4)}` : newSlug;
  }
  
  if (data.date) {
    data.date = new Date(data.date);
  }

  const event = await prisma.event.update({ where: { id }, data });

  if (req.admin) {
    await prisma.activityLog.create({
      data: {
        adminId: req.admin.id,
        action: 'UPDATE',
        entityType: 'event',
        entityId: event.id,
        metadata: JSON.stringify({ title: event.title }),
      },
    });
  }

  res.json({ success: true, data: event });
}));

// DELETE /api/events/:id - Admin: delete event
router.delete('/:id', authenticate, asyncHandler(async (req: AuthRequest, res) => {
  const { id } = req.params;

  const existing = await prisma.event.findUnique({ where: { id } });
  if (!existing) {
    return res.status(404).json({ success: false, error: 'Event not found' });
  }

  await prisma.event.delete({ where: { id } });

  if (req.admin) {
    await prisma.activityLog.create({
      data: {
        adminId: req.admin.id,
        action: 'DELETE',
        entityType: 'event',
        entityId: id,
        metadata: JSON.stringify({ title: existing.title }),
      },
    });
  }

  res.json({ success: true, message: 'Event deleted successfully' });
}));

export { router as eventRoutes };
