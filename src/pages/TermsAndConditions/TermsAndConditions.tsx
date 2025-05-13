import { Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";
import { Seo } from "../../Interfaces/seo";

export default function TermsAndConditions() {
  const { SeoData } = useSelector((state: { user: { SeoData: Seo } }) => state.user);
  return (
    <div className="container mx-auto my-24 px-3">
      {/* Helmet */}
      <Helmet>
        <title> {`${SeoData?.termsAndConditionsTitle}`}</title>
        <meta name="description" content={SeoData?.termsAndConditionsDescription} />
      </Helmet>

      {/* section 1 */}
      <div className="bg-secondary_color text-sm rounded-lg px-4 py-2">
        <span className="font-sans cursor-pointer">الرئيسية</span>
        <span className="mx-1">/</span>
        <span className="font-medium cursor-pointer"> الشروط و الأحكام</span>
      </div>

      <div className="mt-10">
        <p className="font-medium text-xl">الشروط و الأحكام</p>
        <p className="mt-3 text-gray-700">تلتزم منصة تقارير بحماية خصوصية مستخدميها وضمان أمان بياناتهم الشخصية. تهدف هذه السياسة إلى إطلاعك على كيفية جمع واستخدام وحماية المعلومات التي تقدمها عند استخدامك للمنصة. من خلال استخدامك للمنصة، فإنك توافق على جمع واستخدام بياناتك كما هو موضح في هذه السياسة.</p>

        <p className="font-medium text-xl mt-10">المعلومات التي نقوم بجمعها:</p>

        <p className="font-medium text-lg mt-5">المعلومات الشخصية: </p>
        <p className="mt-3 text-gray-700">عند إنشاء حساب أو التسجيل في خدمات المنصة، قد نطلب منك تقديم معلومات شخصية مثل الاسم، البريد الإلكتروني، رقم الهاتف، العنوان، وبيانات الدفع.</p>

        <p className="font-medium text-lg mt-5">المعلومات التقنية:</p>
        <p className="mt-3 text-gray-700">نستخدم تقنيات مثل "الكوكيز" و"تسجيل الدخول" لجمع معلومات حول كيفية استخدامك للمنصة، بما في ذلك عنوان بروتوكول الإنترنت (IP)، نوع الجهاز، نظام التشغيل، نوع المتصفح، والصفحات التي تمت زيارتها.</p>

        <p className="font-medium text-lg mt-5">المحتوى المقدم من المستخدم:</p>
        <p className="mt-3 text-gray-700">يمكن للمستخدمين تحميل أو تقديم محتوى عبر المنصة مثل التقارير، التعليقات، أو التقييمات. سيتم جمع هذا المحتوى لاستخدامه وفقًا للغرض الذي قُدم من أجله.</p>

        <p className="font-medium text-lg mt-5">كيفية استخدام المعلومات</p>
        <p className="mt-3 text-gray-700">نستخدم المعلومات التي نجمعها لتحقيق الأغراض التالية:</p>
        <ul className="list-disc list-inside text-gray-700 text-right rtl">
          <li className="mt-3">تقديم وتحسين الخدمات: لتقديم الخدمات المطلوبة وتحسين تجربة المستخدم.</li>
          <li className="mt-3">التفاعل مع المستخدمين: للرد على استفساراتك، تقديم الدعم الفني، وإعلامك بالتحديثات المتعلقة بالحساب أو العروض.</li>
          <li className="mt-3">التسويق والعروض: في حال وافقت على تلقي رسائل تسويقية، قد نرسل لك عروضًا وخدمات جديدة تتعلق بالمنصة.</li>
          <li className="mt-3">تحليل الأداء: لتحليل كيفية استخدام المنصة وتحسينها بناءً على احتياجات المستخدمين.</li>
        </ul>

        <p className="font-medium text-lg mt-5">مشاركة المعلومات</p>
        <p className="mt-3 text-gray-700">نحن لا نبيع أو نؤجر معلوماتك الشخصية لأطراف ثالثة. قد نقوم بمشاركة المعلومات في الحالات التالية:</p>
        <ul className="list-disc list-inside text-gray-700 text-right rtl">
          <li className="mt-3">مقدمو الخدمات: قد نشارك معلوماتك مع شركاء موثوق بهم الذين يقدمون خدمات تقنية أو مساعدة في إدارة المنصة.</li>
          <li className="mt-3">الامتثال للقانون: قد نضطر إلى الكشف عن معلوماتك الشخصية إذا كان ذلك مطلوبًا بموجب القانون أو استجابة لطلب قانوني من السلطات.</li>
          <li className="mt-3">حماية حقوقنا: قد نستخدم معلوماتك للكشف عن الاحتيال أو حماية حقوقنا القانونية.</li>
        </ul>

        <p className="font-medium text-lg mt-5">حماية المعلومات</p>
        <p className="mt-3 text-gray-700">نحن نتخذ تدابير أمنية لحماية المعلومات الشخصية من الوصول غير المصرح به أو استخدامها. تشمل هذه التدابير استخدام التشفير وتقنيات الأمان الأخرى لضمان سرية البيانات.</p>


        <p className="font-medium text-lg mt-5">الكوكيز والتقنيات المشابهة</p>
        <p className="mt-3 text-gray-700">نستخدم الكوكيز وتقنيات مشابهة لتحسين تجربة المستخدم على المنصة. تسمح لنا هذه التقنيات بتخزين تفضيلاتك ومساعدتك في الوصول إلى الميزات بسرعة أكبر.</p>
        <ul className="list-disc list-inside text-gray-700 text-right rtl">
          <li className="mt-3">يمكنك ضبط إعدادات المتصفح لمنع الكوكيز، ولكن قد يؤدي ذلك إلى تأثير على بعض وظائف المنصة.</li>
        </ul>


        <p className="font-medium text-lg mt-5">الكوكيز والتقنيات المشابهة</p>
        <p className="mt-3 text-gray-700">نستخدم الكوكيز وتقنيات مشابهة لتحسين تجربة المستخدم على المنصة. تسمح لنا هذه التقنيات بتخزين تفضيلاتك ومساعدتك في الوصول إلى الميزات بسرعة أكبر.</p>
        <ul className="list-disc list-inside text-gray-700 text-right rtl">
          <li className="mt-3">يمكنك ضبط إعدادات المتصفح لمنع الكوكيز، ولكن قد يؤدي ذلك إلى تأثير على بعض وظائف المنصة.</li>
        </ul>
      </div>
    </div>
  )
}
