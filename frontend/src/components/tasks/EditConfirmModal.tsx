import { Pencil, X } from "lucide-react";

import type { Task } from "../../types/task.types";

interface EditConfirmModalProps {
  task: Task | null;
  onClose: () => void;
  onConfirm: () => void;
}

function EditConfirmModal({
  task,
  onClose,
  onConfirm,
}: EditConfirmModalProps) {
  if (!task) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
            aria-label="Close edit confirmation"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
            <Pencil className="h-8 w-8 text-blue-600" />
          </div>

          <h2 className="mt-5 text-xl font-bold text-slate-900">
            Edit this task?
          </h2>

          <p className="mt-3 text-sm leading-6 text-slate-500">
            Do you want to edit{" "}
            <span className="font-semibold text-slate-700">
              “{task.title}”
            </span>
            ?
          </p>
        </div>

        <div className="mt-7 flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-xl border border-slate-200 py-3 font-semibold text-slate-600 transition hover:bg-slate-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            <Pencil className="h-5 w-5" />
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditConfirmModal;