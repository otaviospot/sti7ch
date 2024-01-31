import { useEffect, useState } from 'react';
import axios from 'axios';
import { apiGetPage, apiGetPostType } from '../services/apiService';
import style from './about-style.module.css';
import Loading from '../components/Loading';
import { Link } from 'react-router-dom';
import btn2Image from '../assets/images/btn2.webp';
import arrowDown from '../assets/images/arrowdown.svg';
import { MdClose } from 'react-icons/md';

export default function About() {
  const [pageContent, setPageContent] = useState({});
  const [testimonialsContent, setTestimonialsContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [featuredImageUrl, setFeaturedImageUrl] = useState('');
  const [isShowingAboutContent, setIsShowingAboutContent] = useState(false);

  useEffect(() => {
    async function getPageContent() {
      try {
        window.scrollTo(0, 0);
        const backEndContent = await apiGetPage(17);
        const backendTestimonials = await apiGetPostType('testimony');
        setPageContent(backEndContent);
        setTestimonialsContent(backendTestimonials);

        // Fetching the featured image if it exists
        const featuredMediaId = backEndContent.featured_media;
        if (featuredMediaId) {
          const imageResponse = await axios.get(
            `https://sti7ch.com/wp-json/wp/v2/media/${featuredMediaId}`
          );
          const imageUrl = imageResponse.data.source_url;
          setFeaturedImageUrl(imageUrl);
        }

        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    getPageContent();
  }, []);

  function extractTextFromHtml(html) {
    const span = document.createElement('span');
    span.innerHTML = html;
    return span.textContent || span.innerText;
  }

  function getFirstWords(html, qty) {
    const text = extractTextFromHtml(html);
    const words = text.split(/\s+/).slice(0, qty);
    return words.join(' ');
  }

  function handleClick(event) {
    event.preventDefault();
    setIsShowingAboutContent(!isShowingAboutContent);
  }

  return (
    <>
      <section className="flex flex-col justify-center items-start min-h-100v-h2 bg-orange-one p-[75px] overflow-hidden">
        {!loading ? (
          <>
            <h1 className="text-[5vw] font-modelicabold text-left leading-[6vw] mb-5">
              {pageContent.title.rendered}
            </h1>
            <div className={style.content}>
              <div
                className="text-content"
                dangerouslySetInnerHTML={{
                  __html: pageContent.content.rendered,
                }}
              ></div>
            </div>
          </>
        ) : (
          <Loading loading={loading} />
        )}
      </section>
      <section className="flex flex-col justify-center items-start bg-bg-one p-[75px] overflow-hidden">
        {!loading ? (
          <>
            <h1 className="font-modelicalight text-[5vw] leading-[5.5vw] text-left">
              <strong className="font-modelicabold">Sti7ch</strong> is
              <br />
              <span className="text-[5.5vw]">
                {pageContent.acf.title_about}
              </span>
            </h1>
            <div className="flex mt-8 items-start justify-between">
              <img
                className="w-1/4 h-auto"
                alt="Danubia"
                src={featuredImageUrl}
              />
              <div className="flex flex-col flex-grow w-3/4 items-center">
                <div className="text-[30px] w-full font-modelicalight leading-[45px] text-left px-[40px] mt-[12%]">
                  {getFirstWords(pageContent.acf.content_about, 36)}
                </div>
                <div
                  className={`relative overflow-hidden w-full flex justify-center ${
                    isShowingAboutContent
                      ? 'max-h-[auto] opacity-100'
                      : 'max-h-0 p-0 opacity-0'
                  } transition-all duration-500 ease-in-out z-[5] overflow-hidden`}
                >
                  {!loading ? (
                    <>
                      <div
                        className={`${style.fullText} text-content w-full px-[40px] overflow-y-auto`}
                        dangerouslySetInnerHTML={{
                          __html: pageContent.acf.content_about
                            .split(' ')
                            .slice(35)
                            .join(' '),
                        }}
                      ></div>
                    </>
                  ) : (
                    <Loading loading={loading} />
                  )}
                </div>
                <span
                  onClick={handleClick}
                  className={`cursor-pointer w-[30px] mt-8 ${
                    isShowingAboutContent ? 'rotate-180' : ''
                  }`}
                >
                  <img alt="See more" className="w-[30px]" src={arrowDown} />
                </span>
              </div>
            </div>
          </>
        ) : (
          <Loading loading={loading} />
        )}
      </section>
      <section
        className={`${style.testimonials} relative flex flex-col justify-center items-center bg-bg-one p-[75px] overflow-hidden`}
      >
        {!loading ? (
          <>
            {testimonialsContent &&
              [...testimonialsContent].reverse().map((testimony) => (
                <div
                  className={`${style.testimony} flex flex-col mt-8 w-2/5 items-left justify-between text-left`}
                >
                  <div
                    className="w-full font-modelicalight text-[2vw]"
                    dangerouslySetInnerHTML={{
                      __html: testimony.content.rendered,
                    }}
                  ></div>
                  <span className="font-modelicabold text-[1.5vw]">
                    {testimony.title.rendered}
                  </span>
                </div>
              ))}
          </>
        ) : (
          <Loading loading={loading} />
        )}
        <span className={`absolute right-10 bottom-10 flex `}>
          <Link
            className={`z-[2] text-[20px] border-[1.5px] border-black border-solid py-[5px] px-[20px] font-modelicabold rounded-xl leading-[30px] flex items-center justify-center hover:text-white hover:bg-black`}
            style={{
              cursor: 'pointer',
            }}
            to="/methodology"
          >
            See How We Work Together
          </Link>
        </span>
      </section>
    </>
  );
}
