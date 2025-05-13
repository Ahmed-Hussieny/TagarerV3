import React, { useState } from "react";
import { Guide } from "../../Interfaces/guide";
import GuideItem from "../../components/Custom/GuideItem";

interface ReportTableProps {
    guides: Guide[];
}
const GuidesTable: React.FC<ReportTableProps> = ({ guides }) => {

    const [expandedId, setExpandedId] = useState<string | null>(null);

    const handleItemToggle = (id: string) => {
      setExpandedId(prevId => prevId === id ? null : id);
    };
    return (
        <>
            <div className="my-5 font-bold text-sm hidden md:block">
                <div className="grid grid-cols-12 gap-2 header bg-[#F9F9FA] text-black py-4 px-2 rounded-lg">
                    <div className="sm:col-span-4 col-span-5 ps-2 text-center">
                        <span> اسم الدليل</span>
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
                {guides.map((guide, index) => {
                    return (
                        <GuideItem
                            key={guide._id}
                            id={guide._id}
                            name={guide.name}
                            source={guide.source}
                            year={guide.year}
                            classification={guide.classification}
                            details={guide.description}
                            pdfName={guide.pdfName}
                            isExpanded={expandedId === guide._id}
                            index={index}
                            onToggle={handleItemToggle}
                        />
                    );
                })}
            </div>
        </>

    );
};

export default GuidesTable;
