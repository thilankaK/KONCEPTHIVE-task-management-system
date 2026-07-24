import { LogOut, X } from "lucide-react";

interface LogoutConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

function LogoutConfirmModal({
  isOpen,
  onClose,
  onConfirm,
}: LogoutConfirmModalProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
            aria-label="Close logout confirmation"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
            <LogOut className="h-8 w-8 text-red-600" />
          </div>

          <h2 className="mt-5 text-xl font-bold text-slate-900">
            Log out?
          </h2>

          <p className="mt-3 text-sm leading-6 text-slate-500">
            Are you sure you want to log out of your account?
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
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-600 py-3 font-semibold text-white transition hover:bg-red-700"
          >
            <LogOut className="h-5 w-5" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default LogoutConfirmModal;