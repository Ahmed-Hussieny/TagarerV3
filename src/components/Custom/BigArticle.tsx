import { useNavigate } from "react-router-dom";
import { Article } from "../../Interfaces/article"

export default function BigArticle({ article }: {
    article: Article
}) {
    const navigate = useNavigate();
    const slug = article?.title.trim().replace(/\s+/g, '-');
  return (
    <section className="md:py-20 py-16 container mx-auto px-4 sm:px-6 lg:px-8">
                <div className='grid md:grid-cols-2 grid-cols-1 gap-5 items-center'>
                    <div className='md:ps-10 order-2 md:order-2'>
                        <h2 className='text-2xl mb-3 font-bold'>{article?.title}</h2>
                        <p className='text-gray-500 my-6'>{article?.description}</p>
                        <button onClick={()=>navigate(`/Article/${article._id}/${slug}`)} className="bg-main_color text-white px-3 sm:px-6 py-2 rounded-xl text-sm sm:text-base h-12 md:w-46 w-1/2 sm:w-40 hover:opacity-90">
                        قراءة المزيد
                        </button>
                    </div>

                    <div className='order-1 md:order-1'>
                        <img src={article?.image} className="w-full h-full rounded-xl" alt='imgB3' />
                    </div>
                </div>
            </section>
  )
}
