import { useSelector } from "react-redux";
import { useAppDispatch } from "../../Store/store";
import { Article } from "../../Interfaces/article";
import { handleGetAllArticles } from "../../Store/article.slice";
import { useEffect } from "react";
import BigArticle from "../../components/Custom/BigArticle";
import SmallArticle from "../../components/Custom/SmallArticle";
import { Helmet } from "react-helmet-async";
import { Seo } from "../../Interfaces/seo";

export default function Articles() {
    const dispatch = useAppDispatch();
    const {SeoData} = useSelector((state: { user: { SeoData: Seo } })  => state.user);
    const { articles } = useSelector(
        (state: { articles: { articles: Article[]; } }) => state.articles
    );

    useEffect(() => {
        dispatch(handleGetAllArticles({ page: 1, title: "" }));
        window.scrollTo(0, 0);
    }, [dispatch]);
    return (
        <div className="my-5 container mx-auto mt-24 px-3">

            {/* Helmet */}
            <Helmet>
                <title> {`${SeoData?.articleTitle}`}</title>
                <meta name="description" content= {SeoData?.articleDescription} />
            </Helmet>

            {/* section 1 */}
            <div className="bg-secondary_color text-sm rounded-lg px-4 py-2">
                <span className="font-sans cursor-pointer">الرئيسية</span>
                <span className="mx-1">/</span>
                <span className="font-medium cursor-pointer"> المدونة</span>
            </div>
            {/* first Article */}
            <div>
                <BigArticle article={articles[0]} />

                <div className="grid md:px-0 px-5 md:grid-cols-3 grid-cols-1 md:gap-x-0 gap-10 mb-20">
                    {articles.map((article, index) => {
                        return (index > 0 && <SmallArticle article={article} />)
                    })}
                </div>
            </div>
        </div>
    )
}
