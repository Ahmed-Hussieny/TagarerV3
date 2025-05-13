export const Pagination = ({ currentPage, numberOfPages, changeCurrentPage }:{
    currentPage: number;
    numberOfPages: number;
    changeCurrentPage: (page: number) => void;
}) => {
    const pages = [];
    // Always show the first page
    pages.push(1);

    // Add pages close to the current one (but not too many)
    const start = Math.max(2, currentPage - 2);
    const end = Math.min(numberOfPages - 1, currentPage + 1);

    if (start > 2) pages.push("..."); // Left Ellipsis
    for (let i = start; i <= end; i++) pages.push(i);
    if (end < numberOfPages - 1) pages.push("..."); // Right Ellipsis

    // Always show the last page
    if (numberOfPages > 1) pages.push(numberOfPages);

    return (
        <div className="flex justify-center items-center mt-8 mb-4">
            {/* Previous Button */}
            <button
                onClick={() => changeCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2  bg-[#EEEEEE99] text-[#656565] hover:bg-gray-100 rounded-lg disabled:opacity-50"
                aria-label="الصفحة السابقة"
            >
                السابق
            </button>

            {/* Page Numbers */}
            <div className="mx-2 flex">
                {pages.map((page, index) => (
                    <button
                        key={index}
                        onClick={() => typeof page === "number" && changeCurrentPage(page)}
                        disabled={typeof page !== "number"}
                        className={`px-4 py-2 mx-1 flex items-center rounded-lg justify-center  
                            ${currentPage === page
                                ? "bg-main_color text-white font-bold"
                                : "text-black bg-[#F7F8F9]"
                            } ${page === "..." ? "cursor-default text-gray-500" : ""}`}
                        aria-label={typeof page === "number" ? `الصفحة ${page}` : "إخفاء"}
                    >
                        {page}
                    </button>
                ))}
            </div>

            {/* Next Button */}
            <button
                onClick={() => changeCurrentPage(Math.min(numberOfPages, currentPage + 1))}
                disabled={currentPage === numberOfPages}
                className="px-4 py-2  bg-[#EEEEEE99] text-[#656565] hover:bg-gray-100 rounded-lg disabled:opacity-50"
                aria-label="الصفحة التالية"
            >
                التالي
            </button>
        </div>
    );
};
