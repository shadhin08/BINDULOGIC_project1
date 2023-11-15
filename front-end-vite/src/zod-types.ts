import { z } from 'zod';

const UserSchema = z
  .object({
    firstName: z.string(),
    lastName: z.string(),
    username: z.string(),
    email: z.string().email(),
    image: z.string(),
    password: z.string(),
  })
  .strict();

const RentPostSchema = z
  .object({
    heading: z.string(),
    description: z.string(),
    rent: z.number(),
    bed: z.number().int().min(1),
    bath: z.number().int().min(1),
    size: z.number(),
    image: z.string(),
    rentAreaName: z.string(),
  })
  .strict();

const UserCredentialsSchema = z.object({
  username: z.string(),
  password: z.string(),
});
export { UserSchema, RentPostSchema, UserCredentialsSchema };
