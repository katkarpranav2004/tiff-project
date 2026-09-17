import { Router } from 'express';
import prisma from '../lib/prisma';
import { authenticate } from '../middleware/auth';
import { asyncHandler } from '../middleware/errorHandler';

const router = Router();

// GET /api/dashboard/stats - Admin
router.get('/stats', authenticate, asyncHandler(async (_req, res) => {
  const [
    totalCourses,
    publishedCourses,
    totalCertificates,
    totalEvents,
    totalIncubatees,
    totalReports,
    recentActivity,
  ] = await Promise.all([
    prisma.course.count(),
    prisma.course.count({ where: { isPublished: true } }),
    prisma.certificate.count(),
    prisma.event.count(),
    prisma.incubatee.count(),
    prisma.report.count(),
    prisma.activityLog.findMany({
      take: 10,
      orderBy: { createdAt: 'desc' },
      include: { admin: { select: { name: true } } },
    }),
  ]);

  res.json({
    success: true,
    data: {
      stats: {
        totalCourses,
        publishedCourses,
        totalCertificates,
        totalEvents,
        totalIncubatees,
        totalReports,
      },
      recentActivity,
    },
  });
}));

export { router as dashboardRoutes };
