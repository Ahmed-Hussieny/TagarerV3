import { Footer, FooterLinkGroup } from "flowbite-react";
import logo from '../../assets/Images/logoF.png';
import xIcon from '../../assets/Icons/x.svg';
import linkedInIcon from '../../assets/Icons/linkedIn.svg';
import emailIcon from '../../assets/Icons/email.svg';
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { handleSubscribe } from "../../Store/user.slice";
import { useAppDispatch } from "../../Store/store";
// Validation schema
const subscriptionSchema = Yup.object().shape({
    email: Yup.string()
        .email('البريد الإلكتروني غير صالح')
        .required('البريد الإلكتروني مطلوب'),
});

interface SubscriptionFormValues {
    email: string;
}

export function FooterC() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const goForMail = () => {
        window.location.href = "mailto:info@Tagarer.com";
    };

    const goForX = () => {
        window.open("https://x.com/tagarer_sa?s=21&t=A3Lk6rde9-m2M3uA90caFA", "_blank");
    }

    const goForLinkedIn = () => {
        window.open("https://www.linkedin.com/company/tagarer/about/", "_blank");
    }

    const handleSubscription = async (values: SubscriptionFormValues, { resetForm }: any) => {
        try {
            // Replace with your actual API endpoint
            const data = await dispatch(handleSubscribe(values.email))
            if (data.payload.success) {
                toast.success('تم الاشتراك بنجاح!');
                resetForm();
                navigate('/thankYou');
            }
        } catch (error) {
            toast.error('حدث خطأ أثناء الاشتراك. يرجى المحاولة مرة أخرى.');
        }
    };
    
    return (
        <Footer className=" text-white rounded-none">

            <div className="w-full bg-main_color">
                <div className="h-2 w-full bg-dark_color"></div>
                <div className="container grid md:grid-cols-7 md:gap-10 grid-cols-1 m-auto md:px-16 px-8 py-8 ">
                    <div className="col-span-3">
                        <img className="w-32" src={logo} alt="logo" />
                        <p className="mt-4 text-sm">تقارير هي منصة تجمع التقارير والدراسات الرسمية في السعودية، مما يتيح للمستخدمين البحث، الاطلاع، وتحميلها بسهولة من مصادر موثوقة.</p>
                        <div className="mt-4">
                          <h1 className="text-white text-xl my-2 font-bold">الاشتراك</h1>
                          <p className="text-white text-sm">تقارير - كل جديد في بريد.</p>
                          <Formik
                            initialValues={{ email: '' }}
                            validationSchema={subscriptionSchema}
                            onSubmit={handleSubscription}
                          >
                            {({ isSubmitting }) => (
                              <Form className="flex mt-4 md:pe-10">
                                <div className="w-full">
                                  <Field
                                    type="email"
                                    name="email"
                                    placeholder="البريد الإلكتروني"
                                    className="w-full p-2 rounded-md text-main_color bg-main_color placeholder:text-white focus:bg-white focus:text-main_color outline-none shadow-none"
                                  />
                                </div>
                                <button
                                  type="submit"
                                  disabled={isSubmitting}
                                  className="bg-dark_color text-white p-2 rounded-md ms-2"
                                >
                                  {isSubmitting ? 'جاري الاشتراك...' : 'الاشتراك'}
                                </button>
                              </Form>
                            )}
                          </Formik>
                        </div>
                        <div className="flex mt-4">
                          <img onClick={goForX} className="w-5 cursor-pointer" src={xIcon} alt="xIcon"/>
                          <img onClick={goForLinkedIn} className="w-5 ms-5 cursor-pointer" src={linkedInIcon} alt="linkedInIcon"/>
                        </div>
                        
                    </div>

                    <div className="col-span-3 md:m-0 mt-10">
                        <div>
                            <p className="text-white text-xl font-bold">روابط سريعة</p>
                        </div>
                        <div className="hidden md:block">
                            <FooterLinkGroup col className="grid md:grid-cols-2 grid-cols-1 gap-4 ">
                            <a href="/">
                                <div className='flex mt-6 items-center cursor-pointer' onClick={() => navigate('/Governmental')}>
                                    <span className="text-[#EAF7E8]"> الرئيسية</span>
                                </div>
                            </a>
                            <a href="/articles">
                                <div className='flex items-center cursor-pointer' onClick={() => navigate('/articles')}>
                                    <span className="text-[#EAF7E8]"> المدوّنة</span>
                                </div>
                            </a>
                            <a href="/search">
                                <div className='flex items-center cursor-pointer' onClick={() => navigate('/search')}>
                                    <span className="text-[#EAF7E8]"> التقارير و الدراسات</span>
                                </div>
                            </a>
                            <a href="/governmentals">
                                <div className='flex items-center cursor-pointer' onClick={() => navigate('/governmentals')}>
                                    <span className="text-[#EAF7E8]"> الجهات الحكومية</span>
                                </div>
                            </a>
                            <a href="/guides">
                                <div className='flex items-center cursor-pointer' onClick={() => navigate('/guides')}>
                                    <span className="text-[#EAF7E8]"> الأدلة المعرفية</span>
                                </div>
                            </a>
                            <a href="/privacyPolicy">
                                <div className='flex items-center cursor-pointer' onClick={() => navigate('/privacyPolicy')}>
                                    <span className="text-[#EAF7E8]"> سياسة الخصوصية</span>
                                </div>
                            </a>
                            <a href="/aboutus">
                                <div className='flex items-center cursor-pointer' onClick={() => navigate('/aboutus')}>
                                    <span className="text-[#EAF7E8]"> من نحن</span>
                                </div>
                            </a>
                            <a href="/termsAndConditions">
                                <div className='flex items-center cursor-pointer' onClick={() => navigate('/termsAndConditions')}>
                                    <span className="text-[#EAF7E8]"> الشروط و الأحكام</span>
                                </div>
                            </a>
                        </FooterLinkGroup>
                        </div>
                        <div className="block md:hidden">
                            <FooterLinkGroup col className="">
                            <a href="/">
                                <div className='flex mt-6 items-center cursor-pointer' onClick={() => navigate('/Governmental')}>
                                    <span className="text-[#EAF7E8]"> الرئيسية</span>
                                </div>
                            </a>
                            <a href="/aboutus">
                                <div className='flex items-center cursor-pointer' onClick={() => navigate('/aboutus')}>
                                    <span className="text-[#EAF7E8]"> من نحن</span>
                                </div>
                            </a>
                            <a href="/search">
                                <div className='flex items-center cursor-pointer' onClick={() => navigate('/search')}>
                                    <span className="text-[#EAF7E8]"> التقارير و الدراسات</span>
                                </div>
                            </a>
                            <a href="/guides">
                                <div className='flex items-center cursor-pointer' onClick={() => navigate('/guides')}>
                                    <span className="text-[#EAF7E8]"> الأدلة المعرفية</span>
                                </div>
                            </a>
                            <a href="/governmentals">
                                <div className='flex items-center cursor-pointer' onClick={() => navigate('/governmentals')}>
                                    <span className="text-[#EAF7E8]"> الجهات الحكومية</span>
                                </div>
                            </a>
                            <a href="/termsAndConditions">
                                <div className='flex items-center cursor-pointer' onClick={() => navigate('/termsAndConditions')}>
                                    <span className="text-[#EAF7E8]"> الشروط و الأحكام</span>
                                </div>
                            </a>
                            
                            <a href="/privacyPolicy">
                                <div className='flex items-center cursor-pointer' onClick={() => navigate('/privacyPolicy')}>
                                    <span className="text-[#EAF7E8]"> سياسة الخصوصية</span>
                                </div>
                            </a>
                            <a href="/articles">
                                <div className='flex items-center cursor-pointer' onClick={() => navigate('/articles')}>
                                    <span className="text-[#EAF7E8]"> المدوّنة</span>
                                </div>
                            </a>
                        </FooterLinkGroup>
                        </div>
                    </div>

                    <div className="col-span-1 md:m-0 mt-10">
                    <div>
                            <p className="text-white text-xl font-bold md:text-end text-start">بيانات التواصل</p>
                        </div>
                        <FooterLinkGroup col dir="ltr" className="text-white">
                            <div className='mt-6 '>
                                <p>TAGARER LTD</p>
                                <p>Registered in England and Wales</p>
                                <p>Company Number: 16173662</p>
                                <p>Registered Office :</p>
                                <p>Office 11244</p>
                                <p>182-184 High Street North</p>
                                <p>East Ham, London</p>
                                <p>E6 2JA</p>
                            </div>
                            <div className='flex items-center cursor-pointer' onClick={goForMail}>
                                <img className="w-8 me-2" src={emailIcon} alt="smsicon" />
                                <span> info@Tagarer.com</span>
                            </div>
                        </FooterLinkGroup>
                    </div>
                </div>
                <div className="w-full bg-dark_color text-center px-12 py-4">
                  <p>جميع الحقوق محفوظة لمنصة تقارير © 2024</p>
                </div>
            </div>
        </Footer>
    );
}
