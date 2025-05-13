import { Package } from "../../Interfaces/Package";
import RiyalIconBlack from '../../assets/Images/Packages/Riyal.svg';
import RiyalIconWhite from '../../assets/Images/Packages/RiyalWhite.svg';
import trueBlackIcon from '../../assets/Images/Packages/trueBlack.svg';
import trueWhiteIcon from '../../assets/Images/Packages/trueWhite.svg';
export default function PackageItem({pack, index}:{
  pack: Package,
  index: number
}) {
  return (
    <div className={`border p-4 rounded-2xl ${index%2===0?"":"bg-main_color text-white"}`}>
      <div className={`flex flex-col items-center`}>
        <p className="font-medium">{pack.name}</p>
        <p className={`text-xs my-4 ${index%2===0?"text-gray-500":"text-gray-200"}`}>{pack.description}</p>
        <p className={`text-sm font-medium ${index%2===0?"text-gray-500":"text-gray-200"}`}>{pack.duration >= 30 ?"شهريا":"يوميا"}</p>

        <p className={`text-sm flex items-center ${index%2===0?"text-black":"text-gray-200"} my-4`}>
          <span className="text-2xl me-2 font-semibold">{pack.price}</span>
          {index%2===0?
          <img className="w-6" src={RiyalIconBlack} alt="RiyalIcon"/>
          :<img className="w-6" src={RiyalIconWhite} alt="RiyalIconWhite"/>}
        </p>

        
      </div>
        <div className="text-end my-5">
          {pack.features.map((feature)=>{
            return <div className="flex my-3">
              {index%2===0 ? 
                <img className="w-4 me-2" src={trueBlackIcon} alt="trueBlackIcon"/>
              :
                <img className="w-4 me-2" src={trueWhiteIcon} alt="trueWhiteIcon"/>
                }
                <p className="text-xs">{feature}</p>
            </div>
          })}
        </div>

        <button className={`w-full mt-5 bg-blue-100 py-2 text-xs rounded-lg ${index%2===0?"bg-main_color text-white":"bg-white text-main_color"}`}>اختر الباقة</button>
    </div>
  )
}
