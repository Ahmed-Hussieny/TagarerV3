import { useAppDispatch } from "../../Store/store";
import { handleGetAllArticles, handleGetArticle } from "../../Store/article.slice";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Article } from "../../Interfaces/article";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet-async";
import SmallArticle from "../../components/Custom/SmallArticle";

export default function ArticleItem() {
    const dispatch = useAppDispatch();
    const { articleId } = useParams();
    const [htmlContent, setHtmlContent] = useState<string>('');
    const [articleName, setArticleName] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);
    const { article } = useSelector(
        (state: { articles: { article: Article; } }) => state.articles
    );
    const { articles } = useSelector(
        (state: { articles: { articles: Article[]; } }) => state.articles
    );

    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchArticle = async () => {
            if (articleId) {
                setIsLoading(true);
                const response = await dispatch(handleGetArticle(articleId));
                const article = response.payload.article;
                setArticleName(article.title);
                if (article.content) {
                    try {
                        const response = await fetch(article.content);
                        const content = await response.text();
                        setHtmlContent(content);
                    } catch (error) {
                        console.error('Error fetching HTML content:', error);
                    }
                }
                setIsLoading(false);
            }
        };
        fetchArticle();
        dispatch(handleGetAllArticles({ page: 1, title: "" }));

    }, [dispatch]);
    // const items = [
    //     { name: "الرئيسية", route: "/" },
    //     { name: "المقالات", route: "/articles" },
    //     { name: `${articleName}`, route: "/article" },
    // ];

    const formatArabicDate = (isoDate: string): string => {
        const date = new Date(isoDate);
        const day = date.getUTCDate();
        const year = date.getUTCFullYear();
        const arabicMonths = [
            "جانفي", "فيفري", "مارس", "أفريل", "ماي", "جوان",
            "جويلية", "أوت", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"
        ];
        const monthName = arabicMonths[date.getUTCMonth()];
        return `${day} ${monthName} ${year}`;
    };

    //   // Example usage
    //   const formatted = formatArabicDate("2025-04-11T18:39:35.300Z");
    //   console.log(formatted); // "11 أفريل 2025"


    const readMore = (link: string) => {
        window.open(link, "_blank");
    }
    return (
        <div className="my-10 mb-16 pt-10 container mx-auto px-10">
            <Helmet>
                <title>{article.title}</title>
                <meta name="description" content={article.description} />
            </Helmet>
            <div className="bg-secondary_color mb-5 text-sm rounded-lg px-4 py-2">
                <span className="font-sans cursor-pointer">الرئيسية</span>
                <span className="mx-1">/</span>
                <span className="font-medium cursor-pointer">المدونة</span>
                <span className="mx-1">/</span>
                <span className="font-medium cursor-pointer">{articleName}</span>
            </div>
            <div className="my-10 container   p-5 rounded-lg ">
                {/* {article.updatedAt} */}
                اخر تحديث {formatArabicDate(article.updatedAt)}
                <h2 className="text-main_color text-lg font-bold mb-5">{article.title}</h2>
                <img src={article.image} className="h-64 m-auto" alt={article.title} />
                <p className="my-4">
                    {article.description}
                </p>

                {isLoading ? (
                    <div className="flex justify-center items-center my-7 h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-main_color"></div>
                    </div>
                ) : <div className="prose max-w-full" dangerouslySetInnerHTML={{ __html: htmlContent }} />
                }
                {article.link && <div className="flex justify-center items-center bg-main_color text-white px-6 py-2 border-2 border-main_color rounded-lg cursor-pointer 
                        sm:px-3 sm:py-1 lg:px-5 lg:py-2 max-w-max font-bold" onClick={() => readMore(article.link)}>
                    {/* <img src={moreIcon} alt="moreIcon" /> */}
                    <p className="inline mx-2 text-sm">قراءة التقرير</p>
                </div>
                }
            </div>

            <h2 className="text-main_color text-lg font-bold px-5">مقالات مشابهة</h2>
            <p className="text-gray-500 mb-5 px-5">استشكف العديد من المقالات الاخرى في نفس المجال</p>
            <div className="grid md:px-0  md:grid-cols-3 grid-cols-1 md:gap-x-0 gap-10 mb-20">
                {articles.map((arti, index) => {
                    return ((article._id !== arti._id && index < 4) && <SmallArticle article={arti} />)
                })}
            </div>
        </div>
    )
}
