import { z } from "zod";

export const Form1Schema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name is too long"),

  age: z
    .string()
    .regex(/^\d+$/, { error: "Age must be a whole number" })
    .refine(
      (val) => {
        const num = parseInt(val, 10);
        return num >= 18 && num <= 90;
      },
      { message: "Must be between 18 and 90 years old" },
    ),

  email: z.email({ error: "Invalid email address" }),

  phone: z.string().regex(/^(98|97)\d{8}$/, "Enter valid Nepali phone number"),

  profileImg: z.string("Profile image is required"),
  bio: z
    .string()
    .min(2, "bio must be at least 2 characters")
    .max(150, "bio is should be short than 150 characters"),
});

export type Form1DataType = z.infer<typeof Form1Schema>;
