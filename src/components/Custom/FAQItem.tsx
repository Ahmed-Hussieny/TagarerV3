import arrowDown from "../../assets/Icons/arrowDown.svg";

export default function FAQItem({ title, description, isExpanded, onExpand }: { title: string, description: string, isExpanded: boolean, onExpand: () => void }) {


    const handelExpand = () => {
        onExpand();
    };

    return (
        <div 
            className={`rounded-2xl p-2 my-3 bg-[#F7F8F9] px-3 py-2 `}
        >
            <div onClick={handelExpand} className="flex justify-between py-2 cursor-pointer">
                <div className="text-start">
                    <h3 className="text-black">{title}</h3>
                </div>
                <div className="flex justify-center relative items-center text-white px-4 rounded-lg">
                    <img
                        src={arrowDown}
                        className={`absolute transform w-5 h-5 transition-transform ${isExpanded ? "rotate-180" : "rotate-0"}`}
                        alt="arrowDown"
                    />
                </div>
            </div>

            {isExpanded && (
                <div className="border-[#D5DAE1] p-2 border-t-2 text-gray-700 transition-all duration-300">
                    <p className="font-sans">{description}</p>
                </div>
            )}
        </div>
    );
}