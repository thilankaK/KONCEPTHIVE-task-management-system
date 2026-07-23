import { AlertTriangle, LoaderCircle, X } from "lucide-react";

import type { Task } from "../../types/task.types";

interface DeleteConfirmModalProps {
  task: Task | null;
  isDeleting: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
}

function DeleteConfirmModal({
  task,
  isDeleting,
  onClose,
  onConfirm,
}: DeleteConfirmModalProps) {
  if (!task) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
            <AlertTriangle className="h-8 w-8 text-red-600" />
          </div>

          <h2 className="mt-5 text-xl font-bold text-slate-900">
            Delete Task?
          </h2>

          <p className="mt-3 text-sm leading-6 text-slate-500">
            Are you sure you want to delete{" "}
            <span className="font-semibold text-slate-700">
              “{task.title}”
            </span>
            ? This action cannot be undone.
          </p>
        </div>

        <div className="mt-7 flex gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="flex-1 rounded-xl border border-slate-200 py-3 font-semibold text-slate-600 hover:bg-slate-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            className="flex flex-1 items-center justify-center rounded-xl bg-red-600 py-3 font-semibold text-white hover:bg-red-700 disabled:opacity-60"
          >
            {isDeleting ? (
              <>
                <LoaderCircle className="mr-2 h-5 w-5 animate-spin" />
                Deleting...
              </>
            ) : (
              "Delete Task"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmModal;