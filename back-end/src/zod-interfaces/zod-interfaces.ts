import { z } from "zod";

const UserSchema = z.object({
  firstName: z.string().min(2).max(20),
  lastName: z.string().min(2).max(20),
  username: z.string().min(3).max(16),
  email: z.string().email().min(6).max(30),
  image: z.string(),
  password: z.string().min(6).max(20),
});

const UserCredentialSchema = z.object({
  username: z.string(),
  password: z.string(),
});

const RentPostSchema = z.object({
  heading: z.string().min(5).max(20),
  description: z.string().min(10).max(50),
  rent: z.number().min(0),
  bed: z.number().int().min(1),
  bath: z.number().int().min(1),
  size: z.number().int().min(1),
  image: z.string(),
});

export { UserSchema, UserCredentialSchema, RentPostSchema };
