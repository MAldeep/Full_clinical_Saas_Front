import z from "zod";

export const draftSchemaStepOne = z.object({
  fullName: z.string().min(3, "at least 3 characters"),
  phone: z.string().regex(/^01[0125][0-9]{8}$/, "Invalid eg number"),
});

export type StepOne = z.infer<typeof draftSchemaStepOne>;

export const draftSchemaStepTwo = z.object({
  medicalNotes: z
    .array(z.string().min(10))
    .min(1, "you must add at least 1 note"),
});
export type StepTwo = z.infer<typeof draftSchemaStepTwo>;
