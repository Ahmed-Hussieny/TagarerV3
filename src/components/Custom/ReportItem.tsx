import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import eyeIcon from "../../assets/Icons/Show.svg";
import paymentIconShow from "../../assets/Icons/paymentIconShow.svg";
import arrowDown from "../../assets/Icons/Arrow - Down 2.svg";
import tIcon from '../../assets/Icons/Stars.svg';
import downloadIcon from '../../assets/Icons/Download.svg';
import { useAppDispatch } from "../../Store/store";
import { handleDownloadReport, resetDownloadProgress } from "../../Store/report.slice";
import { handleGetLoggedInUser, setMaxNumberOfReports } from "../../Store/user.slice";
// checkIfUserSubscribed
// import linkIcon from '../../assets/Icons/link-2.png';
import { useSelector } from "react-redux";

export default function ReportItem({
  id,
  index,
  name,
  source,
  year,
  details,
  classification,
  pdfName,
  isExpanded,
  onToggle,
}: {
  id: string;
  index:number;
  name: string;
  source: string;
  year: string;
  classification: string;
  details: string;
  pdfName: string;
  isExpanded: boolean;
  onToggle: (id: string) => void;
}) {
  const [openModalT, setOpenModalT] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [downloadErrorMessage, setDownloadErrorMessage] = useState("");
  const { progress } = useSelector((state: { reports: { progress: number } }) => state.reports);

  // const downloadProgress = useSelector((state) => state.downloadProgress.reports);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const toggleExpansion = () => onToggle(id);
  const fetchUser = async () => {
    const data = await dispatch(handleGetLoggedInUser());
    if (data.payload.success) {
      dispatch(setMaxNumberOfReports(data.payload.userData.maxNumberOfReports));
    }
  };
  const handleDownload = async (pdfName: string) => {
    setLoading(true);
    // if (localStorage.getItem("userToken") === null) {
    //   setDownloadErrorMessage("يجب تسجيل الدخول أولاً");
    //   setShowConfirmModal(true);
    //   setLoading(false);
    //   return;
    // }

    // const data = await dispatch(checkIfUserSubscribed());
    // if (!data.payload.success) {
    //   setDownloadErrorMessage("يجب الاشتراك أولاً");
    //   setShowConfirmModal(true);
    //   setLoading(false);
    //   return;
    // }

    dispatch(resetDownloadProgress()); // Reset progress before starting

    try {
      const data = await dispatch(handleDownloadReport(pdfName));
      console.log("data", data);
      if ((data.payload as { success: boolean }).success === false) {
        setDownloadErrorMessage((data.payload as { message: string }).message);
        setShowConfirmModal(true);
      }
      fetchUser();
    } catch {
      toast.error("حدث خطأ أثناء تحميل التقرير");
    } finally {
      setLoading(false);
      dispatch(resetDownloadProgress()); // Reset progress after completion
    }
  };

  return (
    // md:block hidden
    <div className={`my-3 text-black rounded-xl transition-all duration-300 ${index%2===0?"bg-[#FDFDFE] border border-gray-200":"bg-[#F9F9FA]"}`}>
      <div className={`grid grid-cols-12 gap-3 py-5 px-3 rounded-xl `}>

        {/* small screen */}
        <div className="col-span-12 font-medium block md:hidden">
          <span>{name}</span>
        </div>
        <div className="col-span-12 text-gray-500 text-xs block md:hidden font-medium">
          <span>{source}</span>
        </div>
        <div className="col-span-12 flex justify-between text-gray-500 pb-2 text-xs md:hidden font-medium">
          <span>{classification}</span>
          <span className="text-[#00ABAF] bg-[#00ABAF1A] p-1 rounded-full px-2 text-xs">{year}</span>
        </div>

        {/* big screen */}
        <div className="sm:col-span-4 font-medium md:block hidden m-auto">
          <span>{name}</span>
        </div>

        <div className="sm:col-span-2 m-auto ps-3 font-medium md:block hidden">
          <span>{source}</span>
        </div>

        <div className="col-span-1 sm:col-span-1 m-auto ps-3 font-medium md:block hidden">
          <span className="text-[#00ABAF] bg-[#00ABAF1A] rounded-full px-3 text-xs">{year}</span>
        </div>
        <div className="sm:col-span-2 m-auto  ps-3 font-medium md:block hidden">
          <span>{classification}</span>
        </div>
        <div className="col-span-12 border md:hidden font-medium">
        </div>
        <div className="col-span-5 sm:col-span-3 m-auto ps-2 gap-3 relative hidden sm:flex">
          <div className="grid grid-cols-10 gap-2 items-center">
            <div className="col-span-3">
            <button
            className={`flex items-center justify-center text-main_color bg-[#0041361A] px-4 py-2 rounded-xl transition ${loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
            onClick={() => handleDownload(pdfName)}
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="font-medium"><span>جاري التحميل</span>{loading && <div>{progress}%</div>}</span>
                <svg className="animate-spin h-4 w-4 ms-2 text-main_color" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                </svg>
              </>
            ) : (
              <>
                <span className="font-medium">تحميل</span>
                <img src={downloadIcon} className="w-4 h-4 ms-2" alt="download" />
              </>
            )}
          </button>
            </div>
            <div className="col-span-3">
            <a
            href={`/viewPdf/${pdfName}/Reports/${name.replace(/ /g, "-")}/${details
                .split(" ")
                .slice(0, 160)
                .join(" ")
                .replace(/ /g, "-")
              }`}
          >
            <div className="flex items-center justify-center text-main_color border border-[#004136] px-3 py-2 rounded-xl cursor-pointer transition">
              <span className="font-medium" >قراءة</span>
              <img src={eyeIcon} className="w-3 h-3 mx-1" alt="eyeIcon" />
            </div>
          </a>
            </div>
            <div className="col-span-3">
            <div className="flex items-center justify-center text-[#454855] bg-[#F1F2F3] px-4 py-2 rounded-xl cursor-pointer transition" onClick={() => setOpenModalT(true)}>
            <span className="font-medium">تلخيص</span>
            <img src={tIcon} className="w-4 h-4 ms-2" alt="tIcon" />
          </div>
            </div>
            <div className="col-span-1">
            <div className="border rounded-lg flex items-center justify-center" onClick={toggleExpansion}>
            <img className={`transform w-5  transition-transform ${isExpanded ? "-rotate-90" : "rotate-0"
              }`} src={arrowDown} alt="arrowDown" />
          </div>
            </div>
          </div>
          
        </div>
      </div>

      
      <div className="grid grid-cols-10 items-center px-2 gap-2 pb-3 sm:hidden">
        {/* Download*/}
        <div className="col-span-3">
          <button
          className={`flex items-center w-full justify-center text-main_color bg-[#0041361A] px-4 py-2 rounded-xl transition ${loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
          onClick={() => handleDownload(pdfName)}
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="font-medium"><span>جاري التحميل</span>{loading && <div>{progress}%</div>}</span>
              <svg className="animate-spin h-4 w-4 ms-2 text-main_color" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
              </svg>
            </>
          ) : (
            <>
              <span className="font-medium">تحميل</span>
              <img src={downloadIcon} className="w-4 h-4 ms-2" alt="download" />
            </>
          )}
        </button>
        </div>
        <div className="col-span-3">
          {/* View Button */}
        <a
          href={`/viewPdf/${pdfName}/Reports/${name.replace(/ /g, "-")}/${details
              .split(" ")
              .slice(0, 160)
              .join(" ")
              .replace(/ /g, "-")
            }`}
            className="cols-span-3"
        >          <div className="flex items-center border border-[#004136] justify-center text-main_color px-3 py-2 rounded-xl cursor-pointer transition">
            <span className="font-medium" >قراءة</span>
            <img src={eyeIcon} className="w-5 h-5 ms-4" alt="eyeIcon" />
          </div>
        </a>
        </div>
        <div className="col-span-3">
          {/* talkhis */}
        <div className="flex items-center justify-center text-[#454855] mx-1 bg-[#F1F2F3] px-3 py-2 rounded-xl cursor-pointer transition" onClick={() => setOpenModalT(true)}>
          <span className="font-medium" >تلخيص</span>
          <img src={tIcon} className="w-3 h-3 mx-1" alt="tIcon" />
        </div>
        </div>
        <div className="col-span-1">
          {/* Dropdown Button */}
          <div className="border p-2 rounded-xl" onClick={toggleExpansion}>
          <img
            src={arrowDown}
            className={`transform transition-transform ${isExpanded ? "-rotate-90" : "rotate-0"
              }`}
            alt="arrowDown"
          />
        </div>
        </div>

      </div>
      {isExpanded && (
        <div className="px-4 pb-3">
          {details && <div className="border border-gray-300 rounded-xl p-3 bg-gray-50 text-gray-700 transition-all duration-300">
            <p className="font-medium text-gray-400">نبذة مختصرة</p>
            <p className="font-normal">{details}</p>
          </div>
          }
        </div>
      )}
      {openModalT && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white p-6 text-center rounded-xl shadow">
            <h2 className="text-l mb-4">ستتوفر خدمة التلخيص بواسطة الذكاء الاصطناعي قريباً</h2>
            <div className=' justify-center text-center'>


              <button onClick={() => setOpenModalT(false)} className="bg-main_color text-white col-span-1 px-10 py-2 rounded-md">
              اغلاق
              </button>
            </div>
          </div>
        </div>
      )}


      {showConfirmModal && (
        <div className="fixed inset-0  bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white p-6 text-center max-w-md rounded-xl shadow">
          {downloadErrorMessage === "يجب تسجيل الدخول أولاً" ?<>
            <h2 className="text-lg font-semibold mb-4">{downloadErrorMessage}</h2>
            <div className='grid grid-cols-2 gap-2'>
            <button onClick={() => navigate("/login")} className="bg-main_color text-white px-4 py-2 rounded-md mr-2">
                  تسجيل الدخول
                </button>
                <button onClick={() => setShowConfirmModal(false)} className="bg-gray-300 col-span-1 px-4 py-2 rounded-md">
              اغلاق 
              </button>
            </div>
          </>:
          <>
          <img className="w-20 mx-auto " src={paymentIconShow} alt="paymentIconShow"/>
          <h2 className="text-xl my-3">اشترك لعرض المزيد من التقارير</h2>
          <p className="text-gray-500 font-normal px-5 mb-3">لا يمكنك عرض المزيد من التقارير في الوقت الحالي، للاستفادة من المحتوى الكامل والوصول غير محدود إلى جميع التقارير، يرجى اختيار الباقة التي تناسبك.</p>
          <div className='grid grid-cols-2 gap-2'>
            
          <button onClick={() => navigate("/Pakages")} className="bg-main_color text-white px-4 py-2 rounded-md mr-2">
          عرض الباقات
                </button>
                <button onClick={() => setShowConfirmModal(false)} className="bg-gray-300 text-gray-700 col-span-1 px-4 py-2 rounded-md">
              اغلاق 
              </button>
            </div>
          </>
          }
          </div>
        </div>
      )}
    </div>
  );
}
