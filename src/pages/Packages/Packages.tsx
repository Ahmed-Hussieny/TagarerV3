import { useEffect, useState, useCallback } from 'react';
import { handleGetAllPayments } from "../../Store/pakage.slice";
import { useAppDispatch } from "../../Store/store";
import { Package } from "../../Interfaces/Package";
import toast from "react-hot-toast";
import PackageItem from '../../components/Custom/PackageItem';

export default function Packages() {
    const dispatch = useAppDispatch();
    const [pakages, setPakages] = useState<Package[]>([]);

    const fetchPakages = useCallback(async () => {
        try {
          const data = await dispatch(handleGetAllPayments());
          console.log(data.payload.paymentPackages)
          setPakages(data.payload.paymentPackages);
        } catch {
          toast.error('فشل في تحميل الباقات');
        }
      }, [dispatch]);

      useEffect(() => {
        window.scrollTo(0, 0);
        fetchPakages();
      }, [dispatch, fetchPakages]);
  return (
    <div className="my-5 container mx-auto mt-24 px-3">
            {/* section 1 */}
            <div className="bg-secondary_color mb-5 text-sm rounded-lg px-4 py-2">
                <span className="font-sans cursor-pointer">الرئيسية</span>
                <span className="mx-1">/</span>
                <span className="font-medium cursor-pointer"> الباقات</span>
            </div>

            {/* section 2 */}
            <div className="my-8">
                <h2 className='text-xl mb-3 font-medium'>الباقات</h2>
                <p className='text-gray-500'>استفد من مجموعة متنوعة من المزايا حسب احتياجك</p>           
            </div>

            <div className='grid md:grid-cols-3 grid-cols-1 gap-10 mb-20'>
                {pakages.map((pack, index) => {
                    return <PackageItem key={pack._id} pack={pack} index={index}/>
                })}
                {/* {pakages.map((pack, index) => {
                    return <PackageItem key={pack._id} pack={pack} index={1}/>
                })} */}
            </div>
    </div>
  )
}
