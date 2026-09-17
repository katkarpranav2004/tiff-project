import path from 'path';
import dotenv from 'dotenv';

// Load environment variables BEFORE any other module reads process.env.
// Imported first in index.ts so storage/auth/etc. see the values at import time.
// In production (Render) the platform injects env vars; the missing file is a no-op.
dotenv.config({ path: path.resolve(__dirname, '../../.env') });
