import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { apiGetPostType } from '../services/apiService';
import { MyContext } from '../MyContext';
import style from './singleMethodology-style.module.css';
import Loading from '../components/Loading';

export default function SingleMethodology() {
  const [postContent, setPostContent] = useState({});
  const [loading, setLoading] = useState(true);
  const [featuredImageUrl, setFeaturedImageUrl] = useState('');
  const [nextLink, setNextLink] = useState('');
  const [prevLink, setPrevLink] = useState('');
  const { slug } = useParams();
  const {
    methodologyContent,
    setMethodologyContent,
    fetchFeaturedImage,
    language,
  } = useContext(MyContext);

  useEffect(() => {
    const fetchContent = async () => {
      window.scrollTo(0, 0);
      setLoading(true);

      if (!methodologyContent.length) {
        try {
          const backEndPTContent = await apiGetPostType(
            'methodology',
            language
          );
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
  }, [
    language,
    setMethodologyContent,
    fetchFeaturedImage,
    methodologyContent.length,
  ]);

  useEffect(() => {
    setLoading(true);
    const fetchPostContent = async () => {
      if (methodologyContent.length > 0) {
        const reversedContent = [...methodologyContent].reverse();
        const currentIndex = reversedContent.findIndex((p) => p.slug === slug);

        if (currentIndex !== -1) {
          // Define o conteúdo do post atual
          const post = reversedContent[currentIndex];
          setPostContent(post);
          setFeaturedImageUrl(post.imageUrl || '');

          // Verifica se existe um próximo item
          const nextIndex = currentIndex + 1;
          if (nextIndex >= 0 && nextIndex < reversedContent.length) {
            const nextItem = reversedContent[nextIndex];
            setNextLink(nextItem.slug); // Atualiza o slug do próximo item
          } else {
            setNextLink(null); // Não existe próximo item
          }

          const prevIndex = currentIndex - 1;
          if (prevIndex >= 0 && prevIndex < reversedContent.length) {
            const prevItem = reversedContent[prevIndex];
            setPrevLink(prevItem.slug); // Atualiza o slug do próximo item
          } else {
            setPrevLink(null); // Não existe próximo item
          }
        }
      }
      setLoading(false);
    };

    fetchPostContent();
  }, [language, slug, methodologyContent]);

  return (
    <>
      <section
        className={`flex relative flex-col justify-center items-start min-h-100v-h bg-[#F6F5F3] p-[20px] md:p-[75px] overflow-hidden`}
      >
        <div className="hidden md:block relative w-full md:absolute md:w-auto md:top-5 md:right-[75px] z-[2] animate__animated animate__fadeInDown">
          <ul className={`${style.metList} flex`}>
            {methodologyContent &&
              [...methodologyContent].reverse().map((item, index) => (
                <li
                  key={item.id}
                  className="mx-2 flex flex-col justify-center items-center w-full h-full"
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
                    <h3 className="text-[14px] font-modelicabold text-center absolute text-[#808080]">
                      {index + 1}
                    </h3>
                  </Link>
                </li>
              ))}
          </ul>
        </div>
        {!loading ? (
          <>
            <span
              className={`hidden md:block absolute z-[1] h-[90vh] w-[auto] bottom-0 md:bottom-[0] -left-[10vw] ${
                postContent.title &&
                postContent.title.rendered.substring(0, 1) === '4'
                  ? 'top-[10%]'
                  : 'top-[5%]'
              }`}
            >
              {postContent.imageUrl && (
                <img
                  key={slug}
                  src={postContent.imageUrl}
                  alt={postContent.title.rendered}
                  className="h-[90vh] animate__animated animate__fadeInLeft"
                />
              )}
            </span>
            <div
              key={slug}
              className="z-[2] flex w-full relative grow justify-start gap-[20px] pt-[35px] md:pt-[5%] 2xl:pt-[10%]  items-start flex-col md:flex-row md:justify-end"
            >
              <h1
                className={`text-[6vw] md:text-[4vw] flex flex-col md:flex-col items-baseline md:items-start gap-3 font-modelicabold text-left leading-[15vw] md:leading-[6vw] relative md:absolute bottom-0 md:bottom-0 2xl:bottom-10 left-0 animate__animated animate__fadeInLeft`}
              >
                <span className="text-[30vw] md:text-[10vw]">
                  {postContent.title &&
                    postContent.title.rendered.substring(0, 2)}
                </span>
                <span>
                  {postContent.title && postContent.title.rendered.substring(2)}
                </span>
              </h1>

              <div
                key={slug}
                className={`${style.content} text-left animate__animated animate__fadeInRight w-full md:w-[55%] 2xl:w-1/2`}
                dangerouslySetInnerHTML={{
                  __html: postContent.content && postContent.content.rendered,
                }}
              ></div>
            </div>
            {prevLink && (
              <span
                className={`absolute w-auto left-0 md:left-10 bottom-5 md:bottom-10 px-[20px] md:px-0 flex justify-between md:justify-end`}
              >
                <Link
                  className={`md:hidden z-[2] font-modelicamed text-[21px] leading-[30px] flex items-center justify-center animate__animated animate__fadeInRight hover:underline`}
                  style={{
                    cursor: 'pointer',
                  }}
                  to={`/methodology/${prevLink}`}
                >
                  {language === 'en' ? '< previous' : '< anterior'}
                </Link>
              </span>
            )}
            {nextLink ? (
              <span
                className={`absolute w-auto right-0 md:right-10 bottom-5 md:bottom-10 px-[20px] md:px-0 flex justify-between md:justify-end`}
              >
                <Link
                  className={`z-[2] font-modelicamed text-[21px] leading-[30px] flex items-center justify-center hover:underline animate__animated animate__fadeInRight`}
                  style={{
                    cursor: 'pointer',
                  }}
                  to={`/methodology/${nextLink}`}
                >
                  {language === 'en' ? 'next >' : 'próximo >'}
                </Link>
              </span>
            ) : (
              <Link
                className={`absolute w-auto scale-[.8] md:scale-95 right-[20px] md:right-10 bottom-[20px] z-[2] text-[24px] selection:flex-col bg-transparent border-[1.5px] border-black hover:border-transparent border-solid py-[10px] px-[20px] font-modelicamed rounded-xl leading-[25px] flex items-center justify-center hover:text-white hover:bg-pink-one flex-col animate__animated animate__fadeInRight`}
                to="/contact"
              >
                <small className="text-[13px] font-modelicamed">
                  {language === 'en'
                    ? 'Move toward your goals with a'
                    : 'Comece agora com uma'}
                </small>
                <span>
                  {language === 'en' ? 'free consultation' : 'consulta grátis'}
                </span>
              </Link>
            )}
          </>
        ) : (
          <Loading loading={loading} color={'#54BCCA'} />
        )}
      </section>
    </>
  );
}
