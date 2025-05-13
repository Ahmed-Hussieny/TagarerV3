
import { useState } from "react";
import webIcon from "../../assets/Icons/web.svg";

export default function GovernmentalItem({
    name,
    index,
    viewLink,
    details
}: {
    name: string;
    index: number;
    viewLink?: string;
    details: string;
}) {
    function DetailsText({ details }:{
        details:string
    }) {
        const [expanded, setExpanded] = useState(false);
      
        const words = details.split(" ");
        const isLong = words.length > 25;
      
        const displayText = expanded || !isLong
          ? details
          : words.slice(0, 25).join(" ") + "...";
      
        return (
          <span className="text-gray-500 text-xs block md:hidden">
            {displayText}
            {isLong && !expanded && (
              <span
                className="text-main_color cursor-pointer ml-1"
                onClick={() => setExpanded(true)}
              >
                قراءة المزيد
              </span>
            )}
          </span>
        );
      }
    const handleView = () => {
        window.open(viewLink, "_blank");
    };
    return (
        <div className={`${index%2===0?"bg-[#FDFDFE]":"bg-[#EEEEEE]"} shadow-lg my-3 border text-black rounded-xl transition-all duration-300`}>
            {/* Main Content */}
            <div className="grid grid-cols-10  gap-3 items-center py-4 px-3 ">
                {/* Name Column */}
                <div className="md:col-span-9 col-span-10 text-main_color md:px-3 font-medium">
                    <h1 className="text-black mb-2">{name}</h1>
                    <span className="text-gray-500 text-xs md:block hidden">{details}</span>
                    <DetailsText details={details} />

                    {/* <img src={nameImage} className="w-32 h-7 ms-2 hidden sm:block" alt="nameImage" /> */}
                </div>

                {/* Source Column */}
                {/* <div className="col-span-7 sm:col-span-8 font-medium text-[#3b3a3a] sm:border-s border-[#E0E0E0] ps-3 hidden sm:flex">
                    <span>{details}</span>
                </div> */}

                {/* Action Buttons */}
                <div className="col-span-1 justify-center items-start gap-3 relative hidden sm:flex">
                    {/* View Button */}
                    <div className="flex items-center justify-center text-main_color bg-[#0041361A] px-2 py-3 rounded-xl cursor-pointer hover:bg-[#d4f2d0] transition"  onClick={handleView}>
                    <span className="text-xs font-normal">الموقع الالكتروني</span>
                        <img src={webIcon} className="w-3 h-3 ms-1" alt="webIcon" />
                    </div>
                </div>
            </div>

            <div className="col-span-3 mt-3 items-center px-2 gap-3 relative pb-3 flex justify-between sm:hidden">
                {/* View Button */}
                <div className="flex items-center justify-center w-full text-main_color bg-[#0041361A] px-4 py-3 rounded-xl cursor-pointer hover:bg-[#d4f2d0] transition"
                onClick={handleView}>
                    <span className="text-xs font-normal">الموقع الالكتروني</span>
                    <img src={webIcon} className="w-4 h-4 ms-2" alt="webIcon" />
                </div>
            </div>
        </div>
    );
}
