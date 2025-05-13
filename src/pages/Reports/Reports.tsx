import { useEffect, useState } from "react";
import Dropdown from "../../components/Custom/Dropdown";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../Store/store";
import { handleGetAllReports } from "../../Store/report.slice";
import ReportsTable from "./ReportsTable";
import { Report } from "../../Interfaces/report";
import { Pagination } from "../../components/Custom/Pagination";
import { Helmet } from "react-helmet-async";
import { Seo } from "../../Interfaces/seo";

interface DropdownItem {
    value: string;
    label: string;
    count:number;
}
export default function Reports() {
    const dispatch = useAppDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [searchValue, setSearchValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [selectedName, setSelectedName] = useState<string>('');
    const [selectedSource, setSelectedSource] = useState<string>('');
    const [selectedYear, setSelectedYear] = useState<string>('');
    const [sourceOptions, setSourceOptions] = useState<DropdownItem[]>([]);
    const [nameOptions, setNameOptions] = useState<DropdownItem[]>([]);
    const [yearOptions, setYearOptions] = useState<DropdownItem[]>([]);

    const {SeoData} = useSelector((state: { user: { SeoData: Seo } })  => state.user);
    const { reports, sourceFilters, classifications, yearFilters, numberOfPages, totalReports } = useSelector((state: { reports: { reports: Report[], sourceFilters:  { source: string, count: string }[], classifications:  { classification: string, count: string }[], yearFilters: { year: string, count: string }[], numberOfPages: number, totalReports:number } }) => state.reports);

    const fetchData = async ({
        page = 1,
        classification = '',
        source = '',
        year = '',
        custom = '',
    }: { page?: number, classification?: string, source?: string, year?: string, custom?: string }) => {
        setIsLoading(true);
        try {
            await dispatch(handleGetAllReports({ page, classification, source, year, custom }));
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyUp = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
        const searchObject = {
            classification: selectedName,
            source: selectedSource,
            year: selectedYear,
            custom: (event.target as HTMLInputElement).value
        }
        localStorage.setItem("searchReport", JSON.stringify(searchObject));
        fetchData({ custom: (event.target as HTMLInputElement).value, classification: selectedName, source: selectedSource, year: selectedYear });
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        const searchObject = localStorage.getItem("searchReport") ? JSON.parse(localStorage.getItem("searchReport") as string) : {};
        setSearchValue(searchObject.custom || "");
        setSelectedName(searchObject.classification || "");
        setSelectedSource(searchObject.source || "");
        setSelectedYear(searchObject.year || "");
        fetchData({ page: 1, classification: searchObject.classification, source: searchObject.source, year: searchObject.year, custom: searchObject.custom });
    }, []);

    useEffect(() => {
        setNameOptions([
            ...classifications.map((
                { classification, count }
                    : {
                        classification: string;
                        count: string;
                    }) => ({ value: classification, label: classification, count: Number(count) })),
        ]);
        setSourceOptions([
            ...sourceFilters.map((
                { source, count }
                    : {
                        source: string;
                        count: string;
                    }) => ({ value: source, label: source, count: Number(count) })),
        ]);
        setYearOptions([
            ...yearFilters.map((
                { year, count }
                    : {
                        year: string;
                        count: string;
                    }) => ({ value: year, label: year, count: Number(count) })),
        ]);
    }, [classifications, sourceFilters, yearFilters]);


    const handleNameChange = (value: string) => {
        setSelectedSource('');
        setSelectedYear('');
        setSelectedName(value);
        const searchObject = {
            classification: value,
            source: "",
            year: "",
            custom: searchValue
        }
        console.log("searchObject", searchObject);
        localStorage.setItem("searchReport", JSON.stringify(searchObject));
        fetchData({ classification: value, custom: searchValue });
    }

    const handleSourceChange = (value: string) => {
        setSelectedYear('');
        setSelectedSource(value);
        const searchObject = {
            classification: selectedName,
            source: value,
            year: selectedYear,
            custom: searchValue
        }
        
        localStorage.setItem("searchReport", JSON.stringify(searchObject));
        fetchData({ classification: selectedName, source: value });
    };
    const handleYearChange = (value: string) => {
        setSelectedYear(value);
        const searchObject = {
            classification: selectedName,
            source: selectedSource,
            year: value,
            custom: searchValue
        }
        localStorage.setItem("searchReport", JSON.stringify(searchObject));
        fetchData({ classification: selectedName, source: selectedSource, year: value, custom: searchValue });
    }

    const changeCurrentPage = (page: number) => {
        setCurrentPage(page);
        fetchData({
            page,
            classification: selectedName,
            source: selectedSource,
            year: selectedYear,
            custom: searchValue,
        });
    };
    return (
        <div className="my-5 container mx-auto mt-24 px-3">
            {/* Helmet */}
            <Helmet>
                <title> {`${SeoData?.searchTitle}`}</title>
                <meta name="description" content= {SeoData?.searchDescription} />
            </Helmet>

            {/* section 1 */}
            <div className="bg-secondary_color mb-5 text-sm rounded-lg px-4 py-2">
                <span className="font-sans cursor-pointer">الرئيسية</span>
                <span className="mx-1">/</span>
                <span className="font-medium cursor-pointer">التقارير و الدراسات ({totalReports})</span>
            </div>
            <div className="grid md:grid-cols-10 grid-cols-1 gap-4">
                <div className="relative shadow-lg rounded-lg col-span-3">
                    {/* {localStorage.getItem("userToken") !== null &&
                        <div className="text-center text-main_color"><p>  الحد المتبقي من التحميلات لهذا اليوم هو
                            ({maxNumberOfReports})
                        </p></div>
                    } */}
                    <div className="absolute end-3 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 mt-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>
                    <input
                        type="search"
                        id="default-search"
                        value={searchValue}
                        className="w-full h-full bg-[#EEEEEE] text-sm text-main_color placeholder:text-gray-500 border border-gray-300 rounded-lg "
                        placeholder="أدخل كلمة البحث هنا.."
                        required
                        onChange={handleKeyUp}
                    />
                </div>
                <div className="col-span-3">
                    <Dropdown
                        label="نوع التقارير"
                        options={nameOptions}
                        selectedValue={selectedName}
                        onChange={handleNameChange}
                    />
                </div>

                <div className="col-span-3">
                    <Dropdown
                        label="اختر المصدر"
                        options={sourceOptions}
                        selectedValue={selectedSource}
                        onChange={handleSourceChange}
                    />
                </div>

                <div className="md:col-span-1 col-span-3">
                    <Dropdown
                        label="اختر العام"
                        options={yearOptions}
                        selectedValue={selectedYear}
                        onChange={handleYearChange}
                    />
                </div>
            </div>
            <div className="min-h-64">
                {isLoading ? (
                    <div className="flex justify-center items-center my-7 h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-main_color "></div>
                    </div>
                ) : <ReportsTable reports={reports} />}
            </div>
            <Pagination currentPage={currentPage} numberOfPages={numberOfPages} changeCurrentPage={changeCurrentPage} />

        </div>
    )
}
