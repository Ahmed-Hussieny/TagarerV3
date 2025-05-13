import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import imgB1 from '../../assets/Images/homeB1.svg'
import imgB1S from '../../assets/Images/homeB1S.png'
import imgS1 from '../../assets/Images/homeS1.svg'
// import imgS12 from '../../assets/Images/homeS12.png'
import FitComp from '../../components/Custom/FitComp'
import fitImg1 from '../../assets/Images/Fit/1.svg';
import fitImg2 from '../../assets/Images/Fit/2.svg';
import fitImg3 from '../../assets/Images/Fit/3.svg';
import fitImg4 from '../../assets/Images/Fit/4.svg';
import whyImg from '../../assets/Images/Fit/5.svg';
import iconTrue from '../../assets/Icons/true.svg';
import whyImg1 from '../../assets/Images/why/1.svg';
import whyImg2 from '../../assets/Images/why/2.svg';
import whyImg3 from '../../assets/Images/why/3.svg';
import imgB2 from '../../assets/Images/homeB2.svg'
import kindImg1 from '../../assets/Images/kind/1.svg';
import kindImg2 from '../../assets/Images/kind/2.svg';
import kindImg3 from '../../assets/Images/kind/3.svg';
import kindImg4 from '../../assets/Images/kind/4.svg';
import imgB3 from '../../assets/Images/homeB3.svg'
import FAQItem from '../../components/Custom/FAQItem';
import CarouselComponent from '../../components/CarouselComponent/CarouselComponent';
import { useSelector } from 'react-redux';
import { Seo } from '../../Interfaces/seo';

export default function HomePage() {

    const navigate = useNavigate();
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
    const {SeoData} = useSelector((state:
        { user: { SeoData: Seo } })  => state.user);
    
    const faqItems = [
        {
            title: "ما هو موقع تقارير؟",
            description: "هو منصة إلكترونية تجمع التقارير والدراسات والأدلة المعرفية من مصادر موثوقة، مثل الجهات الحكومية، الشركات، والقطاع الثالث. الهدف هو تسهيل الوصول إلى المعلومات التي يصعب العثور عليها بسبب تعدد المصادر وتشتت البيانات، حيث يمكن البحث عن التقارير، الاطلاع عليها، وتحميلها بسهولة.",
        },
        {
            title: "هل يمكنني تحميل التقارير مباشرة؟",
            description: "نعم، يمكنك الاطلاع على التقارير وتحميلها مباشرة من الموقع.لكن: بعض التقارير قد تتطلب الاشتراك للوصول إلى خاصية التحميل، وذلك لضمان تقديم أفضل خدمة للمستخدمين.",
        },
        {
            title: `كيف يمكنني البحث عن تقرير معين؟`,
            description: `موقع تقارير يوفر نظام بحث متقدم يسهل عليك الوصول إلى التقارير المطلوبة عبر عدة طرق:
      البحث بالكلمات المفتاحية: يمكنك كتابة اسم التقرير أو جزء منه في شريط البحث.
      البحث بالفلاتر:  يمكنك تصفية النتائج حسب نوع التقرير، الجهة الناشرة، سنة الإصدار.`,
        },
        {
            title: `هل التقارير الموجودة على الموقع محدثة؟`,
            description: `يعمل فريق موقع تقارير على تحديث قاعدة البيانات باستمرار وإضافة أحدث التقارير الصادرة من الجهات الموثوقة.
      كما يمكنك المساهمة باقتراح إضافة أو تحديث أي تقرير جديد عبر البريد الإلكتروني الموجود على الموقع.`,
        },
        {
            title: "هل يمكنني المساهمة في إضافة تقارير جديدة؟",
            description: "نعم، يمكنك اقتراح تقارير جديدة لإضافتها إلى المنصة.كيف ذلك؟ يمكنك إرسال اقتراحك عبر البريد الإلكتروني المتاح على الموقع.جميع التقارير المقترحة تخضع للمراجعة قبل النشر لضمان جودتها ومصداقيتها.",
        },
        {
            title: `كيف يتم جمع وإضافة التقارير إلى الموقع؟`,
            description: `على مدار أكثر من سنتين، قام فريق موقع تقارير بجمع التقارير من مصادر موثوقة، مراجعتها، تصنيفها، وتوفيرها للباحثين والمهتمين.
    يتم تحديث قاعدة البيانات بشكل مستمر لضمان توفر أحدث التقارير وأكثرها دقة.`,
        },

        {
            title: `ما هي الأدلة المعرفية؟ وكيف تختلف عن التقارير؟`,
            description: `📌 الأدلة المعرفية هي مستندات تهدف إلى تقديم معلومات مختصرة وتوجيهية حول موضوع معين.
    📌 التقارير عادةً ما تكون أكثر تفصيلاً وتحتوي على دراسات تحليلية وأبحاث موسعة، بينما الأدلة المعرفية تكون ملخصات عملية قابلة للتطبيق.
    مثال على الأدلة المعرفية: أدلة إرشادية، كتيبات تعليمية، خطوات تنفيذية لمهام محددة.`,
        },
        {
            title: `هل يمكنني مشاركة تقرير معين مع الآخرين؟`,
            description: `نعم، يمكنك مشاركة رابط التقرير مباشرة عبر وسائل التواصل الاجتماعي أو البريد الإلكتروني.`,
        },

        {
            title: `هل يمكنني التواصل مع فريق موقع تقارير لطلب دعم أو استفسار؟`,
            description: `بالتأكيد! يمكنك التواصل معنا عبر البريد الإلكتروني الموجود على الموقع.`,
        },
    ];

    const handleExpand = (index: number) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };
    
    return (
        <>
            {/* Helmet */}
            <Helmet>
                <title>{`${SeoData?.mainTitle}`}</title>
                <meta name="description" content={SeoData?.mainDescription} />
            </Helmet>

            {/* section 1 */}
            <section className="bg-gradient-to-tr relative from-[#AADDD5] via-[#AADDD54D] to-white overflow-hidden">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 grid-cols-1 items-center">
                        {/* Text Content Section */}
                        <div className="md:mb-6 my-6 text-right">
                            <div className="flex mb-4">
                                <span className="bg-[#F2F2F2] text-main_color px-4 py-2 rounded-lg text-base sm:text-lg md:text-xl">
                                    منصة التقارير
                                </span>
                            </div>
                            <h1 className="font-bold text-black mb-4 md:text-6xl text-3xl ">
                                مرجعك الأول <span className="text-[#0F9A83]">للتقارير</span>
                            </h1>
                            <h1 className="font-bold text-black mb-4 md:text-6xl text-3xl ">
                                والدراسات في السعودية
                            </h1>
                            <p className="text-gray-600 mb-6 pt-3 w-full md:w-2/3 text-sm">
                                سهولة الوصول إلى التقارير والأبحاث والدراسات المنشورة من الجهات
                                الحكومية
                                والشركات والقطاع الثالث – في مكان واحد.
                            </p>
                            <div className="flex gap-3 sm:gap-4">
                                <button onClick={() => navigate('/search')} className="bg-main_color text-white px-3 sm:px-6 py-2 rounded-xl text-sm sm:text-base h-12 md:w-46 w-1/2 sm:w-40 hover:opacity-90">
                                    تصفح التقارير
                                </button>
                                <button onClick={() => navigate('/aboutus')} className="bg-secondary_color text-main_color px-3 sm:px-6 py-2 rounded-xl text-sm sm:text-base h-12 md:w-46 w-1/2 sm:w-40 hover:opacity-90">
                                    المزيد عن تقارير
                                </button>
                            </div>
                        </div>

                        {/* Image Section */}
                        <div className="relative">
                            <div className="relative flex justify-center" >
                                <img
                                    alt="Hero illustration"
                                    className="object-contain  hidden md:block"
                                    src={imgB1}
                                />
                                <img
                                    alt="Hero illustration"
                                    className="object-contain md:hidden block"
                                    src={imgB1S}
                                />
                                {/* imgB1S */}
                                <div
                                    className="absolute translate-x-30 -translate-y-2/3  hidden md:block"
                                    style={{
                                        top: '35%',
                                        left: '65%',
                                    }}
                                >
                                    <img
                                    alt="Hero illustration"
                                    className="object-contain"
                                    src={imgS1}
                                />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* section 2 */}
            <section className="py-20 container mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className='text-2xl mb-3 font-medium'>اكتشف مميزاتنا</h2>
                <p className='text-gray-500'>أهم الخصائص التي تجعل "تقارير" وجهتك الأولى للمعرفة.</p>

                <div className='grid md:grid-cols-4 gap-5 mt-8'>
                    <FitComp img={fitImg1} title='بحث متقدم وسريع' description='ابحث عن التقارير بسهولة حسب الجهة، المجال، أو الكلمات المفتاحية.' />
                    <FitComp img={fitImg2} title='تحميل مباشر' description='حمل التقارير بجودة عالية دون تعقيدات أو صعوبات.' />
                    <FitComp img={fitImg3} title='روابط محدثة دائمًا' description='تأكد من وصولك إلى التقارير دون عناء الروابط المعطلة.' />
                    <FitComp img={fitImg4} title='قاعدة بيانات متكاملة' description='مجموعة شاملة من التقارير في كل المجالات  في مكان واحد.' />
                </div>
            </section>

            {/* section 3 */}
            <section className="md:py-20 py-10 container mx-auto px-4 sm:px-6 lg:px-8">
                <div className='grid md:grid-cols-2 grid-cols-1 gap-5 items-center'>
                    <div>
                        <img src={whyImg} alt='whyImg' />
                    </div>
                    <div className='md:px-10'>
                        <h2 className='text-2xl mb-3 font-medium'>لماذا تقارير؟</h2>
                        <p className='text-gray-500 my-4'>في ظل تشتت التقارير والدراسات في منصات متعددة، جاء "تقارير" ليكون الحل الأمثل للباحثين والمهتمين. نقدم قاعدة بيانات متجددة للتقارير والأبحاث الرسمية، مع إمكانية الاطلاع المباشر أو التحميل بسهولة.</p>
                        <div className='flex items-center gap-3'>
                            <img src={iconTrue} className='w-9' alt='iconTrue' />
                            <p className='text-text_color font-medium'>الوصول السريع إلى التقارير الرسمية</p>
                        </div>
                        <div className='flex items-center my-4 gap-3'>
                            <img src={iconTrue} className='w-9' alt='iconTrue' />
                            <p className='text-text_color font-medium'>تحميل الملفات بضغطة زر</p>
                        </div>
                        <div className='flex items-center gap-3'>
                            <img src={iconTrue} className='w-9' alt='iconTrue' />
                            <p className='text-text_color font-medium'>البحث الذكي حسب الجهة أو المجال</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* section 4 */}
            <section className="md:py-20 py-10 container mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className='text-2xl mb-3 font-medium'>كيف يعمل موقع تقارير؟</h2>
                <p className='text-gray-500'> خطوات بسيطة للوصول إلى المعلومات بسهولة.</p>

                <div className='grid md:grid-cols-3 gap-5 mt-8'>
                    <FitComp img={whyImg1} title='ابحث عن التقرير' description='أدخل اسم التقرير أو جزء من الاسم، أو يمكن اختيار نوع معين من التقارير أو تحديد جهة المصدر' />
                    <FitComp img={whyImg2} title='تصفح النتائج' description='استعرض قائمة التقارير المتاحة، مع عرض تفاصيل مثل اسم الجهة المصدرة، تاريخ النشر، ووصف مختصر لمحتوى التقرير.' />
                    <FitComp img={whyImg3} title=' عرض أو تحميل' description='يمكنك من خلال منصة تقارير قراءة التقرير مباشرة عبر المنصة أو تحميله بجودة عالية للاحتفاظ به والرجوع إليه في أي وقت.' />
                </div>
            </section>

            {/* section 5 */}
            <section className="md:py-20 py-10 container mx-auto px-4 sm:px-6 lg:px-8">
                <div className='grid md:grid-cols-2 grid-cols-1 gap-5 items-center'>
                    <div className='pe-10 order-2 md:order-1'>
                        <h2 className='text-3xl mb-3 font-bold'>مصدر موثوق لكل تقرير تحتاجه</h2>
                        <p className='text-gray-500 my-6'>بدلاً من البحث في عشرات المواقع والمنصات المختلفة، يمنحك "تقارير" وصولاً سريعًا ومباشرًا إلى التقارير والأبحاث الرسمية في المملكة العربية السعودية. استمتع ببحث متقدم، تحميل فوري، وروابط محدثة دائمًا – كل ذلك في مكان واحد، لتوفير وقتك وجهدك!</p>
                        <button onClick={() => navigate('/search')} className="bg-main_color text-white px-3 sm:px-6 py-2 rounded-xl text-sm sm:text-base h-12 md:w-46 w-1/2 sm:w-40 hover:opacity-90">
                            عرض التقارير
                        </button>
                    </div>

                    <div className='order-1 md:order-2'>
                        <img src={imgB2} alt='imgB2' />
                    </div>
                </div>
            </section>

            {/* section 6 */}
            <section className="py-20 container mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className='text-2xl mb-3 font-medium'>أنواع التقارير المتاحة</h2>
                <p className='text-gray-500'>مجموعة متنوعة من التقارير في مختلف المجالات.</p>

                <div className='grid md:grid-cols-4 gap-5 mt-8'>
                    <FitComp center img={kindImg1} title='تقارير حكومية' description='إصدارات رسمية من الوزارات والهيئات وغيرها من الأجهزة الحكومية' />
                    <FitComp center img={kindImg2} title='الدراسات الاقتصادية' description='تقارير عن الأسواق، الاستثمارات، والاقتصاد المحلي.' />
                    <FitComp center img={kindImg3} title='تقارير الشركات' description='التقارير السنوية والاستشارية ، والمسؤولية الاجتماعية في مختلف القطاعات' />
                    <FitComp center img={kindImg4} title='تقارير القطاع الثالث' description='إحصائيات وتقارير من الجمعيات والمنظمات غير الربحية.' />
                </div>
            </section>

            {/* section 7 */}
            <section className="md:py-20 py-10 container mx-auto px-4 sm:px-6 lg:px-8">
                <div className='grid md:grid-cols-2 grid-cols-1 gap-5 items-center'>
                    <div className='ةي:ps-10 order-2 md:order-2'>
                        <h2 className='text-3xl mb-3 font-bold'>التقارير في كل أنحاء المملكة</h2>
                        <p className='text-gray-500 my-6'>أينما كنت في المملكة، يتيح لك "تقارير" الوصول السريع إلى أحدث الإصدارات الرسمية من الجهات الحكومية، الشركات، والمنظمات غير الربحية. استكشف الدراسات والأبحاث بسهولة، وابحث عن المعلومات التي تحتاجها بضغطة زر، دون الحاجة للتنقل بين عشرات المواقع المختلفة.</p>
                        <button onClick={() => navigate('/search')} className="bg-main_color text-white px-3 sm:px-6 py-2 rounded-xl text-sm sm:text-base h-12 md:w-46 w-1/2 sm:w-40 hover:opacity-90">
                            قراءة المزيد
                        </button>
                    </div>

                    <div className='order-1 md:order-1'>
                        <img src={imgB3} alt='imgB3' />
                    </div>
                </div>
            </section>

            {/* section 8 */}
            <section className="md:py-20 py-10 container mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className='text-2xl mb-3 font-medium'>مصادرنا الموثوقة</h2>
                <p className='text-gray-500'> تقارير رسمية من جهات حكومية، اقتصادية، وأكاديمية.</p>
                <CarouselComponent />
            </section>

            {/* section 9 */}
            <section className="md:py-20 py-10 container mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className='text-2xl mb-3 font-medium'>الأسئلة الشائعة</h2>
                <p className='text-gray-500'>إجابات لأكثر الأسئلة المتداولة حول المنصة</p>

                {faqItems.map((item, index) => (
                    <FAQItem
                        key={index}
                        title={item.title}
                        description={item.description}
                        isExpanded={expandedIndex === index}
                        onExpand={() => handleExpand(index)}
                    />
                ))}
            </section>
        </>
    )
}
