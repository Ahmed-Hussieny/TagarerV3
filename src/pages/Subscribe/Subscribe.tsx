import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { handleSubscribe } from "../../Store/user.slice";
import { useAppDispatch } from "../../Store/store";

interface SubscribeFormValues {
    email: string;
    subscriptionFrequency: 'أسبوعي' | 'شهري' | '';
    reportSources: 'مصادر حكومية' | 'مصادر غير حكومية' | 'الكل' | '';
    geographicalScope: 'السعودية فقط' | 'الكل' | '';
    reportCategories: string[];
    aiSummaries: boolean;
    userType: 'استشاري' | 'أكاديمي' | 'رجل أعمال' | 'صانع قرار' | 'باحث' | 'أخرى' | '';
    additionalPreferences: string;
}

const subscriptionFrequencyOptions = [
    { value: 'أسبوعي', label: 'أسبوعي' },
    { value: 'شهري', label: 'شهري' }
];

const reportSourcesOptions = [
    { value: 'مصادر حكومية', label: 'مصادر حكومية' },
    { value: 'مصادر غير حكومية', label: 'مصادر غير حكومية' },
    { value: 'الكل', label: 'الكل' }
];

const geographicalScopeOptions = [
    { value: 'السعودية فقط', label: 'السعودية فقط' },
    { value: 'الكل', label: 'الكل' }
];

const reportCategoriesOptions = [
    { value: 'حكومية', label: 'حكومية' },
    { value: 'المال والاقتصاد', label: 'المال والاقتصاد' },
    { value: 'الثقافة والمجتمع', label: 'الثقافة والمجتمع' },
    { value: 'الرياضة', label: 'الرياضة' },
    { value: 'القطاع غير الربحي', label: 'القطاع غير الربحي' },
    { value: 'العمل والتعليم', label: 'العمل والتعليم' }
];

const userTypeOptions = [
    { value: 'استشاري', label: 'استشاري' },
    { value: 'أكاديمي', label: 'أكاديمي' },
    { value: 'رجل أعمال', label: 'رجل أعمال' },
    { value: 'صانع قرار', label: 'صانع قرار' },
    { value: 'باحث', label: 'باحث' },
    { value: 'أخرى', label: 'أخرى' }
];

const Subscribe = () => {
    const { email } = useParams();
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [messageColor, setMessageColor] = useState("text-red-600");
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    },[]);

    const validationSchema = Yup.object({
        email: Yup.string()
            .email("الرجاء ادخال بريد الكتروني صحيح")
            .required("البريد الالكتروني مطلوب"),
        subscriptionFrequency: Yup.string()
            .oneOf(['أسبوعي', 'شهري'], "يرجى اختيار تردد الاشتراك")
            .required("تردد الاشتراك مطلوب"),
        reportSources: Yup.string()
            .oneOf(['مصادر حكومية', 'مصادر غير حكومية', 'الكل'], "يرجى اختيار مصادر التقارير")
            .required("مصادر التقارير مطلوبة"),
        geographicalScope: Yup.string()
            .oneOf(['السعودية فقط', 'الكل'], "يرجى اختيار النطاق الجغرافي")
            .required("النطاق الجغرافي مطلوب"),
        reportCategories: Yup.array()
            .of(Yup.string())
            .min(1, "يرجى اختيار فئة تقرير واحدة على الأقل")
            .required("فئات التقارير مطلوبة"),
        aiSummaries: Yup.boolean(),
        userType: Yup.string()
            .oneOf(['استشاري', 'أكاديمي', 'رجل أعمال', 'صانع قرار', 'باحث', 'أخرى'], "يرجى اختيار نوع المستخدم")
            .required("نوع المستخدم مطلوب"),
        additionalPreferences: Yup.string()
    });

    const formik = useFormik<SubscribeFormValues>({
        initialValues: {
            email: email || "",
            subscriptionFrequency: "",
            reportSources: "",
            geographicalScope: "",
            reportCategories: [],
            aiSummaries: false,
            userType: "",
            additionalPreferences: ""
        },
        validationSchema,
        onSubmit: async (values) => {
            setLoading(true);
            console.log(values);
            if (!email) return;
            const data = await dispatch(handleSubscribe({
                email,
                reportSources: values.reportSources,
                geographicalScope: values.geographicalScope,
                reportCategories: values.reportCategories,
                aiSummaries: values.aiSummaries,
                userType: values.userType,
                additionalPreferences: values.additionalPreferences,
                subscriptionFrequency: values.subscriptionFrequency
            }))
            console.log(data.payload);
            if (data.payload.success) {
                setMessage("تم الاشتراك بنجاح");
                setMessageColor("text-green-600");
                navigate('/thankYou')
            } else {
                setMessage("حدث خطأ أثناء الاشتراك");
                setMessageColor("text-red-600");
            }
            setLoading(false);
        }
    });

    return (
        <div className="container mx-auto">
            <Helmet>
                <title>الاشتراك في النشرة الإخبارية - تقارير</title>
                <meta name="description" content="اشترك في النشرة الإخبارية للحصول على آخر التقارير والتحديثات." />
            </Helmet>

            <div className='p-10 md:px-16 flex flex-col justify-center' dir='rtl'>

                <form onSubmit={formik.handleSubmit} className="flex-1 flex flex-col justify-between">
                    <div className='flex-1 flex flex-col justify-center'>
                        <div className="grid md:grid-cols-2 grid-cols-1 items-center gap-5">
                            <div className="mb-6">
                                <label htmlFor="email" className="block text-gray-700">البريد الإلكتروني</label>
                                <input
                                    type="email"
                                    className="w-full p-2 mt-2 border border-gray-100 bg-[#F7F7F7] rounded-lg"
                                    id="email"
                                    name="email"
                                    placeholder="ادخل البريد الالكتروني هنا"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.email}
                                />
                                {formik.touched.email && formik.errors.email && (
                                    <div className="text-red-600 text-sm mt-1">{formik.errors.email}</div>
                                )}
                            </div>

                            <div className="mb-6">
                                <label htmlFor="subscriptionFrequency" className="block text-gray-700">هل تفضل تلقي النشرة بشكل:</label>
                                <select
                                    id="subscriptionFrequency"
                                    name="subscriptionFrequency"
                                    className="w-full p-2 mt-2 border border-gray-100 bg-[#F7F7F7] rounded-lg"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.subscriptionFrequency}
                                >
                                    <option value="">اختر التردد</option>
                                    {subscriptionFrequencyOptions.map(option => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                                {formik.touched.subscriptionFrequency && formik.errors.subscriptionFrequency && (
                                    <div className="text-red-600 text-sm mt-1">{formik.errors.subscriptionFrequency}</div>
                                )}
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 grid-cols-1 items-center gap-5">
                            <div className="mb-6">
                                <label htmlFor="reportSources" className="block text-gray-700">هل تفضل أن تكون مصادر التقارير التي تتلقاها:</label>
                                <select
                                    id="reportSources"
                                    name="reportSources"
                                    className="w-full p-2 mt-2 border border-gray-100 bg-[#F7F7F7] rounded-lg"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.reportSources}
                                >
                                    <option value="">اختر المصدر</option>
                                    {reportSourcesOptions.map(option => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                                {formik.touched.reportSources && formik.errors.reportSources && (
                                    <div className="text-red-600 text-sm mt-1">{formik.errors.reportSources}</div>
                                )}
                            </div>

                            <div className="mb-6">
                                <label htmlFor="geographicalScope" className="block text-gray-700">النطاق المكاني للتقارير:</label>
                                <select
                                    id="geographicalScope"
                                    name="geographicalScope"
                                    className="w-full p-2 mt-2 border border-gray-100 bg-[#F7F7F7] rounded-lg"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.geographicalScope}
                                >
                                    <option value="">اختر النطاق</option>
                                    {geographicalScopeOptions.map(option => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                                {formik.touched.geographicalScope && formik.errors.geographicalScope && (
                                    <div className="text-red-600 text-sm mt-1">{formik.errors.geographicalScope}</div>
                                )}
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 grid-cols-1 items-center gap-5">
                            <div className="mb-6">
                                <label className="block text-gray-700 mb-2">مجال التقارير: [اختيار متعدد]</label>
                                <div className="grid grid-cols-2 gap-2 bg-[#F7F7F7] p-4 rounded-lg">
                                    {reportCategoriesOptions.map((category) => (
                                        <label key={category.value} className="flex items-center">
                                            <input
                                                type="checkbox"
                                                name="reportCategories"
                                                value={category.value}
                                                onChange={(e) => {
                                                    const values = [...formik.values.reportCategories];
                                                    if (e.target.checked) {
                                                        values.push(category.value);
                                                    } else {
                                                        const index = values.indexOf(category.value);
                                                        if (index > -1) {
                                                            values.splice(index, 1);
                                                        }
                                                    }
                                                    formik.setFieldValue('reportCategories', values);
                                                }}
                                                checked={formik.values.reportCategories.includes(category.value)}
                                                className="ml-2"
                                            />
                                            {category.label}
                                        </label>
                                    ))}
                                </div>
                                {formik.touched.reportCategories && formik.errors.reportCategories && (
                                    <div className="text-red-600 text-sm mt-1">{formik.errors.reportCategories}</div>
                                )}
                            </div>

                            <div className="mb-6">
                                <label className="block text-gray-700 mb-2">هل تفضل تلقي/ الحصول على تلخيصات للتقارير بواسطة (AI)</label>
                                <div className="flex gap-4">
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            name="aiSummaries"
                                            onChange={() => formik.setFieldValue('aiSummaries', true)}
                                            checked={formik.values.aiSummaries === true}
                                            className="ml-2"
                                        />
                                        نعم
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            name="aiSummaries"
                                            onChange={() => formik.setFieldValue('aiSummaries', false)}
                                            checked={formik.values.aiSummaries === false}
                                            className="ml-2"
                                        />
                                        غير مهتم
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 grid-cols-1 items-center gap-5">
                            <div className="mb-6">
                                <label htmlFor="userType" className="block text-gray-700">هل تصنف نفسك:</label>
                                <select
                                    id="userType"
                                    name="userType"
                                    className="w-full p-2 mt-2 border border-gray-100 bg-[#F7F7F7] rounded-lg"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.userType}
                                >
                                    <option value="">اختر نوع المستخدم</option>
                                    {userTypeOptions.map(option => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                                {formik.touched.userType && formik.errors.userType && (
                                    <div className="text-red-600 text-sm mt-1">{formik.errors.userType}</div>
                                )}
                            </div>

                            <div className="mb-6">
                                <label htmlFor="additionalPreferences" className="block text-gray-700">تفضيلات تود إضافة:</label>
                                <textarea
                                    id="additionalPreferences"
                                    name="additionalPreferences"
                                    className="w-full p-2 mt-2 border border-gray-100 bg-[#F7F7F7] rounded-lg"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.additionalPreferences}
                                    rows={4}
                                    placeholder="اكتب تفضيلاتك الإضافية هنا..."
                                />
                            </div>
                        </div>

                        {message && (
                            <div className={`${messageColor} text-sm mb-4`}>{message}</div>
                        )}
                    </div>

                    <div className='mt-10'>
                        {loading ? (
                            <button
                                type="button"
                                className="w-full p-2 bg-gray-500 text-white rounded-lg"
                                disabled
                            >
                                جاري الاشتراك...
                            </button>
                        ) : (
                            <button
                                type="submit"
                                disabled={!(formik.isValid && formik.dirty)}
                                className="w-full p-2 bg-main_color text-white rounded-lg hover:opacity-80 disabled:opacity-50"
                            >
                                اشتراك
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Subscribe;