import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IGovernmental } from "../../Interfaces/governmental";
import { useAppDispatch } from "../../Store/store";
import { handleGetAllGovernmentals } from "../../Store/governmental.slice";
import GovernmentalItem from "../../components/Custom/GovernmentalItem";
import { Toaster } from "react-hot-toast";
import { Pagination } from "../../components/Custom/Pagination";
import { Helmet } from "react-helmet-async";
import Dropdown from "../../components/Custom/Dropdown";
import { Seo } from "../../Interfaces/seo";

interface DropdownItem {
    value: string;
    label: string;
    count:number;
}

export default function Governmentals() {
    const [selectedName, setSelectedName] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [selectedType, setSelectedType] = useState<string>('');
    const [nameOptions, setNameOptions] = useState<DropdownItem[]>([]);

    const [isLoading, setIsLoading] = useState(false);
    const {SeoData} = useSelector((state: { user: { SeoData: Seo } })  => state.user);
    const { governmentals, classifications, numberOfPages, totalGovernmentals } = useSelector(
        (state: { governmentals: { governmentals: IGovernmental[], classifications: { classification: string; count: number }[], numberOfPages: number, totalGovernmentals:number } }) =>
            state.governmentals
    );

    const dispatch = useAppDispatch();

    // Fetch governmentals with filters
    const fetchGovernmentals = async ({
        page = 1,
        classification = selectedType,
        name = selectedName,
    }: { page?: number; classification?: string; name?: string }) => {
        setIsLoading(true);
        try {
            await dispatch(handleGetAllGovernmentals({ page, classification, name }));
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    // Handle search with current filters
    const handleSearchWithFilters = async () => {
        setCurrentPage(1);
        await fetchGovernmentals({ page: 1 });
    };

    // Initial load
    useEffect(() => {
        window.scrollTo(0, 0);
        fetchGovernmentals({ page: 1 });
    }, []);

    // Handle filter changes
    useEffect(() => {
        handleSearchWithFilters();
    }, [selectedType, selectedName]);


    const changeCurrentPage = (page: number) => {
        setCurrentPage(page);
        fetchGovernmentals({
            page,
            name: selectedName,
        });
    };

    useEffect(() => {
        console.log('classifications', classifications);
        setNameOptions([
            ...(classifications ? classifications.map(({
                classification,
                count
            }: {
                classification: string;
                count: number;
            }) => ({ value: classification, label: classification, count: count })) : []),
        ]);
    }, [classifications]);

    return (
        <div className="my-5 container mx-auto mt-24 px-3">

            {/* Helmet */}
            <Helmet>
                <title> {`${SeoData?.governmentalTitle}`}</title>
                <meta name="description" content= {SeoData?.governmentalDescription} />
            </Helmet>

            {/* section 1 */}
            <div className="bg-secondary_color mb-5 text-sm rounded-lg px-4 py-2">
                <span className="font-sans cursor-pointer">الرئيسية</span>
                <span className="mx-1">/</span>
                <span className="font-medium cursor-pointer">الجهات الحكومية ({totalGovernmentals})</span>
            </div>
            <Toaster
                position="top-center"
                toastOptions={{
                    style: {
                        fontSize: "14px",
                        padding: "16px",
                        color: "#fff",
                        background: "#333",
                    },
                }}
                reverseOrder={true}
            />
            <form className="my-7" dir="rtl">
                <div className="grid md:grid-cols-5 grid-cols-1 gap-y-4 md:gap-x-3 items-center">
                <div className="col-span-4 relative rounded-lg">
                    <div className="absolute inset-y-0 end-0 flex items-center pe-5 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>
                    <input
                        type="search"
                        id="default-search"
                        className="block w-full p-4 text-sm text-gray-500 placeholder:text-gray-400 rounded-xl border-0 bg-[#F9F9FA]"
                        placeholder="أدخل كلمة البحث هنا.."
                        value={selectedName}
                        onChange={(e) => setSelectedName(e.target.value)}
                    />
                </div>

                <div className="col-span-1 w-full items-center">
                <Dropdown
                            label="اختر تصنيف"
                            options={nameOptions}
                            selectedValue={selectedType}
                            onChange={(value: string) => setSelectedType(value)}
                        />
                </div>
                </div>
            </form>

            {/* <div className="my-5 font-bold text-sm hidden sm:block">
                <div className="grid grid-cols-12 gap-2 header bg-third_color text-black py-4 px-2 rounded-lg">
                    <div className="sm:col-span-2 col-span-3 ps-2 text-center">
                        <span>الإسم</span>
                    </div>
                    <div className="col-span-7 sm:col-span-8 sm:border-s-2 ps-2 text-center border-[#E0E0E0]">
                        <span>نبذة مختصرة</span>
                    </div>
                    <div className="col-span-2 border-s-2 ps-2 border-[#E0E0E0]  text-center hidden sm:block">
                        <span>رابط الموقع</span>
                    </div>
                </div>
            </div> */}
            {isLoading ?
                <div className="flex justify-center items-center my-7">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-main_color"></div>
                </div> : <div className="my-5 font-bold text-sm">
                    {governmentals?.map((governmental, index) => (
                        <GovernmentalItem
                            key={governmental._id}
                            name={governmental.name}
                            index={index}
                            details={governmental.description}
                            viewLink={governmental.link}
                        />
                    ))}
                </div>}
            <Pagination currentPage={currentPage} numberOfPages={numberOfPages} changeCurrentPage={changeCurrentPage} />
        </div>
    );
}