// import {
//   useCallback,
//   useEffect,
//   useState,
// } from "react";
// import {
//   FileBarChart2,
//   LoaderCircle,
// } from "lucide-react";
// import dayjs from "dayjs";
// import toast from "react-hot-toast";

// import { getTaskReport } from "../api/report.api";
// import ReportAnalyticsCards from "../components/reports/ReportAnalyticsCards";
// import ReportFilters from "../components/reports/ReportFilters";
// import ReportSummaryCards from "../components/reports/ReportSummaryCards";
// import DashboardLayout from "../layouts/DashboardLayout";

// import type {
//   ReportPeriod,
//   TaskReport,
// } from "../types/report.types";

// function Reports() {
//   const [period, setPeriod] =
//     useState<ReportPeriod>("monthly");

//   const [startDate, setStartDate] =
//     useState(
//       dayjs().startOf("month").format(
//         "YYYY-MM-DD"
//       )
//     );

//   const [endDate, setEndDate] =
//     useState(
//       dayjs().endOf("month").format(
//         "YYYY-MM-DD"
//       )
//     );

//   const [report, setReport] =
//     useState<TaskReport | null>(null);

//   const [isLoading, setIsLoading] =
//     useState(true);

//   const loadReport = useCallback(async () => {
//     if (
//       period === "custom" &&
//       (!startDate || !endDate)
//     ) {
//       toast.error(
//         "Select both start and end dates."
//       );

//       return;
//     }

//     if (
//       period === "custom" &&
//       dayjs(startDate).isAfter(
//         dayjs(endDate)
//       )
//     ) {
//       toast.error(
//         "Start date cannot be after end date."
//       );

//       return;
//     }

//     try {
//       setIsLoading(true);

//       const response =
//         await getTaskReport({
//           period,
//           startDate:
//             period === "custom"
//               ? startDate
//               : undefined,
//           endDate:
//             period === "custom"
//               ? endDate
//               : undefined,
//         });

//       setReport(response.data);
//     } catch (error) {
//       console.error(
//         "Load report error:",
//         error
//       );

//       toast.error(
//         "Unable to generate the report."
//       );
//     } finally {
//       setIsLoading(false);
//     }
//   }, [period, startDate, endDate]);

//   useEffect(() => {
//     loadReport();
//   }, []);

//   return (
//     <DashboardLayout>
//       <div>
//         <div className="mb-8 flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
//           <div>
//             <div className="mb-3 flex items-center gap-3">
//               <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-200">
//                 <FileBarChart2 className="h-6 w-6" />
//               </div>

//               <div>
//                 <h1 className="text-3xl font-bold text-slate-900">
//                   Task Reports
//                 </h1>

//                 <p className="mt-1 text-slate-500">
//                   Analyze task productivity,
//                   performance and deadlines.
//                 </p>
//               </div>
//             </div>
//           </div>

//           {report && (
//             <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-500 shadow-sm">
//               Generated{" "}
//               <span className="font-semibold text-slate-700">
//                 {dayjs(
//                   report.report.generatedAt
//                 ).format(
//                   "DD MMM YYYY, hh:mm A"
//                 )}
//               </span>
//             </div>
//           )}
//         </div>

//         <ReportFilters
//           period={period}
//           startDate={startDate}
//           endDate={endDate}
//           isLoading={isLoading}
//           onPeriodChange={setPeriod}
//           onStartDateChange={setStartDate}
//           onEndDateChange={setEndDate}
//           onGenerate={loadReport}
//         />

//         {isLoading && !report ? (
//           <div className="mt-6 flex min-h-80 items-center justify-center rounded-3xl border border-slate-200 bg-white">
//             <div className="text-center">
//               <LoaderCircle className="mx-auto h-9 w-9 animate-spin text-blue-600" />

//               <p className="mt-4 text-sm text-slate-500">
//                 Generating report analytics...
//               </p>
//             </div>
//           </div>
//         ) : report ? (
//           <>
//             <ReportSummaryCards
//               summary={report.summary}
//             />

//             <ReportAnalyticsCards
//               summary={report.summary}
//             />

//             <div className="mt-8 rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center">
//               <h2 className="text-xl font-bold text-slate-900">
//                 Charts, Task Table and Exports
//               </h2>

//               <p className="mt-2 text-sm text-slate-500">
//                 The report charts, full task table,
//                 PDF, CSV and Excel exports will be
//                 added in the next step.
//               </p>
//             </div>
//           </>
//         ) : null}
//       </div>
//     </DashboardLayout>
//   );
// }

// export default Reports;





import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  FileBarChart2,
  LoaderCircle,
} from "lucide-react";
import dayjs from "dayjs";
import toast from "react-hot-toast";
import autoTable from "jspdf-autotable";
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";
import * as XLSX from "xlsx";

interface JsPDFWithAutoTable extends jsPDF {
  lastAutoTable: {
    finalY: number;
  };
}

import { getTaskReport } from "../api/report.api";
import ReportAnalyticsCards from "../components/reports/ReportAnalyticsCards";
import ReportCharts from "../components/reports/ReportCharts";
import ReportExportButtons from "../components/reports/ReportExportButtons";
import ReportFilters from "../components/reports/ReportFilters";
import ReportSummaryCards from "../components/reports/ReportSummaryCards";
import ReportTaskTable from "../components/reports/ReportTaskTable";
import DashboardLayout from "../layouts/DashboardLayout";

import type {
  ReportPeriod,
  TaskReport,
} from "../types/report.types";

function Reports() {
  const [period, setPeriod] =
    useState<ReportPeriod>("monthly");

  const [startDate, setStartDate] =
    useState(
      dayjs()
        .startOf("month")
        .format("YYYY-MM-DD")
    );

  const [endDate, setEndDate] =
    useState(
      dayjs()
        .endOf("month")
        .format("YYYY-MM-DD")
    );

  const [report, setReport] =
    useState<TaskReport | null>(null);

  const [isLoading, setIsLoading] =
    useState(true);

  const [isExportingPdf, setIsExportingPdf] =
    useState(false);

  const reportContentRef =
    useRef<HTMLDivElement | null>(null);

  const loadReport = useCallback(async () => {
    if (
      period === "custom" &&
      (!startDate || !endDate)
    ) {
      toast.error(
        "Select both start and end dates."
      );
      return;
    }

    if (
      period === "custom" &&
      dayjs(startDate).isAfter(
        dayjs(endDate)
      )
    ) {
      toast.error(
        "Start date cannot be after end date."
      );
      return;
    }

    try {
      setIsLoading(true);

      const response =
        await getTaskReport({
          period,
          startDate:
            period === "custom"
              ? startDate
              : undefined,
          endDate:
            period === "custom"
              ? endDate
              : undefined,
        });

      setReport(response.data);
    } catch (error) {
      console.error(
        "Load report error:",
        error
      );

      toast.error(
        "Unable to generate the report."
      );
    } finally {
      setIsLoading(false);
    }
  }, [period, startDate, endDate]);

  useEffect(() => {
    loadReport();
  }, []);

  const getReportFileName = (
    extension: string
  ) => {
    const periodLabel =
      report?.report.period || period;

    return `task-report-${periodLabel}-${dayjs().format(
      "YYYY-MM-DD"
    )}.${extension}`;
  };

  const handleExportCsv = () => {
    if (!report) {
      return;
    }

    const headers = [
      "Title",
      "Description",
      "Priority",
      "Status",
      "Due Date",
      "Completed Date",
      "Created Date",
      "Updated Date",
    ];

    const rows = report.tasks.map((task) => [
      task.title,
      task.description || "",
      task.priority,
      task.status,
      dayjs(task.dueDate).format(
        "YYYY-MM-DD"
      ),
      task.completedAt
        ? dayjs(task.completedAt).format(
            "YYYY-MM-DD"
          )
        : "",
      dayjs(task.createdAt).format(
        "YYYY-MM-DD"
      ),
      dayjs(task.updatedAt).format(
        "YYYY-MM-DD"
      ),
    ]);

    const escapeCsvValue = (
      value: string
    ) =>
      `"${value.replaceAll('"', '""')}"`;

    const csvContent = [
      headers
        .map(escapeCsvValue)
        .join(","),
      ...rows.map((row) =>
        row
          .map((value) =>
            escapeCsvValue(
              String(value)
            )
          )
          .join(",")
      ),
    ].join("\n");

    const blob = new Blob(
      [csvContent],
      {
        type: "text/csv;charset=utf-8;",
      }
    );

    const url =
      URL.createObjectURL(blob);

    const link =
      document.createElement("a");

    link.href = url;
    link.download =
      getReportFileName("csv");

    link.click();

    URL.revokeObjectURL(url);

    toast.success(
      "CSV report downloaded."
    );
  };

  const handleExportExcel = () => {
    if (!report) {
      return;
    }

    const taskRows = report.tasks.map(
      (task) => ({
        Title: task.title,
        Description:
          task.description || "",
        Priority: task.priority,
        Status: task.status,
        "Due Date": dayjs(
          task.dueDate
        ).format("YYYY-MM-DD"),
        "Completed Date":
          task.completedAt
            ? dayjs(
                task.completedAt
              ).format("YYYY-MM-DD")
            : "",
        "Created Date": dayjs(
          task.createdAt
        ).format("YYYY-MM-DD"),
        "Updated Date": dayjs(
          task.updatedAt
        ).format("YYYY-MM-DD"),
      })
    );

    const summaryRows = [
      {
        Metric: "Total Tasks",
        Value:
          report.summary.totalTasks,
      },
      {
        Metric: "Pending Tasks",
        Value:
          report.summary.pendingTasks,
      },
      {
        Metric: "In Progress",
        Value:
          report.summary
            .inProgressTasks,
      },
      {
        Metric: "Completed Tasks",
        Value:
          report.summary
            .completedTasks,
      },
      {
        Metric: "Overdue Tasks",
        Value:
          report.summary.overdueTasks,
      },
      {
        Metric: "Completion Rate",
        Value: `${report.summary.completionRate}%`,
      },
      {
        Metric: "Productivity Score",
        Value: `${report.summary.productivityScore}%`,
      },
      {
        Metric: "Average Tasks / Day",
        Value:
          report.summary
            .averageTasksPerDay,
      },
      {
        Metric: "High Priority %",
        Value: `${report.summary.highPriorityPercentage}%`,
      },
      {
        Metric: "Overdue %",
        Value: `${report.summary.overduePercentage}%`,
      },
    ];

    const workbook =
      XLSX.utils.book_new();

    const summarySheet =
      XLSX.utils.json_to_sheet(
        summaryRows
      );

    const tasksSheet =
      XLSX.utils.json_to_sheet(
        taskRows
      );

    XLSX.utils.book_append_sheet(
      workbook,
      summarySheet,
      "Summary"
    );

    XLSX.utils.book_append_sheet(
      workbook,
      tasksSheet,
      "Tasks"
    );

    XLSX.writeFile(
      workbook,
      getReportFileName("xlsx")
    );

    toast.success(
      "Excel report downloaded."
    );
  };

//   const handleExportPdf = async () => {
//     if (
//       !report ||
//       !reportContentRef.current
//     ) {
//       return;
//     }

//     try {
//       setIsExportingPdf(true);

//       const canvas =
//         await html2canvas(
//           reportContentRef.current,
//           {
//             scale: 1.5,
//             useCORS: true,
//             backgroundColor: "#f8fafc",
//             windowWidth:
//               reportContentRef.current
//                 .scrollWidth,
//           }
//         );

//       const imageData =
//         canvas.toDataURL(
//           "image/png"
//         );

//       const pdf = new jsPDF(
//         "p",
//         "mm",
//         "a4"
//       );

//       const pageWidth =
//         pdf.internal.pageSize.getWidth();

//       const pageHeight =
//         pdf.internal.pageSize.getHeight();

//       const margin = 8;

//       const printableWidth =
//         pageWidth - margin * 2;

//       const imageHeight =
//         (canvas.height *
//           printableWidth) /
//         canvas.width;

//       let heightLeft = imageHeight;
//       let position = margin;

//       pdf.addImage(
//         imageData,
//         "PNG",
//         margin,
//         position,
//         printableWidth,
//         imageHeight
//       );

//       heightLeft -=
//         pageHeight - margin * 2;

//       while (heightLeft > 0) {
//         pdf.addPage();

//         position =
//           heightLeft -
//           imageHeight +
//           margin;

//         pdf.addImage(
//           imageData,
//           "PNG",
//           margin,
//           position,
//           printableWidth,
//           imageHeight
//         );

//         heightLeft -=
//           pageHeight - margin * 2;
//       }

//       pdf.save(
//         getReportFileName("pdf")
//       );

//       toast.success(
//         "PDF report downloaded."
//       );
//     } catch (error) {
//       console.error(
//         "PDF export error:",
//         error
//       );

//       toast.error(
//         "Unable to export PDF report."
//       );
//     } finally {
//       setIsExportingPdf(false);
//     }
//   };







// const handleExportPdf = async () => {
//   const reportElement = reportContentRef.current;

//   if (!report || !reportElement) {
//     toast.error("Report content is not available.");
//     return;
//   }

//   try {
//     setIsExportingPdf(true);

//     toast.loading("Generating PDF...", {
//       id: "pdf-export",
//     });

//     // Charts and fonts render වෙන්න browser එකට පොඩි වෙලාවක් දෙයි.
//     await new Promise((resolve) =>
//       window.setTimeout(resolve, 500)
//     );

//     const canvas = await html2canvas(
//       reportElement,
//       {
//         scale: 1.5,
//         useCORS: true,
//         allowTaint: false,
//         backgroundColor: "#f8fafc",
//         logging: false,

//         width: reportElement.scrollWidth,
//         height: reportElement.scrollHeight,

//         windowWidth:
//           reportElement.scrollWidth,
//         windowHeight:
//           reportElement.scrollHeight,

//         scrollX: 0,
//         scrollY: -window.scrollY,

//         onclone: (clonedDocument) => {
//           const clonedReport =
//             clonedDocument.querySelector(
//               ".report-print-area"
//             ) as HTMLElement | null;

//           if (clonedReport) {
//             clonedReport.style.width =
//               `${reportElement.scrollWidth}px`;

//             clonedReport.style.maxWidth =
//               "none";

//             clonedReport.style.overflow =
//               "visible";
//           }
//         },
//       }
//     );

//     if (
//       canvas.width === 0 ||
//       canvas.height === 0
//     ) {
//       throw new Error(
//         "The report canvas could not be generated."
//       );
//     }

//     const imageData =
//       canvas.toDataURL(
//         "image/jpeg",
//         0.92
//       );

//     const pdf = new jsPDF({
//       orientation: "portrait",
//       unit: "mm",
//       format: "a4",
//       compress: true,
//     });

//     const pageWidth =
//       pdf.internal.pageSize.getWidth();

//     const pageHeight =
//       pdf.internal.pageSize.getHeight();

//     const margin = 8;

//     const printableWidth =
//       pageWidth - margin * 2;

//     const printableHeight =
//       pageHeight - margin * 2;

//     const imageHeight =
//       (canvas.height *
//         printableWidth) /
//       canvas.width;

//     let renderedHeight = 0;
//     let pageNumber = 1;

//     while (
//       renderedHeight < imageHeight
//     ) {
//       if (pageNumber > 1) {
//         pdf.addPage();
//       }

//       const imageY =
//         margin - renderedHeight;

//       pdf.addImage(
//         imageData,
//         "JPEG",
//         margin,
//         imageY,
//         printableWidth,
//         imageHeight,
//         undefined,
//         "FAST"
//       );

//       pdf.setFontSize(8);
//       pdf.setTextColor(
//         100,
//         116,
//         139
//       );

//       pdf.text(
//         `TaskFlow Report • Page ${pageNumber}`,
//         pageWidth / 2,
//         pageHeight - 3,
//         {
//           align: "center",
//         }
//       );

//       renderedHeight +=
//         printableHeight;

//       pageNumber += 1;
//     }

//     pdf.save(
//       getReportFileName("pdf")
//     );

//     toast.success(
//       "PDF report downloaded.",
//       {
//         id: "pdf-export",
//       }
//     );
//   } catch (error) {
//     console.error(
//       "PDF export error:",
//       error
//     );

//     const message =
//       error instanceof Error
//         ? error.message
//         : "Unable to export PDF report.";

//     toast.error(message, {
//       id: "pdf-export",
//     });
//   } finally {
//     setIsExportingPdf(false);
//   }
// };





const handleExportPdf = async () => {
  if (!report) {
    toast.error("Report data is not available.");
    return;
  }

  try {
    setIsExportingPdf(true);

    toast.loading("Generating PDF report...", {
      id: "pdf-export",
    });

    await new Promise((resolve) =>
      window.setTimeout(resolve, 500)
    );

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
      compress: true,
    }) as JsPDFWithAutoTable;

    const pageWidth =
      pdf.internal.pageSize.getWidth();

    const pageHeight =
      pdf.internal.pageSize.getHeight();

    const margin = 14;
    const contentWidth =
      pageWidth - margin * 2;

    let currentY = 14;

    const addPageFooter = () => {
      const pageCount =
        pdf.getNumberOfPages();

      for (
        let pageNumber = 1;
        pageNumber <= pageCount;
        pageNumber += 1
      ) {
        pdf.setPage(pageNumber);

        pdf.setDrawColor(226, 232, 240);
        pdf.line(
          margin,
          pageHeight - 12,
          pageWidth - margin,
          pageHeight - 12
        );

        pdf.setFontSize(8);
        pdf.setTextColor(100, 116, 139);

        pdf.text(
          "Generated by TaskFlow Task Management System",
          margin,
          pageHeight - 7
        );

        pdf.text(
          `Page ${pageNumber} of ${pageCount}`,
          pageWidth - margin,
          pageHeight - 7,
          {
            align: "right",
          }
        );
      }
    };

    const addSectionTitle = (
      title: string,
      description?: string
    ) => {
      if (currentY > pageHeight - 35) {
        pdf.addPage();
        currentY = 18;
      }

      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(15);
      pdf.setTextColor(15, 23, 42);
      pdf.text(title, margin, currentY);

      currentY += 6;

      if (description) {
        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(9);
        pdf.setTextColor(100, 116, 139);

        pdf.text(
          description,
          margin,
          currentY,
          {
            maxWidth: contentWidth,
          }
        );

        currentY += 7;
      }
    };

    const addChartToPdf = async (
      elementId: string,
      title: string
    ) => {
      const chartElement =
        document.getElementById(elementId);

      if (!chartElement) {
        return;
      }

      if (currentY > pageHeight - 105) {
        pdf.addPage();
        currentY = 18;
      }

      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(12);
      pdf.setTextColor(30, 41, 59);
      pdf.text(title, margin, currentY);

      currentY += 5;

      const canvas = await html2canvas(
        chartElement,
        {
          scale: 2,
          useCORS: true,
          backgroundColor: "#ffffff",
          logging: false,
        }
      );

      const imageData =
        canvas.toDataURL(
          "image/jpeg",
          0.94
        );

      const imageWidth = contentWidth;
      const calculatedHeight =
        (canvas.height * imageWidth) /
        canvas.width;

      const maximumHeight = 92;

      const imageHeight = Math.min(
        calculatedHeight,
        maximumHeight
      );

      pdf.addImage(
        imageData,
        "JPEG",
        margin,
        currentY,
        imageWidth,
        imageHeight,
        undefined,
        "FAST"
      );

      currentY += imageHeight + 10;
    };

    // Report header
    pdf.setFillColor(15, 23, 42);

    pdf.roundedRect(
      margin,
      currentY,
      contentWidth,
      44,
      4,
      4,
      "F"
    );

    pdf.setFont("helvetica", "bold");
    pdf.setTextColor(147, 197, 253);
    pdf.setFontSize(9);
    pdf.text(
      "TASKFLOW",
      margin + 7,
      currentY + 9
    );

    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(22);
    pdf.text(
      report.report.title,
      margin + 7,
      currentY + 21
    );

    pdf.setFontSize(9);
    pdf.setFont("helvetica", "normal");
    pdf.setTextColor(203, 213, 225);

    pdf.text(
      `Period: ${
        report.report.period
          .charAt(0)
          .toUpperCase() +
        report.report.period.slice(1)
      }`,
      margin + 7,
      currentY + 33
    );

    pdf.text(
      `Date range: ${dayjs(
        report.report.startDate
      ).format("DD MMM YYYY")} - ${dayjs(
        report.report.endDate
      ).format("DD MMM YYYY")}`,
      margin + 52,
      currentY + 33
    );

    pdf.text(
      `Generated: ${dayjs(
        report.report.generatedAt
      ).format("DD MMM YYYY, hh:mm A")}`,
      pageWidth - margin - 7,
      currentY + 33,
      {
        align: "right",
      }
    );

    currentY += 54;

    // Summary
    addSectionTitle(
      "Executive Summary",
      "Task performance for the selected reporting period."
    );

    autoTable(pdf, {
      startY: currentY,
      theme: "grid",
      head: [
        [
          "Metric",
          "Value",
          "Metric",
          "Value",
        ],
      ],
      body: [
        [
          "Total Tasks",
          report.summary.totalTasks,
          "Completion Rate",
          `${report.summary.completionRate}%`,
        ],
        [
          "Pending",
          report.summary.pendingTasks,
          "Productivity Score",
          `${report.summary.productivityScore}%`,
        ],
        [
          "In Progress",
          report.summary.inProgressTasks,
          "Overdue Rate",
          `${report.summary.overduePercentage}%`,
        ],
        [
          "Completed",
          report.summary.completedTasks,
          "Average Tasks / Day",
          report.summary.averageTasksPerDay,
        ],
        [
          "Overdue",
          report.summary.overdueTasks,
          "High Priority",
          `${report.summary.highPriorityPercentage}%`,
        ],
      ],
      styles: {
        fontSize: 9,
        cellPadding: 3,
        textColor: [51, 65, 85],
      },
      headStyles: {
        fillColor: [37, 99, 235],
        textColor: [255, 255, 255],
        fontStyle: "bold",
      },
      alternateRowStyles: {
        fillColor: [248, 250, 252],
      },
      margin: {
        left: margin,
        right: margin,
      },
    });

    currentY =
      pdf.lastAutoTable.finalY + 10;

    // Advanced analytics
    addSectionTitle(
      "Advanced Analytics",
      "Additional productivity and completion insights."
    );

    autoTable(pdf, {
      startY: currentY,
      theme: "striped",
      head: [["Analytics Metric", "Value"]],
      body: [
        [
          "Most Common Priority",
          report.summary.mostCommonPriority ||
            "N/A",
        ],
        [
          "Most Common Status",
          report.summary.mostCommonStatus ||
            "N/A",
        ],
        [
          "Average Completion Time",
          report.summary
            .averageCompletionTimeDays ===
          null
            ? "N/A"
            : `${report.summary.averageCompletionTimeDays} days`,
        ],
        [
          "Completed On Time",
          report.summary.completedOnTime,
        ],
        [
          "Completed Late",
          report.summary.completedLate,
        ],
        [
          "Report Duration",
          `${report.summary.reportDurationInDays} days`,
        ],
        [
          "Longest Active Task",
          report.summary.longestPendingTask
            ? `${report.summary.longestPendingTask.title} (${report.summary.longestPendingTask.daysPending} days)`
            : "N/A",
        ],
      ],
      styles: {
        fontSize: 9,
        cellPadding: 3,
      },
      headStyles: {
        fillColor: [71, 85, 105],
        textColor: [255, 255, 255],
      },
      margin: {
        left: margin,
        right: margin,
      },
    });

    currentY =
      pdf.lastAutoTable.finalY + 12;

    // Charts
    pdf.addPage();
    currentY = 18;

    addSectionTitle(
      "Report Charts",
      "Visual analysis of task status, priorities and activity trends."
    );

    await addChartToPdf(
      "report-status-chart",
      "Status Distribution"
    );

    await addChartToPdf(
      "report-priority-chart",
      "Priority Distribution"
    );

    await addChartToPdf(
      "report-creation-chart",
      "Task Creation Trend"
    );

    await addChartToPdf(
      "report-due-date-chart",
      "Due Date Trend"
    );

    // Task table
    pdf.addPage();
    currentY = 18;

    addSectionTitle(
      "Task Details",
      `Tasks created from ${dayjs(
        report.report.startDate
      ).format("DD MMM YYYY")} to ${dayjs(
        report.report.endDate
      ).format("DD MMM YYYY")}.`
    );

    autoTable(pdf, {
      startY: currentY,
      theme: "grid",

      head: [
        [
          "#",
          "Task",
          "Priority",
          "Status",
          "Due Date",
          "Created",
          "Completed",
        ],
      ],

      body: report.tasks.map(
        (task, index) => [
          index + 1,
          task.description
            ? `${task.title}\n${task.description}`
            : task.title,
          task.priority,
          task.status.replaceAll("_", " "),
          dayjs(task.dueDate).format(
            "DD MMM YYYY"
          ),
          dayjs(task.createdAt).format(
            "DD MMM YYYY"
          ),
          task.completedAt
            ? dayjs(task.completedAt).format(
                "DD MMM YYYY"
              )
            : "-",
        ]
      ),

      styles: {
        fontSize: 7.5,
        cellPadding: 2.4,
        valign: "top",
        overflow: "linebreak",
        textColor: [51, 65, 85],
      },

      headStyles: {
        fillColor: [15, 23, 42],
        textColor: [255, 255, 255],
        fontStyle: "bold",
        fontSize: 7.5,
      },

      alternateRowStyles: {
        fillColor: [248, 250, 252],
      },

      columnStyles: {
        0: {
          cellWidth: 8,
          halign: "center",
        },
        1: {
          cellWidth: 62,
        },
        2: {
          cellWidth: 18,
        },
        3: {
          cellWidth: 23,
        },
        4: {
          cellWidth: 24,
        },
        5: {
          cellWidth: 24,
        },
        6: {
          cellWidth: 24,
        },
      },

      margin: {
        left: margin,
        right: margin,
        bottom: 18,
      },

      didDrawPage: () => {
        pdf.setFontSize(8);
        pdf.setTextColor(100, 116, 139);

        pdf.text(
          `${report.report.title} — ${report.report.period}`,
          margin,
          pageHeight - 15
        );
      },
    });

    addPageFooter();

    pdf.save(
      getReportFileName("pdf")
    );

    toast.success(
      "PDF report downloaded.",
      {
        id: "pdf-export",
      }
    );
  } catch (error) {
    console.error(
      "PDF export error:",
      error
    );

    toast.error(
      error instanceof Error
        ? error.message
        : "Unable to export PDF report.",
      {
        id: "pdf-export",
      }
    );
  } finally {
    setIsExportingPdf(false);
  }
};





  const handlePrint = () => {
    window.print();
  };

  return (
    <DashboardLayout>
      <div>
        <div className="mb-8 flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-200">
                <FileBarChart2 className="h-6 w-6" />
              </div>

              <div>
                <h1 className="text-3xl font-bold text-slate-900">
                  Task Reports
                </h1>

                <p className="mt-1 text-slate-500">
                  Analyze task productivity,
                  performance and deadlines.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 xl:items-end">
            {report && (
              <ReportExportButtons
                isExportingPdf={
                  isExportingPdf
                }
                disabled={
                  isLoading ||
                  !report
                }
                onExportPdf={
                  handleExportPdf
                }
                onExportCsv={
                  handleExportCsv
                }
                onExportExcel={
                  handleExportExcel
                }
                onPrint={
                  handlePrint
                }
              />
            )}

            {report && (
              <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-500 shadow-sm">
                Generated{" "}
                <span className="font-semibold text-slate-700">
                  {dayjs(
                    report.report
                      .generatedAt
                  ).format(
                    "DD MMM YYYY, hh:mm A"
                  )}
                </span>
              </div>
            )}
          </div>
        </div>

        <ReportFilters
          period={period}
          startDate={startDate}
          endDate={endDate}
          isLoading={isLoading}
          onPeriodChange={setPeriod}
          onStartDateChange={
            setStartDate
          }
          onEndDateChange={
            setEndDate
          }
          onGenerate={loadReport}
        />

        {isLoading && !report ? (
          <div className="mt-6 flex min-h-80 items-center justify-center rounded-3xl border border-slate-200 bg-white">
            <div className="text-center">
              <LoaderCircle className="mx-auto h-9 w-9 animate-spin text-blue-600" />

              <p className="mt-4 text-sm text-slate-500">
                Generating report
                analytics...
              </p>
            </div>
          </div>
        ) : report ? (
          <div
            ref={reportContentRef}
            className="report-print-area"
          >
            <div className="mt-6 rounded-3xl bg-gradient-to-r from-slate-950 via-blue-950 to-indigo-950 p-7 text-white shadow-xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-200">
                TaskFlow
              </p>

              <h2 className="mt-3 text-3xl font-bold">
                {
                  report.report.title
                }
              </h2>

              <div className="mt-5 grid gap-4 text-sm text-slate-200 sm:grid-cols-3">
                <div>
                  <p className="text-slate-400">
                    Period
                  </p>

                  <p className="mt-1 font-semibold capitalize text-white">
                    {
                      report.report
                        .period
                    }
                  </p>
                </div>

                <div>
                  <p className="text-slate-400">
                    Date Range
                  </p>

                  <p className="mt-1 font-semibold text-white">
                    {dayjs(
                      report.report
                        .startDate
                    ).format(
                      "DD MMM YYYY"
                    )}{" "}
                    –{" "}
                    {dayjs(
                      report.report
                        .endDate
                    ).format(
                      "DD MMM YYYY"
                    )}
                  </p>
                </div>

                <div>
                  <p className="text-slate-400">
                    Generated
                  </p>

                  <p className="mt-1 font-semibold text-white">
                    {dayjs(
                      report.report
                        .generatedAt
                    ).format(
                      "DD MMM YYYY"
                    )}
                  </p>
                </div>
              </div>
            </div>

            <ReportSummaryCards
              summary={report.summary}
            />

            <ReportAnalyticsCards
              summary={report.summary}
            />

            <ReportCharts
              charts={report.charts}
            />

            <ReportTaskTable
              tasks={report.tasks}
            />

            <footer className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 text-center text-sm text-slate-500">
              Generated by TaskFlow Task
              Management System on{" "}
              {dayjs(
                report.report.generatedAt
              ).format(
                "DD MMM YYYY, hh:mm A"
              )}
            </footer>
          </div>
        ) : null}
      </div>
    </DashboardLayout>
  );
}

export default Reports;