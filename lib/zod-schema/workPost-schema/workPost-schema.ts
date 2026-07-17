import { z } from "zod";

export const workPostSchema = z.object({
  title: z
    .string()
    .min(2, "title must be at least 2 characters")
    .max(50, "title is too long"),

  subTitle: z
    .string()
    .min(2, "subtitle must be at least 2 characters")
    .max(100, "subtitle is too long"),

  category: z.array(
    z.object({
      value: z.string("Cant Leave Field Empty"),
      label: z.string("Cant Leave Field Empty"),
    }),
  ),

  workImg: z
    .array(
      z.object({
        imgSrc: z.string("Cant Leave Field Empty"),
        public_id: z.string("Cant Leave Field Empty"),
      }),
    )
    .optional(),

  rate: z.string().regex(/^\d+$/, { error: "rate must be a whole number" }),

  rateType: z.enum(["per Hour", "per Task", "per Day"]),

  expectedTime: z.enum([
    "within 1-3 hour",
    "within half a day",
    "about a day",
    "within 1-3 days",
    "within a week",
  ]),
  finalDeliverable: z
    .string()
    .min(2, "title must be at least 2 characters")
    .max(250, "title is too long"),

  status: z.enum(["ACTIVE", "PENDING", "ENDED"]),
});

export type workPostDataType = z.infer<typeof workPostSchema>;
