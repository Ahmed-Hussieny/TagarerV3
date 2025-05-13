import { useState } from "react";
import { useFormik } from "formik"
import * as YUP from 'yup';
import { useAppDispatch } from "../../Store/store";
import { HandelForgotPassword } from "../../Store/user.slice";
import logo from '../../assets/Images/logo.png'
import img1 from '../../assets/Images/loginImage.svg';
import img2 from '../../assets/Images/loginWords.svg';
import { Helmet } from "react-helmet-async";
export default function ForgotPassword() {
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [messageColor, setMessageColor] = useState("text-red-600");

    const validationSchema = YUP.object({
        email: YUP.string().email("الرجاء ادخال بريد الكتروني صحيح").required(" البريد الالكتروني مطلوب"),
    });
    const forgotPasswordForm = useFormik({
        initialValues: {
            email: ''
        },
        validationSchema,
        onSubmit: async (values) => {
            setLoading(true);
            const data = await dispatch(HandelForgotPassword(values.email));
            if (data.payload.success) {
                setErrorMessage('تم ارسال رابط استعادة كلمة المرور الى بريدك الالكتروني');
                setMessageColor("text-green-600");
            }
            setLoading(false);
        }

    });

    return (
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
            <Helmet>
                <title>إعادة تعيين كلمة المرور</title>
                <meta name="description" content="إعادة تعيين كلمة المرور" />
            </Helmet>
            <div className="bg-main_color h-screen hidden md:block">
                <div className='flex w-full h-full items-center flex-col justify-center'>
                    <div className=''>
                        <img className='w-5/6 m-auto' src={img1} alt='img1' />
                    </div>
                    <div className='relative -bottom-6'>
                        <img className='w-2/3  m-auto' src={img2} alt='img2' />
                    </div>
                </div>
            </div>
            <div className='p-10 md:px-16 h-screen flex flex-col justify-between' dir='rtl'>

                <div>
                    <img className='md:w-32 my-6 w-20' src={logo} alt='logo' />
                    <h2 className='md:text-2xl text- font-bold'>نسيت كلمة المرور</h2>
                    <p className='text-gray-500 mt-2'>أدخل بريدك الإلكتروني لاستلام رابط إعادة تعيين كلمة المرور واستعادة الوصول إلى حسابك.</p>
                </div>

                <form onSubmit={forgotPasswordForm.handleSubmit} className="flex-1 flex flex-col justify-between">
                    <div className="mb-3 flex-1 flex justify-center flex-col" >
                        <label htmlFor="email" className="block mb-3 text-gray-700">
                            البريد الالكتروني
                        </label>
                        <input
                            type="email"
                            className="w-full p-2 border border-gray-100 bg-[#F7F7F7] rounded-lg"
                            id="email"
                            name="email"
                            placeholder="ادخل البريد الالكتروني هنا"
                            onChange={forgotPasswordForm.handleChange}
                            onBlur={forgotPasswordForm.handleBlur}
                            value={forgotPasswordForm.values.email}
                        />
                        {forgotPasswordForm.touched.email && forgotPasswordForm.errors.email && (
                            <div className="text-red-600 text-sm mt-1">
                                {forgotPasswordForm.errors.email}
                            </div>
                        )}
                        {errorMessage && errorMessage !== 'تم ارسال رابط استعادة كلمة المرور الى بريدك الالكتروني' && (
                            <div className={`${messageColor} text-sm bg-[#FF00001A] p-5 rounded-lg mt-5`}>
                                <p className="text-black font-medium">خطأ</p>
                                <p>{errorMessage}</p>
                            </div>)}
                        {errorMessage && (
                            <div className={`${messageColor} text-sm bg-[#53CD3F1A] p-5 rounded-lg mt-5`}>
                                {/* <p className="text-black font-medium">تم ارسال رابط الاستعادة</p> */}
                                <p>{errorMessage}</p>
                            </div>)}
                    </div>

                    <>
                        {loading ? (
                            <button
                                type="button"
                                className="w-full p-2 bg-gray-500 text-white rounded-lg"
                                disabled
                                title="Loading"
                            >
                                <i className="fa-solid fa-spinner fa-spin"></i>
                                جاري التحميل ...
                            </button>
                        ) : (
                            <button
                                disabled={!(forgotPasswordForm.isValid && forgotPasswordForm.dirty)}
                                type="submit"
                                className="w-full p-2 bg-main_color text-white rounded-lg hover:opacity-80"
                            >
                                تأكيد
                            </button>
                        )}

                    </>
                </form>
            </div>
        </div>
    );
}
