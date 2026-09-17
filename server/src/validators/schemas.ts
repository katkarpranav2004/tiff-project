import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Valid email is required'),
  password: z.string().min(1, 'Password is required'),
});

export const courseCreateSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200),
  shortDescription: z.string().min(1, 'Short description is required').max(500),
  description: z.string().min(1, 'Description is required'),
  category: z.string().min(1, 'Category is required'),
  duration: z.string().optional(),
  level: z.string().optional(),
  instructorName: z.string().optional(),
  instructorBio: z.string().optional(),
  eligibility: z.string().optional(),
  learningOutcomes: z.string().optional(),
  syllabus: z.any().optional(),
  thumbnailUrl: z.string().optional(),
  brochureUrl: z.string().optional(),
  isPublished: z.boolean().optional(),
});

export const courseUpdateSchema = courseCreateSchema.partial();

export const certificateCreateSchema = z.object({
  caieNumber: z
    .string()
    .min(1, 'CAIE number is required')
    .regex(/^CAIE-[A-Z0-9]{4}-[A-Z0-9]{4}$/, 'CAIE number must follow format: CAIE-XXXX-XXXX'),
  candidateName: z.string().min(1, 'Candidate name is required').max(200),
  courseName: z.string().min(1, 'Course name is required').max(200),
  issueDate: z.string().min(1, 'Issue date is required'),
});

export const certificateUpdateSchema = certificateCreateSchema.partial();

export const eventCreateSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200),
  description: z.string().min(1, 'Description is required'),
  imageUrl: z.string().optional(),
  date: z.string().min(1, 'Date is required'),
  time: z.string().optional(),
  location: z.string().optional(),
  registrationUrl: z.string().url().optional().or(z.literal('')),
  isPublished: z.boolean().optional(),
});

export const eventUpdateSchema = eventCreateSchema.partial();

export const incubateeCreateSchema = z.object({
  name: z.string().min(1, 'Name is required').max(200),
  logo: z.string().optional(),
  founder: z.string().optional(),
  sector: z.string().optional(),
  description: z.string().optional(),
  website: z.string().url().optional().or(z.literal('')),
  featured: z.boolean().optional(),
});

export const incubateeUpdateSchema = incubateeCreateSchema.partial();

export const reportCreateSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  year: z.string().min(1, 'Year is required'),
  fileUrl: z.string().optional(),
  coverImageUrl: z.string().optional(),
});

export const mentorCreateSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  designation: z.string().optional(),
  organization: z.string().optional(),
  photo: z.string().optional(),
  bio: z.string().optional(),
  expertise: z.string().optional(),
  linkedin: z.string().url().optional().or(z.literal('')),
});

export const mentorUpdateSchema = mentorCreateSchema.partial();

export const faqCreateSchema = z.object({
  question: z.string().min(1, 'Question is required'),
  answer: z.string().min(1, 'Answer is required'),
  order: z.number().int().optional(),
  isPublished: z.boolean().optional(),
});

export const faqUpdateSchema = faqCreateSchema.partial();

export const boardMemberCreateSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  designation: z.string().min(1, 'Designation is required'),
  bio: z.string().optional(),
  imageUrl: z.string().optional(),
  order: z.number().int().optional(),
});

export const programCreateSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  icon: z.string().optional(),
  order: z.number().int().optional(),
  isPublished: z.boolean().optional(),
});

export const programUpdateSchema = programCreateSchema.partial();

export const boardMemberUpdateSchema = boardMemberCreateSchema.partial();

export const contactSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  email: z.string().email('Valid email is required'),
  subject: z.string().max(200).optional(),
  message: z.string().min(1, 'Message is required').max(2000),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type CourseCreateInput = z.infer<typeof courseCreateSchema>;
export type CertificateCreateInput = z.infer<typeof certificateCreateSchema>;
export type EventCreateInput = z.infer<typeof eventCreateSchema>;
export type IncubateeCreateInput = z.infer<typeof incubateeCreateSchema>;
export type ContactInput = z.infer<typeof contactSchema>;
