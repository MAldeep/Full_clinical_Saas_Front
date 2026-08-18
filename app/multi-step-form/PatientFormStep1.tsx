"use client";

import { useForm } from "react-hook-form";
import { usePatientDraftStore } from "../stores/usePatientDraftStore";
import { draftSchemaStepOne, StepOne } from "./patientDraftSchemas";
import { zodResolver } from "@hookform/resolvers/zod";

export default function PatientFormStep1() {
  const { updateDraft, nextStep } = usePatientDraftStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<StepOne>({
    resolver: zodResolver(draftSchemaStepOne),
    defaultValues: {
      fullName: "",
      phone: "",
    },
  });
  const onSubmit = (data: StepOne) => {
    updateDraft(data);
    nextStep();
  };
  return <form onSubmit={handleSubmit(onSubmit)}></form>;
}
