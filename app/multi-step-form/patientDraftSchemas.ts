import z from "zod";

export const draftSchemaStepOne = z.object({
  fullName: z.string().min(3, "at least 3 characters"),
  phone: z.string().regex(/^01[0125][0-9]{8}$/, "Invalid eg number"),
});
