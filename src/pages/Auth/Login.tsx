import { useState } from 'react';
import { useFormik } from "formik";
import { useAppDispatch } from '../../Store/store';
import { handleLogin } from '../../Store/user.slice';
import { Link, useNavigate } from 'react-router-dom';
import * as YUP from "yup";
import img1 from '../../assets/Images/loginImage.svg';
import img2 from '../../assets/Images/loginWords.svg';
import logo from '../../assets/Images/logo.png';
import { Helmet } from 'react-helmet-async';

export default function Login() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [messageColor, setMessageColor] = useState("text-red-600");
    const [errorMessage, setErrorMessage] = useState("");

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const validationSchema = YUP.object({
        email: YUP.string()
            .email("الرجاء ادخال بريد الكتروني صحيح")
            .required("البريد الالكتروني مطلوب"),
        password: YUP.string().required("كلمة المرور مطلوبة"),
    });

    const loginForm = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema,
        onSubmit: async (values) => {
            setLoading(true);
            const data = await dispatch(handleLogin(values));
            if (data.payload.success) {
                localStorage.setItem("userToken", data.payload.userToken);
                setErrorMessage("تم تسجيل الدخول بنجاح");
                setMessageColor("text-green-600");
                setTimeout(() => {
                    navigate("/");
                }, 1000);
            } else {
                setErrorMessage(data.payload.message);
                setMessageColor("text-red-600");
            }
            setLoading(false);
        },
    });
    return (
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
            {/* Helmet */}
            <Helmet>
                <title>
                    تسجيل الدخول - تقارير
                </title>
                <meta name="description" content="تسجيل الدخول إلى حسابك في تقارير للوصول إلى جميع الميزات والخدمات المتاحة. إذا لم يكن لديك حساب، يمكنك إنشاء حساب جديد بسهولة." />
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
            <div className='p-10 md:px-16 flex flex-col justify-center h-screen' dir='rtl'>
                <img className='md:w-32 w-20' src={logo} alt='logo' />
                <div className='md:my-8 my-6'>
                    <h2 className='md:text-2xl text- font-bold'>تسجيل الدخول</h2>
                    <p className='text-gray-500 mt-2'>سجّل دخولك للوصول إلى حسابك والاستفادة من خدمات المنصة.</p>
                </div>
                <form onSubmit={loginForm.handleSubmit} className="flex-1 flex flex-col justify-between">
                    <div className='flex-1 flex flex-col justify-center'>
                        <div className="mb-3">
                            <label htmlFor="email" className="block my-3">
                                البريد الالكتروني
                            </label>
                            <input
                                type="email"
                                className="w-full p-2 border border-gray-100 bg-[#EEEEEE] rounded-md"
                                id="email"
                                name="email"
                                placeholder='ادخل البريد الالكتروني هنا'
                                onChange={loginForm.handleChange}
                                onBlur={loginForm.handleBlur}
                                value={loginForm.values.email}
                            />
                            {loginForm.touched.email && loginForm.errors.email && (
                                <div className="text-red-600 text-sm mt-1">
                                    {loginForm.errors.email}
                                </div>
                            )}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="password" className="block">
                                كلمة المرور
                            </label>
                            <div className="relative my-3">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="w-full p-2 border border-gray-100 bg-[#EEEEEE] rounded-md"
                                    id="password"
                                    name="password"
                                    placeholder='ادخل كلمة المرور هنا'
                                    onChange={loginForm.handleChange}
                                    onBlur={loginForm.handleBlur}
                                    value={loginForm.values.password}
                                />
                                <span
                                    onClick={togglePasswordVisibility}
                                    className="absolute inset-y-0 left-3 flex items-center cursor-pointer text-gray-600"
                                >
                                    {showPassword ? (
                                        <svg
                                            className="w-6 h-6 text-gray-500 dark:text-white"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width={24}
                                            height={24}
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M3.933 13.909A4.357 4.357 0 0 1 3 12c0-1 4-6 9-6m7.6 3.8A5.068 5.068 0 0 1 21 12c0 1-3 6-9 6-.314 0-.62-.014-.918-.04M5 19 19 5m-4 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                            />
                                        </svg>
                                    ) : (
                                        <svg
                                            className="w-6 h-6 text-gray-500 dark:text-white"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width={24}
                                            height={24}
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                stroke="currentColor"
                                                strokeWidth={2}
                                                d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"
                                            />
                                            <path
                                                stroke="currentColor"
                                                strokeWidth={2}
                                                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                            />
                                        </svg>
                                    )}
                                </span>
                            </div>
                            {loginForm.touched.password && loginForm.errors.password && (
                                <div className="text-red-600 text-sm mt-1">
                                    {loginForm.errors.password}
                                </div>
                            )}
                        </div>

                        <div className="flex justify-between items-center mb-3">
                            <Link
                                to="/forgot-password"
                                className="text-main_color hover:underline"
                            >
                                نسيت كلمة المرور؟
                            </Link>
                        </div>
                    </div>

                    <div className='mt-10'>
                        {loading ? (
                            <button
                                type="button"
                                className="w-full p-2 bg-gray-500 text-white rounded-md"
                                disabled
                                title="Loading"
                            >
                                <i className="fa-solid fa-spinner fa-spin"></i>
                                Loading ...
                            </button>
                        ) : (
                            <button
                                disabled={!(loginForm.isValid && loginForm.dirty)}
                                type="submit"
                                className="w-full p-2 bg-main_color text-white rounded-md hover:opacity-80"
                            >
                                تسجيل الدخول
                            </button>
                        )}
                    </div>
                    {errorMessage && (
                        <div className={`${messageColor} text-sm my-1`}>{errorMessage}</div>
                    )}
                </form>
                <div className='my-5 flex items-center'>
                    <div className='border w-1/2 bg-gray-200'></div>
                    <p className='text-gray-600 mx-2'>أو</p>
                    <div className='border w-1/2 bg-gray-200'></div>
                </div>
                <div className="text-center">
                    <p>
                        ليس لديك حساب؟
                        <span
                            onClick={() => navigate("/Register")}
                            className="text-main_color ms-2 cursor-pointer hover:underline">
                            انشاء حساب
                        </span>
                    </p>
                </div>
            </div>
        </div>
    )
}
