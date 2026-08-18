"use client";

import { useForm } from "react-hook-form";
import { usePatientDraftStore } from "../stores/usePatientDraftStore";
import { draftSchemaStepOne, StepOne } from "./patientDraftSchemas";
import { zodResolver } from "@hookform/resolvers/zod";

export default function PatientFormStep1() {
  const { draft, updateDraft, nextStep } = usePatientDraftStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<StepOne>({
    resolver: zodResolver(draftSchemaStepOne),
    defaultValues: {
      fullName: draft.fullName,
      phone: draft.phone,
    },
  });

  const onSubmit = (data: StepOne) => {
    updateDraft(data);
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">اسم المريض</label>
        <input
          type="text"
          {...register("fullName")}
          placeholder="أدخل الاسم الثلاثي"
          className="w-full p-2.5 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.fullName && (
          <p className="text-xs text-red-500 mt-1">{errors.fullName.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">رقم الهاتف</label>
        <input
          type="text"
          {...register("phone")}
          placeholder="01012345678"
          className="w-full p-2.5 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.phone && (
          <p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>
        )}
      </div>

      <div className="pt-2 flex justify-end">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm font-medium transition"
        >
          التالي ➔
        </button>
      </div>
    </form>
  );
}
