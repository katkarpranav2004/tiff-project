import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import prisma from '../lib/prisma';

/**
 * JWT secrets are read once at startup. In production they MUST be set —
 * we never fall back to a hardcoded secret there. In development a clearly
 * labelled dev-only fallback keeps local setup friction-free.
 */
const isProd = process.env.NODE_ENV === 'production';

function requireSecret(name: 'JWT_SECRET' | 'JWT_REFRESH_SECRET', devFallback: string): string {
  const value = process.env[name];
  if (value) return value;
  if (isProd) {
    throw new Error(`${name} is not set. Refusing to start in production without it.`);
  }
  // eslint-disable-next-line no-console
  console.warn(`⚠️  ${name} not set — using an insecure development fallback. Do NOT use in production.`);
  return devFallback;
}

const JWT_SECRET = requireSecret('JWT_SECRET', 'dev-only-access-secret');
export const JWT_REFRESH_SECRET = requireSecret('JWT_REFRESH_SECRET', 'dev-only-refresh-secret');

export interface AuthRequest extends Request {
  admin?: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
}

export const authenticate = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, error: 'Unauthorized: No token provided' });
    }

    const token = authHeader.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ success: false, error: 'Unauthorized: Invalid token format' });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as {
      id: string;
      email: string;
    };

    const admin = await prisma.admin.findUnique({
      where: { id: decoded.id },
      select: { id: true, email: true, name: true, role: true },
    });

    if (!admin) {
      return res.status(401).json({ success: false, error: 'Unauthorized: Admin not found' });
    }

    req.admin = admin;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ success: false, error: 'Session expired. Please login again.' });
    }
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ success: false, error: 'Invalid token.' });
    }
    return res.status(500).json({ success: false, error: 'Authentication failed' });
  }
};

export const generateAccessToken = (admin: { id: string; email: string }): string => {
  return jwt.sign({ id: admin.id, email: admin.email }, JWT_SECRET, { expiresIn: '15m' });
};

export const generateRefreshToken = (admin: { id: string; email: string }): string => {
  return jwt.sign({ id: admin.id, email: admin.email }, JWT_REFRESH_SECRET, { expiresIn: '7d' });
};
