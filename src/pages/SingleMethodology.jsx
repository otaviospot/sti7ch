import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { apiGetPostType } from '../services/apiService';
import { MyContext } from '../MyContext';
import style from './singleMethodology-style.module.css';
import Loading from '../components/Loading';
import btn2Image from '../assets/images/btn2.webp';

import { ReactComponent as SvgComponent1 } from '../assets/images/svgs/met-1-animated-2.svg';
import { ReactComponent as SvgComponent2 } from '../assets/images/svgs/met-2-animated-2.svg';
import { ReactComponent as SvgComponent3 } from '../assets/images/svgs/met-3-animated-2.svg';
import { ReactComponent as SvgComponent4 } from '../assets/images/svgs/met-4-animated-2.svg';
import { ReactComponent as SvgComponent5 } from '../assets/images/svgs/met-5-animated-2.svg';
import { ReactComponent as SvgComponent6 } from '../assets/images/svgs/met-6-animated-2.svg';
import { ReactComponent as SvgComponent7 } from '../assets/images/svgs/met-7-animated-2.svg';

const svgMapping = {
  1: SvgComponent1,
  2: SvgComponent2,
  3: SvgComponent3,
  4: SvgComponent4,
  5: SvgComponent5,
  6: SvgComponent6,
  7: SvgComponent7,
};

export default function SingleMethodology() {
  const [postContent, setPostContent] = useState({});
  const [loading, setLoading] = useState(true);
  const [featuredImageUrl, setFeaturedImageUrl] = useState('');
  const [nextLink, setNextLink] = useState('');
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
        }
      }
      setLoading(false);
    };

    fetchPostContent();
  }, [slug, methodologyContent]);

  return (
    <>
      <section
        className={`flex relative flex-col justify-center items-start min-h-100v-h bg-[#F6F5F3] p-[20px] md:p-[75px] overflow-hidden`}
      >
        <div className="relative w-full md:absolute md:w-auto md:top-5 md:right-[75px] z-[2] animate__animated animate__fadeInDown">
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
              className={`hidden md:block absolute z-[1] h-[90vh] w-[auto] bottom-0 md:bottom-[0] -left-[15vw] ${
                postContent.title &&
                postContent.title.rendered.substring(0, 1) === '4'
                  ? 'top-[10%]'
                  : 'top-[5%]'
              }`}
            >
              {postContent.imageUrl && (
                <img
                  src={postContent.imageUrl}
                  alt={postContent.title.rendered}
                  className="w-full h-full"
                />
              )}
            </span>
            <div className="z-[2] flex w-full relative grow items-start justify-start md:items-center md:justify-end">
              <h1 className="text-[6vw] md:text-[4vw] flex flex-col gap-3 font-modelicabold text-left leading-[15vw] md:leading-[6vw] absolute bottom-0 md:bottom-10 left-0 animate__animated animate__fadeInLeft">
                <span className="text-[30vw] md:text-[10vw]">
                  {postContent.title &&
                    postContent.title.rendered.substring(0, 2)}
                </span>
                <span>
                  {postContent.title && postContent.title.rendered.substring(2)}
                </span>
              </h1>

              <div
                className={`${style.content} text-left animate__animated animate__fadeInRight`}
                dangerouslySetInnerHTML={{
                  __html: postContent.content && postContent.content.rendered,
                }}
              ></div>
            </div>
            {nextLink ? (
              <span className={`absolute right-10 bottom-10 flex`}>
                <Link
                  className={`z-[2] font-modelicamed text-[25px] leading-[30px] flex items-center justify-center hover:underline`}
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
                className={`absolute scale-[.8] md:scale-95 right-0 md:right-10 bottom-10 z-[2] font-modelicabold text-[21px] rounded-3xl text-white flex flex-col items-center justify-center py-[10px] px-[25px] bg-black hover:bg-blue-one hover:text-black`}
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
