import { Router } from 'express';
import prisma from '../lib/prisma';
import { authenticate, AuthRequest } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { courseCreateSchema, courseUpdateSchema } from '../validators/schemas';
import { asyncHandler } from '../middleware/errorHandler';
import { slugify, paginationParams } from '../utils/helpers';

const router = Router();

// GET /api/courses — Public: get published courses
router.get('/', asyncHandler(async (req, res) => {
  const { page, limit, skip } = paginationParams(req.query as any);
  const { category, level, search, sort } = req.query;

  const where: any = { isPublished: true };

  if (category && typeof category === 'string') {
    where.category = category;
  }
  if (level && typeof level === 'string') {
    where.level = level;
  }
  if (search && typeof search === 'string') {
    where.OR = [
      { title: { contains: search } },
      { shortDescription: { contains: search } },
      { category: { contains: search } },
    ];
  }

  const orderBy: any = {};
  if (sort === 'title') orderBy.title = 'asc';
  else if (sort === 'oldest') orderBy.createdAt = 'asc';
  else orderBy.createdAt = 'desc';

  const [courses, total] = await Promise.all([
    prisma.course.findMany({
      where,
      orderBy,
      skip,
      take: limit,
    }),
    prisma.course.count({ where }),
  ]);

  res.json({
    success: true,
    data: courses,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  });
}));

// GET /api/courses/categories — Public: get unique categories
router.get('/categories', asyncHandler(async (_req, res) => {
  const categories = await prisma.course.findMany({
    where: { isPublished: true },
    select: { category: true },
    distinct: ['category'],
    orderBy: { category: 'asc' },
  });

  res.json({
    success: true,
    data: categories.map((c) => c.category),
  });
}));

// GET /api/courses/all — Admin: get all courses
router.get('/all', authenticate, asyncHandler(async (req, res) => {
  const { page, limit, skip } = paginationParams(req.query as any);
  const { search } = req.query;

  const where: any = {};
  if (search && typeof search === 'string') {
    where.OR = [
      { title: { contains: search } },
      { category: { contains: search } },
    ];
  }

  const [courses, total] = await Promise.all([
    prisma.course.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
    }),
    prisma.course.count({ where }),
  ]);

  res.json({
    success: true,
    data: courses,
    pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
  });
}));

// GET /api/courses/:slug — Public: get course by slug
router.get('/:slug', asyncHandler(async (req, res) => {
  const course = await prisma.course.findUnique({
    where: { slug: req.params.slug },
  });

  if (!course) {
    return res.status(404).json({ success: false, error: 'Course not found' });
  }

  if (!course.isPublished) {
    return res.status(404).json({ success: false, error: 'Course not found' });
  }

  res.json({ success: true, data: course });
}));

// POST /api/courses — Admin: create course
router.post('/', authenticate, validate(courseCreateSchema), asyncHandler(async (req: AuthRequest, res) => {
  const data = req.body;
  const slug = slugify(data.title);

  // Check slug uniqueness
  const existing = await prisma.course.findUnique({ where: { slug } });
  if (existing) {
    data.slug = `${slug}-${Date.now().toString(36).slice(-4)}`;
  } else {
    data.slug = slug;
  }

  const course = await prisma.course.create({ data });

  // Log activity
  if (req.admin) {
    await prisma.activityLog.create({
      data: {
        adminId: req.admin.id,
        action: 'CREATE',
        entityType: 'course',
        entityId: course.id,
        metadata: JSON.stringify({ title: course.title }),
      },
    });
  }

  res.status(201).json({ success: true, data: course });
}));

// PUT /api/courses/:id — Admin: update course
router.put('/:id', authenticate, validate(courseUpdateSchema), asyncHandler(async (req: AuthRequest, res) => {
  const { id } = req.params;
  const data = req.body;

  const existing = await prisma.course.findUnique({ where: { id } });
  if (!existing) {
    return res.status(404).json({ success: false, error: 'Course not found' });
  }

  // If title changed, update slug
  if (data.title && data.title !== existing.title) {
    const newSlug = slugify(data.title);
    const slugExists = await prisma.course.findFirst({
      where: { slug: newSlug, id: { not: id } },
    });
    data.slug = slugExists ? `${newSlug}-${Date.now().toString(36).slice(-4)}` : newSlug;
  }

  const course = await prisma.course.update({ where: { id }, data });

  if (req.admin) {
    await prisma.activityLog.create({
      data: {
        adminId: req.admin.id,
        action: 'UPDATE',
        entityType: 'course',
        entityId: course.id,
        metadata: JSON.stringify({ title: course.title }),
      },
    });
  }

  res.json({ success: true, data: course });
}));

// DELETE /api/courses/:id — Admin: delete course
router.delete('/:id', authenticate, asyncHandler(async (req: AuthRequest, res) => {
  const { id } = req.params;

  const existing = await prisma.course.findUnique({ where: { id } });
  if (!existing) {
    return res.status(404).json({ success: false, error: 'Course not found' });
  }

  await prisma.course.delete({ where: { id } });

  if (req.admin) {
    await prisma.activityLog.create({
      data: {
        adminId: req.admin.id,
        action: 'DELETE',
        entityType: 'course',
        entityId: id,
        metadata: JSON.stringify({ title: existing.title }),
      },
    });
  }

  res.json({ success: true, message: 'Course deleted successfully' });
}));

export { router as courseRoutes };
