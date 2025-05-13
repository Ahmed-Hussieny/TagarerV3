import img1 from '../../assets/Images/AboutUs/1.png';
import img2 from '../../assets/Images/AboutUs/2.png';
import img3 from '../../assets/Images/AboutUs/3.png';
import img4 from '../../assets/Images/AboutUs/4.png';
import img5 from '../../assets/Images/AboutUs/5.png';
import FitComp from '../../components/Custom/FitComp';
import fitImg1 from '../../assets/Images/AboutUs/aboutFit1.svg';
import fitImg2 from '../../assets/Images/AboutUs/aboutFit2.svg';
import fitImg3 from '../../assets/Images/AboutUs/aboutFit3.svg';
import fitImg4 from '../../assets/Images/AboutUs/aboutFit4.svg';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Seo } from '../../Interfaces/seo';
export default function AboutUs() {
    const navigate = useNavigate();
    const {SeoData} = useSelector((state: { user: { SeoData: Seo } })  => state.user);
  return (
    <div className="my-5 container mx-auto mt-24 px-3">
            {/* Helmet */}
            <Helmet>
                <title>{`${SeoData?.aboutTitle}`}</title>
                <meta name="description" content= {SeoData?.aboutDescription} />
            </Helmet>

            {/* section 1 */}
            <div className="bg-secondary_color mb-5 text-sm rounded-lg px-4 py-2">
                <span className="font-sans cursor-pointer">الرئيسية</span>
                <span className="mx-1">/</span>
                <span className="font-medium cursor-pointer">من نحن</span>
            </div>

            {/* section 2 */}
            <div className="grid grid-cols-1 gap-8 mt-10 px-4">
                <div className="grid md:grid-cols-3 grid-cols-1 md:gap-5 order-1 md:order-0">
                    <div>
                        <img src={img1} alt="img1"/>
                    </div>
                    <div className="col-span-2 gap-3 md:m-0 mt-3 grid md:grid-cols-2 grid-cols-2 md:gap-5">
                        <div>
                            <img src={img2} alt="img2"/>
                        </div>
                        <div>
                            <img src={img3} alt="img3"/>
                        </div>
                    </div>
                </div>

                <div className='order-0 md:order-1 px-2 md:px-0'>
                    <h4 className='text-3xl font-bold'>من نحن</h4>
                    <p className='pe-4 text-lg text-gray-800 mt-5'>يوفّر موقع تقارير قاعدة بيانات للتقارير والدراسات والأدلة المعرفية المنشورة والمعدة لغرض التداول، والتي تصدرها الجهات الحكومية أو الشركات أو القطاع الثالث.

يعاني الباحثين والمهتمين من صعوبة في الوصول السريع والسهل إلى هذه الإصدارات لتفرقها في مواقع إلكترونية ومنصات تواصل مختلفة ومتعددة، أو لتعطل روابط الوصول إلى هذه الإصدارات مع مرور الوقت.

يسعى موقع تقارير إلى تقديم تجربة مستخدم سريعة وسهلة للوصول إلى هذه الإصدارات المتداولة، مع بيان اسم الجهة المصدرة ورابط الوصول لها، مع إمكانية الاطلاع والتحميل
                    </p>
                </div>
            </div>

            {/* section 3 */}
            <section className="md:py-20 py-16 container mx-auto px-4 sm:px-6 lg:px-8">
                <div className='grid md:grid-cols-2 grid-cols-1 gap-5 items-center'>
                    <div className='md:ps-10 order-2 md:order-2'>
                        <h2 className='text-3xl mb-3 font-bold'>التقارير والدراسات</h2>
                        <p className='text-gray-500 my-6'>يحتوي هذا القسم على مجموعة من التقارير الرسمية الصادرة عن الجهات الحكومية في المملكة، تغطي مواضيع متنوعة في التنمية، الاقتصاد، التعليم، الصحة وغيرها. صُمّم القسم ليسهّل على المستخدم الوصول للمعلومة الدقيقة وتحميلها بضغطة واحدة.</p>
                        <button onClick={()=>navigate('/search')} className="bg-main_color text-white px-3 sm:px-6 py-2 rounded-xl text-sm sm:text-base h-12 md:w-46 w-1/2 sm:w-40 hover:opacity-90">
                            التقارير
                        </button>
                    </div>

                    <div className='order-1 md:order-1'>
                        <img src={img4} alt='imgB3' />
                    </div>
                </div>
            </section>

            {/* section 4 */}
            <section className="py-10 container mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className='text-2xl mb-3 font-medium'>لمن هذه المنصة؟</h2>
                <p className='text-gray-500'>منصتنا صُممت لتخدم فئات متعددة تسعى للوصول إلى محتوى موثوق</p>

                <div className='grid md:grid-cols-4 gap-5 mt-8'>
                    <FitComp img={fitImg1} title='المستثمرين' description='ابحث عن التقارير بسهولة حسب الجهة، المجال، أو الكلمات المفتاحية.' />
                    <FitComp img={fitImg2} title='المتخصصين' description='مصادر معرفية تدعم تطورك المهني وتبقيك على اطلاع دائم.' />
                    <FitComp img={fitImg3} title='الاستشاريين' description='تحليلات وبيانات موثوقة تعزز توصياتك واستراتيجياتك للعملاء.' />
                    <FitComp img={fitImg4} title='الباحثين' description='تقارير ومراجع داعمة للأبحاث والدراسات الأكاديمية باحترافية.' />
                </div>
            </section>

            {/* section 5 */}
            <section className="md:py-20 py-10 container mx-auto px-4 sm:px-6 lg:px-8">
                <div className='grid md:grid-cols-2 grid-cols-1 gap-5 items-center'>
                <div className='order-1 md:order-2'>
                        <img src={img5} alt='img5' />
                    </div>
                    <div className='md:ps-10 order-2 md:order-1'>
                        <h2 className='text-3xl mb-3 font-bold'>الأدلة المعرفية</h2>
                        <p className='text-gray-500 my-6'>يوفّر هذا القسم مكتبة شاملة من الأدلة الإرشادية الصادرة عن الجهات المختصة، والتي تهدف إلى توضيح الإجراءات، المفاهيم، والخدمات بطريقة مبسطة ومباشرة. دليل عملي لكل من يبحث عن فهم أعمق للأنظمة والخدمات.</p>
                        <button onClick={()=>navigate('/guides')} className="bg-main_color text-white px-3 sm:px-6 py-2 rounded-xl text-sm sm:text-base h-12 md:w-46 w-1/2 sm:w-40 hover:opacity-90">
                        الأدلة المعرفية
                        </button>
                    </div>

                    
                </div>
            </section>
      
    </div>
  )
}
