"use client";

import { useFieldArray, useForm } from "react-hook-form";
import { usePatientDraftStore } from "../stores/usePatientDraftStore";
import { draftSchemaStepTwo, StepTwo } from "./patientDraftSchemas";
import { zodResolver } from "@hookform/resolvers/zod";

export default function PatientFormStep2() {
  const { draft, prevStep, updateDraft, resetDraft } = usePatientDraftStore();

  const {
    control,
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<StepTwo>({
    resolver: zodResolver(draftSchemaStepTwo),
    defaultValues: {
      medicalNotes: draft.medicalNotes.length > 0 ? draft.medicalNotes : [""],
    },
  });
  const handlePrev = () => {
    const currentValues = getValues();
    updateDraft(currentValues);

    prevStep();
  };
  const { fields, append, remove } = useFieldArray({
    control,
    // @ts-expect-error fieldArray with primitive values
    name: "medicalNotes",
  });

  const onSubmit = (data: StepTwo) => {
    updateDraft(data);

    const fullPatientData = {
      ...draft,
      ...data,
    };

    console.log("Submit Complete Patient Data:", fullPatientData);
    alert("تم حفظ بيانات المريض بنجاح!");

    resetDraft();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="block text-sm font-medium">الملاحظات الطبية</label>
          <button
            type="button"
            onClick={() => append("")}
            className="text-xs bg-blue-50 text-blue-600 px-3 py-1 rounded-md font-semibold hover:bg-blue-100 transition"
          >
            + إضافة ملاحظة
          </button>
        </div>

        <div className="space-y-2">
          {fields.map((field, index) => (
            <div key={field.id} className="flex items-center gap-2">
              <input
                type="text"
                {...register(`medicalNotes.${index}` as const)}
                placeholder="مثال: حساسية من البنسلين (10 أحرف على الأقل)"
                className="flex-1 p-2.5 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500"
              />
              {fields.length > 1 && (
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="text-red-500 hover:text-red-700 text-sm font-bold px-2 py-1"
                >
                  ✕
                </button>
              )}
            </div>
          ))}
        </div>

        {errors.medicalNotes && (
          <p className="text-xs text-red-500 mt-1">
            {errors.medicalNotes.message || "تأكد من إدخال 10 أحرف لكل ملاحظة"}
          </p>
        )}
      </div>

      <div className="pt-4 flex justify-between">
        <button
          type="button"
          onClick={handlePrev}
          className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-5 py-2 rounded-lg text-sm font-medium transition"
        >
          السابق
        </button>

        <button
          type="submit"
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition"
        >
          حفظ المريض 💾
        </button>
      </div>
    </form>
  );
}
