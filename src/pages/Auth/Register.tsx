import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as YUP from 'yup';
import { useAppDispatch } from "../../Store/store";
import { handleRegister } from "../../Store/user.slice";
import img1 from '../../assets/Images/loginImage.svg';
import img2 from '../../assets/Images/loginWords.svg';
import logo from '../../assets/Images/logo.png';
import { Helmet } from "react-helmet-async";

export default function Register() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [downloadErrorMessage, setDownloadErrorMessage] = useState("");
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [messageColor, setMessageColor] = useState("text-red-600");
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const validationSchema = YUP.object({
        username: YUP.string().required("الاسم مطلوب"),
        email: YUP.string().email("الرجاء ادخال بريد الكتروني صحيح").required(" البريد الالكتروني مطلوب"),
        password: YUP.string().min(6, "يجب أن تكون كلمة المرور 6 أحرف على الأقل").required("كلمة المرور مطلوبة"),
        confirmPassword: YUP.string()
            .oneOf([YUP.ref('password'), ''], "يجب أن تتطابق كلمة المرور")
            .required("تأكيد كلمة المرور مطلوب")
    });

    const registerForm = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: '',
            confirmPassword: ''
        },
        validationSchema,
        onSubmit: async (values) => {
            setLoading(true);
            setErrorMessage("");
            const data = await dispatch(handleRegister(values));
            if (data.payload.success) {
                setDownloadErrorMessage('تم انشاء الحساب بنجاح، الرجاء التوجه للبريد الإلكتروني للتأكيد');
                setShowConfirmModal(true);
                registerForm.resetForm();
            } else {
                setErrorMessage(data.payload.message);
                setMessageColor("text-red-600");
            }
            setLoading(false);
        }
    });

    return (
        <>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                {/* Helmet */}
                <Helmet>
                    <title>انشاء حساب - تقارير</title>
                    <meta name="description" content="انشاء حساب جديد للاستفادة من خدمات المنصة بكل سهولة." />
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
                <div className='p-10 md:px-16 flex flex-col justify-center' dir='rtl'>
                    <img className='md:w-32 w-20' src={logo} alt='logo' />
                    <div className='md:my-8 my-6'>
                        <h2 className='md:text-2xl text- font-bold'>انشاء حساب</h2>
                        <p className='text-gray-500 mt-2'>قم بإنشاء حساب جديد للاستفادة من خدمات المنصة بكل سهولة.</p>
                    </div>
                    <form onSubmit={registerForm.handleSubmit} className="flex-1 flex flex-col justify-between">
                        <div className='flex-1 flex flex-col justify-center'>
                            <div className="mb-6">
                                <label htmlFor="username" className="block text-gray-700">الاسم الكامل</label>
                                <input
                                    type="text"
                                    className="w-full p-2 mt-2 border border-gray-100 bg-[#F7F7F7] rounded-lg"
                                    id="username"
                                    name="username"
                                    placeholder="ادخل الاسم الكامل هنا"
                                    onChange={registerForm.handleChange}
                                    onBlur={registerForm.handleBlur}
                                    value={registerForm.values.username}
                                />
                                {registerForm.touched.username && registerForm.errors.username && (
                                    <div className="text-red-600 text-sm mt-1">{registerForm.errors.username}</div>
                                )}
                            </div>

                            <div className="mb-6">
                                <label htmlFor="email" className="block text-gray-700">البريد الإلكتروني</label>
                                <input
                                    type="email"
                                    className="w-full p-2 mt-1 border border-gray-100 bg-[#F7F7F7] rounded-lg"
                                    id="email"
                                    name="email"
                                    placeholder="ادخل البريد الالكتروني هنا"
                                    onChange={registerForm.handleChange}
                                    onBlur={registerForm.handleBlur}
                                    value={registerForm.values.email}
                                />
                                {registerForm.touched.email && registerForm.errors.email && (
                                    <div className="text-red-600 text-sm mt-1">{registerForm.errors.email}</div>
                                )}
                            </div>
                            <div className="grid md:grid-cols-2 grid-cols-1 md:gap-5">
                                <div className="mb-3">
                                    <label htmlFor="password" className="block text-gray-700">كلمة المرور</label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            className="w-full mt-1 p-2 border border-gray-100 bg-[#F7F7F7] rounded-lg"
                                            id="password"
                                            name="password"
                                            placeholder="ادخل كلمة المرور هنا"
                                            onChange={registerForm.handleChange}
                                            onBlur={registerForm.handleBlur}
                                            value={registerForm.values.password}
                                        />
                                        <span
                                            onClick={togglePasswordVisibility}
                                            className="absolute inset-y-0 left-3 flex items-center cursor-pointer text-gray-600"
                                        >
                                            {showPassword ?

                                                <svg className="w-6 h-6 text-gray-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24">
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.933 13.909A4.357 4.357 0 0 1 3 12c0-1 4-6 9-6m7.6 3.8A5.068 5.068 0 0 1 21 12c0 1-3 6-9 6-.314 0-.62-.014-.918-.04M5 19 19 5m-4 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                                </svg>
                                                :
                                                <svg className="w-6 h-6 text-gray-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24">
                                                    <path stroke="currentColor" strokeWidth={2} d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z" />
                                                    <path stroke="currentColor" strokeWidth={2} d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                                </svg>
                                            }
                                        </span>

                                    </div>
                                    {registerForm.touched.password && registerForm.errors.password && (
                                        <div className="text-red-600 text-sm mt-1">{registerForm.errors.password}</div>
                                    )}
                                </div>

                                <div className="mb-6">
                                    <label htmlFor="confirmPassword" className="block text-gray-700">تأكيد كلمة المرور</label>
                                    <div className="relative">
                                        <input
                                            type={showConfirmPassword ? "text" : "password"}
                                            className="w-full p-2 mt-1 border border-gray-100 bg-[#F7F7F7] rounded-lg"
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            placeholder="ادخل كلمة المرور هنا"
                                            onChange={registerForm.handleChange}
                                            onBlur={registerForm.handleBlur}
                                            value={registerForm.values.confirmPassword}
                                        />
                                        <span
                                            onClick={toggleConfirmPasswordVisibility}
                                            className="absolute inset-y-0 left-3 flex items-center cursor-pointer text-gray-600"
                                        >
                                            {showConfirmPassword ?

                                                <svg className="w-6 h-6 text-gray-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24">
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.933 13.909A4.357 4.357 0 0 1 3 12c0-1 4-6 9-6m7.6 3.8A5.068 5.068 0 0 1 21 12c0 1-3 6-9 6-.314 0-.62-.014-.918-.04M5 19 19 5m-4 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                                </svg>
                                                :
                                                <svg className="w-6 h-6 text-gray-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24">
                                                    <path stroke="currentColor" strokeWidth={2} d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z" />
                                                    <path stroke="currentColor" strokeWidth={2} d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                                </svg>
                                            }
                                        </span>

                                    </div>
                                    {registerForm.touched.confirmPassword && registerForm.errors.confirmPassword && (
                                        <div className="text-red-600 text-sm mt-1">{registerForm.errors.confirmPassword}</div>
                                    )}
                                </div>
                            </div>
                        </div>




                        {loading ? (
                            <button type="button" className="w-full p-2 bg-gray-500 text-white rounded-lg" disabled>
                                <i className="fa-solid fa-spinner fa-spin"></i> جاري التحميل ...
                            </button>
                        ) : (
                            <button
                                disabled={!(registerForm.isValid && registerForm.dirty)}
                                type="submit"
                                className="w-full p-2 bg-main_color text-white rounded-lg hover:opacity-80"
                            >
                                إنشاء حساب
                            </button>
                        )}
                        {errorMessage && (
                            <div className={`${messageColor} text-sm my-1`}>{errorMessage}</div>
                        )}
                    </form>

                    <div className="text-center mt-5">
                        <p>
                            لديك حساب بالفعل؟
                            <span
                                onClick={() => navigate("/login")}
                                className="text-main_color ms-1 cursor-pointer hover:underline"
                            >
                                تسجيل الدخول
                            </span>
                        </p>
                    </div>
                </div>
            </div>
            {showConfirmModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
                    <div className="bg-white p-6 text-center rounded-lg  shadow">
                        <h2 className="text-sm font-semibold mb-4">{downloadErrorMessage}</h2>
                        <div className='grid grid-cols-2 gap-2'>
                            <button onClick={() => setShowConfirmModal(false)} className="bg-gray-300 text-sm px-4 py-2 rounded-lg">
                                إلغاء
                            </button>
                            {downloadErrorMessage === 'تم انشاء الحساب بنجاح، الرجاء التوجه للبريد الإلكتروني للتأكيد' &&
                                <button onClick={() => navigate("/login")} className="bg-main_color text-sm text-white px-4 py-2 rounded-lg mr-2">
                                    تسجيل الدخول
                                </button>
                            }

                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
