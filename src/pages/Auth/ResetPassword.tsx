import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as YUP from "yup";
import { useFormik } from "formik";

import { HandelResetPassword, HandelVerifyResetCode } from "../../Store/user.slice";
import { useAppDispatch } from "../../Store/store";
import logo from '../../assets/Images/logo.png'
import img1 from '../../assets/Images/loginImage.svg';
import img2 from '../../assets/Images/loginWords.svg';
import { Helmet } from "react-helmet-async";
const ResetPassword = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [messageColor, setMessageColor] = useState("text-red-600");

    const { token } = useParams();
    useEffect(() => {
        console.log(token);
        const verifyToken = async () => {
            if (!token) {
                setLoading(false);
                setErrorMessage("رمز غير صالح أو مفقود");
                setMessageColor("text-red-600");
                navigate('/forgot-password');
                return;
            }
            setLoading(true);
            const data = await dispatch(HandelVerifyResetCode({ token }));
            console.log(data)
            if (data.payload.success) {
                setErrorMessage('تم التحقق من الرمز بنجاح');
                setMessageColor("text-green-600");
            } else {
                setErrorMessage(data.payload.message);
                setMessageColor("text-red-600");
                navigate('/forgot-password');
            }
            setLoading(false);
        };
        verifyToken();
    }, [token, dispatch, navigate]);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    }

    const validationSchema = YUP.object({
        newPassword: YUP.string().min(6, "يجب أن تكون كلمة المرور 6 أحرف على الأقل").required("كلمة المرور مطلوبة"),
        confirmPassword: YUP.string()
            .oneOf([YUP.ref('newPassword'), ''], "يجب أن تتطابق كلمة المرور")
            .required("تأكيد كلمة المرور مطلوب")
    });
    const resetPasswordForm = useFormik({
        initialValues: {
            token,
            newPassword: '',
            confirmPassword: ''
        },
        validationSchema,
        onSubmit: async (values) => {
            setLoading(true);
            const data = await dispatch(HandelResetPassword({ token: values.token as string, newPassword: values.newPassword }));
            if (data.payload.success) {
                setErrorMessage(' تم تغيير كلمة المرور بنجاح');
                setMessageColor("text-green-600");
                navigate('/login');
            } else {
                setErrorMessage(data.payload.message);
                setMessageColor("text-red-600");
                navigate('/forgot-password');
            }
            setLoading(false);

        }

    }); if (!token) {
        return <p>Invalid or missing token.</p>;
    }

    return (
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
            {/* Helmet */}
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
                    <h2 className='md:text-2xl text- font-bold'>اعادة تعيين كلمة المرور</h2>
                    <p className='text-gray-500 mt-2'>قم بإدخال كلمة مرور جديدة لحسابك لضمان استمرار الوصول الآمن إلى المنصة.</p>
                </div>
                <form onSubmit={resetPasswordForm.handleSubmit} className="flex-1 flex flex-col justify-between">
                    <div className="flex-1 flex justify-center flex-col">
                        <div className="mb-3">
                            <label htmlFor="newPassword" className="block text-gray-700">كلمة المرور الجديدة</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="w-full p-2 mt-2 border border-gray-100 bg-[#F7F7F7] rounded-lg"
                                    id="newPassword"
                                    name="newPassword"
                                    placeholder="ادخل كلمة المرور هنا"
                                    onChange={resetPasswordForm.handleChange}
                                    onBlur={resetPasswordForm.handleBlur}
                                    value={resetPasswordForm.values.newPassword}
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
                            {resetPasswordForm.touched.newPassword && resetPasswordForm.errors.newPassword && (
                                <div className="text-red-600 text-sm mt-1">{resetPasswordForm.errors.newPassword}</div>
                            )}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="confirmPassword" className="block text-gray-700">تأكيد كلمة المرور</label>
                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    className="w-full p-2 mt-2 border border-gray-100 bg-[#F7F7F7] rounded-lg"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    placeholder="ادخل كلمة المرور هنا"
                                    onChange={resetPasswordForm.handleChange}
                                    onBlur={resetPasswordForm.handleBlur}
                                    value={resetPasswordForm.values.confirmPassword}
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
                            {resetPasswordForm.touched.confirmPassword && resetPasswordForm.errors.confirmPassword && (
                                <div className="text-red-600 text-sm mt-1">{resetPasswordForm.errors.confirmPassword}</div>
                            )}
                        </div>
                        {errorMessage && (
                            <div className={`${messageColor} text-sm my-1`}>{errorMessage}</div>
                        )}
                    </div>
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
                            disabled={!(resetPasswordForm.isValid && resetPasswordForm.dirty)}
                            type="submit"
                            className="w-full p-2 bg-main_color text-white rounded-lg hover:opacity-80"
                        >
                            تأكيد
                        </button>
                    )}

                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
