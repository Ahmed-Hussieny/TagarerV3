export default function FitComp({
    title,
    description,
    img,
    center,
}:{
    title: string;
    description: string;
    img: string;
    center?: boolean;
}) {
  return (
    <div className={`border-2 border-[##EEEEEE] rounded-xl p-4 w-full h-full ${center?"flex items-center flex-col":""}`}>
        <img width={85} src={img} alt='img'/>
        <h2 className='text-xl my-3 font-medium'>{title}</h2>
        <p className={`text-gray-500 ${center?"text-center":""}`}>{description}</p>
    </div>
  )
}
