import React, { useState } from "react";
import { Report } from "../../Interfaces/report";
import ReportItem from "../../components/Custom/ReportItem";

interface ReportTableProps {
    reports: Report[];
}
const ReportsTable: React.FC<ReportTableProps> = ({ reports }) => {

    const [expandedId, setExpandedId] = useState<string | null>(null);

    const handleItemToggle = (id: string) => {
      setExpandedId(prevId => prevId === id ? null : id);
    };
    return (
        <>
            <div className="my-5 font-bold text-sm hidden md:block">
                <div className="grid grid-cols-12 gap-2 header bg-[#F9F9FA] text-black py-4 px-2 rounded-lg">
                    <div className="sm:col-span-4 col-span-5 ps-2 text-center">
                        <span>اسم التقرير</span>
                    </div>
                    <div className="col-span-3 sm:col-span-2 ps-2 text-center">
                      <span>المصدر</span>
                    </div>
                    <div className="col-span-1 sm:col-span-1 ps-2 text-center">
                        <span>السنة</span>
                    </div>
                    <div className="col-span-3 sm:col-span-2 ps-2 text-center">
                        <span>النوع</span>
                    </div>
                    <div className="col-span-5 sm:col-span-3 ps-2 text-center  hidden sm:block">
                        <span>إجراءات</span>
                    </div>
                </div>
            </div>

            <div className="my-5 font-bold text-sm">
                {reports.map((report, index) => {
                    return (
                        <ReportItem
                            key={report._id}
                            id={report._id}
                            name={report.name}
                            source={report.source}
                            year={report.year}
                            classification={report.classification}
                            details={report.description}
                            pdfName={report.pdfName}
                            isExpanded={expandedId === report._id}
                            index={index}
                            onToggle={handleItemToggle}
                        />
                    );
                })}
            </div>



        </>

    );
};

export default ReportsTable;
