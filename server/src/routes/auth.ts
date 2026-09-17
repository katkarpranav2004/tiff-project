import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import rateLimit from 'express-rate-limit';
import prisma from '../lib/prisma';
import { authenticate, generateAccessToken, generateRefreshToken, JWT_REFRESH_SECRET, AuthRequest } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { loginSchema } from '../validators/schemas';
import { asyncHandler } from '../middleware/errorHandler';

const router = Router();

// Rate limit login attempts
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  message: { success: false, error: 'Too many login attempts. Please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// POST /api/auth/login
router.post('/login', loginLimiter, validate(loginSchema), asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const admin = await prisma.admin.findUnique({ where: { email } });

  if (!admin) {
    return res.status(401).json({ success: false, error: 'Invalid email or password' });
  }

  const isPasswordValid = await bcrypt.compare(password, admin.password);

  if (!isPasswordValid) {
    return res.status(401).json({ success: false, error: 'Invalid email or password' });
  }

  const accessToken = generateAccessToken({ id: admin.id, email: admin.email });
  const refreshToken = generateRefreshToken({ id: admin.id, email: admin.email });

  // Set refresh token as HTTP-only cookie
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  // Log activity
  await prisma.activityLog.create({
    data: {
      adminId: admin.id,
      action: 'LOGIN',
      entityType: 'admin',
      entityId: admin.id,
    },
  });

  res.json({
    success: true,
    data: {
      accessToken,
      admin: {
        id: admin.id,
        email: admin.email,
        name: admin.name,
        role: admin.role,
      },
    },
  });
}));

// POST /api/auth/refresh
router.post('/refresh', asyncHandler(async (req, res) => {
  const refreshToken = req.cookies?.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({ success: false, error: 'No refresh token' });
  }

  try {
    const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET) as { id: string; email: string };

    const admin = await prisma.admin.findUnique({ where: { id: decoded.id } });

    if (!admin) {
      return res.status(401).json({ success: false, error: 'Admin not found' });
    }

    const newAccessToken = generateAccessToken({ id: admin.id, email: admin.email });

    res.json({
      success: true,
      data: { accessToken: newAccessToken },
    });
  } catch {
    res.clearCookie('refreshToken');
    return res.status(401).json({ success: false, error: 'Invalid refresh token' });
  }
}));

// POST /api/auth/logout
router.post('/logout', authenticate, asyncHandler(async (req: AuthRequest, res) => {
  if (req.admin) {
    await prisma.activityLog.create({
      data: {
        adminId: req.admin.id,
        action: 'LOGOUT',
        entityType: 'admin',
        entityId: req.admin.id,
      },
    });
  }

  res.clearCookie('refreshToken');
  res.json({ success: true, message: 'Logged out successfully' });
}));

// GET /api/auth/me
router.get('/me', authenticate, asyncHandler(async (req: AuthRequest, res) => {
  res.json({
    success: true,
    data: req.admin,
  });
}));

export { router as authRoutes };
