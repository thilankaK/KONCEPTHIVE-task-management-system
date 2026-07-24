import {
  Download,
  FileDown,
  FileSpreadsheet,
  LoaderCircle,
  Printer,
} from "lucide-react";

interface ReportExportButtonsProps {
  isExportingPdf: boolean;
  disabled: boolean;
  onExportPdf: () => void;
  onExportCsv: () => void;
  onExportExcel: () => void;
  onPrint: () => void;
}

function ReportExportButtons({
  isExportingPdf,
  disabled,
  onExportPdf,
  onExportCsv,
  onExportExcel,
  onPrint,
}: ReportExportButtonsProps) {
  const buttonClassName =
    "flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-50";

  return (
    <div className="flex flex-wrap gap-3">
      <button
        type="button"
        onClick={onExportPdf}
        disabled={
          disabled || isExportingPdf
        }
        className={buttonClassName}
      >
        {isExportingPdf ? (
          <LoaderCircle className="h-5 w-5 animate-spin" />
        ) : (
          <FileDown className="h-5 w-5" />
        )}

        PDF
      </button>

      <button
        type="button"
        onClick={onExportCsv}
        disabled={disabled}
        className={buttonClassName}
      >
        <Download className="h-5 w-5" />
        CSV
      </button>

      <button
        type="button"
        onClick={onExportExcel}
        disabled={disabled}
        className={buttonClassName}
      >
        <FileSpreadsheet className="h-5 w-5" />
        Excel
      </button>

      <button
        type="button"
        onClick={onPrint}
        disabled={disabled}
        className={buttonClassName}
      >
        <Printer className="h-5 w-5" />
        Print
      </button>
    </div>
  );
}

export default ReportExportButtons;