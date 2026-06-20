import z from "zod";

export const Form2Schema = z.array(
  z.object({
    value: z.string("Cant Leave Field Empty"),
    label: z.string("Cant Leave Field Empty"),
    rate: z.string().regex(/^\d+$/, { error: "rate must be a whole number" }),
    rateType: z
      .string()

      .refine(
        (val) => {
          return val === "per Hour" || val === "per Task" || val === "per Day";
        },
        { message: "Option Must be one of the provided one" },
      ),
  }),
);

export type Form2DataType = z.infer<typeof Form2Schema>;
