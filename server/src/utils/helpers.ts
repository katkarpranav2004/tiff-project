export const slugify = (text: string): string => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
};

export const generateSlug = (text: string): string => {
  const base = slugify(text);
  const suffix = Date.now().toString(36).slice(-4);
  return `${base}-${suffix}`;
};

export const paginationParams = (query: { page?: string; limit?: string }) => {
  const page = Math.max(1, parseInt(query.page || '1', 10));
  const limit = Math.min(50, Math.max(1, parseInt(query.limit || '12', 10)));
  const skip = (page - 1) * limit;
  return { page, limit, skip };
};

export const getFileUrl = (filename: string): string => {
  const serverUrl = process.env.SERVER_URL || 'http://localhost:5000';
  return `${serverUrl}/uploads/${filename}`;
};
