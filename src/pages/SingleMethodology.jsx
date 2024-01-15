import { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { apiGetPostType } from '../services/apiService';
import { MyContext } from '../MyContext';
import style from './singleMethodology-style.module.css';
import Loading from '../components/Loading';

export default function SingleMethodology() {
  const [postContent, setPostContent] = useState({});
  const [loading, setLoading] = useState(true);
  const [featuredImageUrl, setFeaturedImageUrl] = useState('');
  const { slug } = useParams();
  const { methodologyContent, setMethodologyContent, fetchFeaturedImage } =
    useContext(MyContext);

  useEffect(() => {
    const fetchContent = async () => {
      setLoading(true);

      if (!methodologyContent.length) {
        try {
          const backEndPTContent = await apiGetPostType('methodology');
          const postsWithImages = await Promise.all(
            backEndPTContent.map(async (post) => {
              const imageUrl = post.featured_media
                ? await fetchFeaturedImage(post.featured_media)
                : null;
              return { ...post, imageUrl };
            })
          );
          setMethodologyContent(postsWithImages);
        } catch (error) {
          console.log(error);
        }
      }

      setLoading(false);
    };

    fetchContent();
  }, [setMethodologyContent, fetchFeaturedImage, methodologyContent.length]);

  useEffect(() => {
    setLoading(true);
    const fetchPostContent = async () => {
      if (methodologyContent.length > 0) {
        const post = methodologyContent.find((p) => p.slug === slug);
        if (post) {
          setPostContent(post);
          setFeaturedImageUrl(post.imageUrl || '');
        }
      }
      setLoading(false);
    };

    fetchPostContent();
  }, [slug, methodologyContent]);

  return (
    <>
      <section
        className={`flex relative flex-col justify-center items-start min-h-100v-h bg-[#F6F5F3] p-[75px] overflow-hidden`}
      >
        <div className="absolute top-0 right-0 z-[2]">
          <ul className="flex">
            {methodologyContent &&
              [...methodologyContent].reverse().map((item, index) => (
                <li
                  key={item.id}
                  className="m-5 flex flex-col justify-center items-center"
                >
                  <Link
                    to={`/methodology/${item.slug}`}
                    className="flex flex-col justify-center items-center"
                  >
                    {item.imageUrl && (
                      <img
                        src={item.imageUrl}
                        alt={item.title.rendered}
                        className="h-[75px]"
                      />
                    )}
                    <h3 className="text-[20px] font-modelicabold text-center absolute text-white">
                      {index + 1}
                    </h3>
                  </Link>
                </li>
              ))}
          </ul>
        </div>
        {!loading ? (
          <>
            <img
              className="absolute z-[1] h-[110%] -translate-x-[20%] translate-y-[5%]"
              alt={postContent.title && postContent.title.rendered}
              src={featuredImageUrl}
            />
            <div className="z-[2] flex w-full relative grow items-center justify-end">
              <h1 className="text-[5vw] font-modelicabold text-left leading-[6vw] absolute bottom-10 left-0 w-[20%]">
                {postContent.title && postContent.title.rendered}
              </h1>

              <div
                className={`${style.content} text-left]`}
                dangerouslySetInnerHTML={{
                  __html: postContent.content && postContent.content.rendered,
                }}
              ></div>
            </div>
          </>
        ) : (
          <Loading loading={loading} color={'#54BCCA'} />
        )}
      </section>
    </>
  );
}
