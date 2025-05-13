import { useNavigate } from "react-router-dom";
import { Article } from "../../Interfaces/article"

export default function SmallArticle({ article }: {
    article: Article
}) {
    const navigate = useNavigate();
    const slug = article?.title.trim().replace(/\s+/g, '-');
    return (
        <div className='md:ps-10 col-span-1 cursor-pointer' onClick={()=>navigate(`/Article/${article._id}/${slug}`)}>
            <img src={article?.image} className="w-full max-h-64 rounded-xl" alt='imgB3' />
            <h2 className='mb-3 font-medium my-6'>{article?.title}</h2>
            <p className='text-gray-500 text-sm'>{article?.description}</p>
        </div>
    )
}
