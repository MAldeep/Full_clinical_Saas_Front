"use client";

import { useFieldArray, useForm } from "react-hook-form";
import { usePatientDraftStore } from "../stores/usePatientDraftStore";
import { draftSchemaStepTwo, StepTwo } from "./patientDraftSchemas";
import { zodResolver } from "@hookform/resolvers/zod";

export default function PatientFormStep2() {
  const { draft, prevStep, updateDraft } = usePatientDraftStore();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<StepTwo>({
    resolver: zodResolver(draftSchemaStepTwo),
    defaultValues: {
      medicalNotes: [] as StepTwo["medicalNotes"],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "medicalNotes",
  });
  return <div></div>;
}
