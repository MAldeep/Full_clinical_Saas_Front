"use client";

import { useSyncExternalStore } from "react";
import { usePatientDraftStore } from "../stores/usePatientDraftStore";
import PatientFormStep1 from "./PatientFormStep1";
import PatientFormStep2 from "./PatientFormStep2";

export default function PatientFormWrapper() {
  const { step, resetDraft } = usePatientDraftStore();
  const isMounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  if (!isMounted) return null;

  return (
    <div className="max-w-md mx-auto my-8 p-6 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center border-b pb-4">
        <div>
          <h2 className="text-lg font-bold text-slate-800">إضافة مريض جديد</h2>
          <p className="text-xs text-slate-500">الخطوة {step} من 2</p>
        </div>
        <button
          onClick={resetDraft}
          className="text-xs text-slate-400 hover:text-red-500 transition"
        >
          مسح المسودة
        </button>
      </div>

      {/* Progress Bar */}
      <div className="grid grid-cols-2 gap-2">
        <div
          className={`h-1.5 rounded-full transition-all ${
            step >= 1 ? "bg-blue-600" : "bg-slate-200"
          }`}
        />
        <div
          className={`h-1.5 rounded-full transition-all ${
            step >= 2 ? "bg-blue-600" : "bg-slate-200"
          }`}
        />
      </div>

      {/* Dynamic Steps Render */}
      {step === 1 && <PatientFormStep1 />}
      {step === 2 && <PatientFormStep2 />}
    </div>
  );
}
