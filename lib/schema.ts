import { z } from "zod";

export const userSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(4, "Password must be at least 4 characters"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  avatar: z.string().url("Invalid URL").optional().or(z.literal("")),
});

export type UserFormData = z.infer<typeof userSchema>;
