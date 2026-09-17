import './loadEnv'; // must be first — populates process.env before other imports read it

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import cookieParser from 'cookie-parser';
import path from 'path';

import { errorHandler } from './middleware/errorHandler';
import { authRoutes } from './routes/auth';
import { courseRoutes } from './routes/courses';
import { certificateRoutes } from './routes/certificates';
import { eventRoutes } from './routes/events';
import { incubateeRoutes } from './routes/incubatees';
import { reportRoutes } from './routes/reports';
import { programRoutes } from './routes/programs';
import { mentorRoutes } from './routes/mentors';
import { faqRoutes } from './routes/faqs';
import { boardMemberRoutes } from './routes/boardMembers';
import { contactRoutes } from './routes/contact';
import { dashboardRoutes } from './routes/dashboard';
import { uploadRoutes } from './routes/upload';

const app = express();
// Hosts like Render inject PORT; fall back to SERVER_PORT then 5000 for local.
const PORT = process.env.PORT || process.env.SERVER_PORT || 5000;

// Behind Render/Vercel/Cloud proxies: trust the first proxy so secure cookies
// and per-IP rate limiting see the real client IP and protocol.
app.set('trust proxy', 1);

// Security middleware (helmet adds HSTS, no-sniff, frameguard, etc.)
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' },
  hsts: { maxAge: 15552000, includeSubDomains: true },
}));

// Allow one or more comma-separated origins via CLIENT_URL.
const allowedOrigins = (process.env.CLIENT_URL || 'http://localhost:5173')
  .split(',')
  .map((o) => o.trim())
  .filter(Boolean);

app.use(cors({
  origin: (origin, cb) => {
    // Allow same-origin / server-to-server (no Origin header) and listed origins.
    if (!origin || allowedOrigins.includes(origin)) return cb(null, true);
    return cb(new Error(`Origin ${origin} not allowed by CORS`));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(cookieParser());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Global rate limit across the API (login has its own stricter limiter).
app.use('/api', rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, error: 'Too many requests. Please try again later.' },
}));

// Serve uploaded files securely
app.use('/uploads', express.static(path.resolve(__dirname, '../../uploads'), {
  dotfiles: 'deny',
  index: false,
}));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/certificates', certificateRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/incubatees', incubateeRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/programs', programRoutes);
app.use('/api/mentors', mentorRoutes);
app.use('/api/faqs', faqRoutes);
app.use('/api/board-members', boardMemberRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/upload', uploadRoutes);

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Error handling
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 TISS Incube Server running on port ${PORT}`);
});

export default app;
