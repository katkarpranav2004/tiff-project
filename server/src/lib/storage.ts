import path from 'path';
import fs from 'fs/promises';
import crypto from 'crypto';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

/**
 * File storage abstraction.
 *
 * Production: when SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY are set, files are
 * uploaded to a Supabase Storage bucket and a public URL is returned. This
 * survives redeploys (Render/Vercel have ephemeral disks).
 *
 * Development: with no Supabase env, files are written to the local uploads
 * directory and served from SERVER_URL/uploads/<name>.
 */

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const BUCKET = process.env.SUPABASE_BUCKET || 'uploads';

export const usingSupabase = Boolean(SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY);

let supabase: SupabaseClient | null = null;
if (usingSupabase) {
  supabase = createClient(SUPABASE_URL as string, SUPABASE_SERVICE_ROLE_KEY as string, {
    auth: { persistSession: false },
  });
}

function safeName(originalname: string): string {
  const ext = path.extname(originalname).toLowerCase();
  const base = path
    .basename(originalname, ext)
    .replace(/[^a-zA-Z0-9_-]/g, '_')
    .substring(0, 100);
  const suffix = crypto.randomBytes(8).toString('hex');
  return `${base}_${suffix}${ext}`;
}

/**
 * Store a file buffer and return a public URL to it.
 */
export async function putFile(
  buffer: Buffer,
  originalname: string,
  mimetype: string
): Promise<string> {
  const filename = safeName(originalname);

  if (usingSupabase && supabase) {
    const { error } = await supabase.storage.from(BUCKET).upload(filename, buffer, {
      contentType: mimetype,
      upsert: false,
    });
    if (error) throw new Error(`Storage upload failed: ${error.message}`);
    const { data } = supabase.storage.from(BUCKET).getPublicUrl(filename);
    return data.publicUrl;
  }

  // Local fallback.
  const uploadDir = process.env.UPLOAD_DIR || path.resolve(__dirname, '../../../uploads');
  await fs.mkdir(uploadDir, { recursive: true });
  await fs.writeFile(path.join(uploadDir, filename), buffer);
  const serverUrl = process.env.SERVER_URL || 'http://localhost:5000';
  return `${serverUrl}/uploads/${filename}`;
}
