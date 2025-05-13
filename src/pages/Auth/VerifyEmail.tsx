import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../Store/store';
import { HandelresendVerificationEmail, HandelVerifyEmail } from '../../Store/user.slice';
import logo from "../../assets/Images/logo.png";
import success from "../../assets/Icons/Check_ring_duotone.svg";
import fail from "../../assets/Icons/Dell_duotone.svg";

const VerifyEmail = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [loading, setLoading] = useState(false);
    const [verify, setVerify] = useState<boolean | null>(null);

    const verifyEmail = async () => {
        if (!token) {
            return;
        }

        setLoading(true);
        try {
            const data = await dispatch(HandelVerifyEmail(token));
            if (data.payload.success) {
                setVerify(true);
                return navigate('/login');
            } else {
                setVerify(false);
            }
        } catch (error) {
            console.error("Error during verification:", error);
            setVerify(false);
        } finally {
            setLoading(false);
        }
    };

    const resendEmail = async () => {

        try {
            if (token) {
                const data = await dispatch(HandelresendVerificationEmail(token));
                if (data.payload.success) {
                    setVerify(true);
                } else {
                    if (data.payload.message === "User is already verified") {
                        setVerify(true);
                        return navigate('/login');
                    }
                }
            }

        } catch (error) {
            console.error("Error during resending verification email:", error);
        }
    };

    useEffect(() => {
        verifyEmail();
    }, [token]);

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-6 bg-gray-50 rounded-xl shadow-lg">
                <div className="flex justify-center mb-6">
                    <img className="w-1/2" src={logo} alt="logo" />
                </div>

                {loading ? (
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-main_color mx-auto"></div>
                        <p className="mt-4">جاري التاكيد...</p>
                    </div>
                ) : (
                    <>
                        {verify === null ? (
                            <div className="text-center">
                                <p className="text-gray-600">جاري التاكيد...</p>
                            </div>
                        ) : verify ? (
                            <div className="text-center">
                                <img className="w-1/2 mx-auto mb-4" src={success} alt="Success" />
                                <h3 className="text-green-600 text-xl font-semibold">تم التاكيد!</h3>
                                <button
                                    onClick={() => navigate('/login')}
                                    className="mt-4 w-full bg-main_color text-white py-2 px-4 rounded-lg transition hover:bg-blue-600"
                                >
                                    تسجيل الدخول
                                </button>
                            </div>
                        ) : (
                            <div className="text-center">
                                <img className="w-1/2 mx-auto mb-4" src={fail} alt="Failure" />
                                <h3 className="text-red-600 text-xl font-semibold">
                                    فشل التاكيد
                                </h3>
                                <p className="text-gray-600 mt-4">
                                    لم يتم التحقق من بريدك الإلكتروني. يرجى التحقق من الرابط في بريدك الإلكتروني أو إعادة إرسال رابط التفعيل.
                                </p>
                                <button
                                    onClick={resendEmail}
                                    className="mt-4 w-full bg-main_color text-white py-2 px-4 rounded-lg transition hover:bg-blue-600"
                                >
                                    إعادة إرسال رابط التفعيل
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default VerifyEmail;
