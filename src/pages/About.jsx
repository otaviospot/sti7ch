import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { apiGetPage, apiGetPostType } from '../services/apiService';
import { MyContext } from '../MyContext';
import { AnimationOnScroll } from 'react-animation-on-scroll';
import style from './about-style.module.css';
import Loading from '../components/Loading';
import { Link } from 'react-router-dom';
import arrowDown from '../assets/images/arrowdown.svg';
import { MdClose } from 'react-icons/md';
import { PageMainContent } from '../components/PageMainContent';

export default function About() {
  const [pageContent, setPageContent] = useState({});
  const [bioContent, setbioContent] = useState({});
  const [testimonialsContent, setTestimonialsContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [featuredImageUrl, setFeaturedImageUrl] = useState('');
  const [isShowingAboutContent, setIsShowingAboutContent] = useState(false);
  const { language } = useContext(MyContext);

  useEffect(() => {
    async function getPageContent() {
      try {
        window.scrollTo(0, 0);
        const backEndContent = await apiGetPage(17, language);
        const backEndBioContent = await apiGetPage(184, language);
        const backendTestimonials = await apiGetPostType('testimony', language);
        setPageContent(backEndContent);
        setbioContent(backEndBioContent);
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
  }, [language]);

  useEffect(() => {
    // Adiciona ou remove a classe no body dependendo do estado do popup
    if (isShowingAboutContent) {
      document.body.classList.add('popup-open');
    } else {
      document.body.classList.remove('popup-open');
    }
  }, [isShowingAboutContent]);

  function getFirstNParagraphs(html, n) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const paragraphs = doc.querySelectorAll('p');
    let resultHtml = '';

    for (let i = 0; i < Math.min(n, paragraphs.length); i++) {
      resultHtml += paragraphs[i].outerHTML; // outerHTML mantém a tag <p> original
    }

    return resultHtml;
  }

  function getParagraphsExceptFirstTwo(html) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const paragraphs = doc.querySelectorAll('p');
    let resultHtml = '';

    for (let i = 2; i < paragraphs.length; i++) {
      resultHtml += paragraphs[i].outerHTML; // outerHTML mantém a tag <p> original
    }

    return resultHtml;
  }

  function handleClick(event) {
    event.preventDefault();
    setIsShowingAboutContent(!isShowingAboutContent);
  }

  return (
    <>
      <div
        className={`${
          style.maincontent
        } fixed right-0 bottom-0 z-10 overflow-hidden w-full h-100v80-h pt-[60px] px-[20px] md:pt-[75px] md:px-[75px] flex justify-center overflow-y-auto ${
          isShowingAboutContent ? 'translate-x-[0vw]' : 'translate-x-[101vw]'
        } transition-all duration-500 ease-in-out z-[5] overflow-hidden`}
      >
        <button
          className="absolute right-[20px] top-[20px] text-[30px]"
          onClick={handleClick}
        >
          <MdClose />
        </button>

        {!loading ? (
          <>
            <div
              className={`${style.fullText} text-content w-full px-0 md:pr-[30px] overflow-y-auto`}
              dangerouslySetInnerHTML={{
                __html: getParagraphsExceptFirstTwo(
                  bioContent.content && bioContent.content.rendered
                ),
              }}
            ></div>
          </>
        ) : (
          <Loading loading={loading} />
        )}
      </div>
      <section className="flex flex-col justify-center items-start min-h-100v-h2 bg-orange-one px-[20px] py-[35px] md:p-[75px] overflow-hidden">
        {!loading ? (
          <>
            <PageMainContent
              title={pageContent.title && pageContent.title.rendered}
              content={pageContent.content && pageContent.content.rendered}
              style={style.content}
            />
          </>
        ) : (
          <Loading loading={loading} />
        )}
      </section>
      <section className="flex flex-col justify-center items-start bg-bg-one px-[20px] py-[35px] md:p-[75px] overflow-hidden">
        {!loading ? (
          <>
            <h1 className="font-modelicalight text-[10vw] leading-[10vw] md:text-[4vw] 2xl:text-[5vw] md:leading-[5.5vw] text-left">
              <strong className="font-modelicabold">sti7ch</strong>{' '}
              {language === 'en' ? 'is' : 'é'}
              <br />
              <span className="text-[10vw] md:text-[4vw] 2xl:text-[5.5vw]">
                {pageContent.acf.title_about && pageContent.acf.title_about}
              </span>
            </h1>
            <div className="flex mt-8 items-center justify-between flex-col md:flex-row">
              <img
                className="w-full md:w-1/4 h-auto"
                alt="Danubia"
                src={featuredImageUrl}
              />
              <div className="flex flex-col flex-grow w-full md:w-3/4 items-center">
                <div className="w-full px-0 md:px-[40px]">
                  <div
                    className={`${style.contentExerpt} w-full font-modelicalight text-[18px] md:text-[24px] 2xl:text-[30px] leading-[28px] md:leading-[35px] 2xl:leading-[45px]  text-left`}
                    dangerouslySetInnerHTML={{
                      __html: getFirstNParagraphs(
                        bioContent.content && bioContent.content.rendered,
                        2
                      ),
                    }}
                  ></div>
                </div>
                <span
                  onClick={handleClick}
                  className={`cursor-pointer md:w-[25px] 2xl:w-[30px] mt-4 ${
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
        className={`${style.testimonials} relative flex flex-col gap-40 md:gap-0 justify-center items-center bg-bg-one px-[20px] py-[35px] md:p-[75px] md:pb-[200px] overflow-hidden`}
      >
        {!loading ? (
          <>
            {testimonialsContent &&
              [...testimonialsContent].reverse().map((testimony, index) => (
                <AnimationOnScroll
                  animateIn="animate__fadeInUp"
                  duration={2}
                  animateOnce={true}
                  initiallyVisible={false}
                  className={`${style.testimony} flex flex-col mt-8 w-full md:w-2/5 2xl:w-[30%] items-left justify-between text-left`}
                >
                  <div
                    className="w-full font-modelicalight text-[17px] md:text-[23px] 2xl:text-[28px]"
                    dangerouslySetInnerHTML={{
                      __html: testimony.content.rendered,
                    }}
                  ></div>
                  <span className="font-modelicabold text-[17px] mt-[5px] md:text-[20px]">
                    {testimony.title.rendered}
                  </span>
                </AnimationOnScroll>
              ))}
          </>
        ) : (
          <Loading loading={loading} />
        )}
        <span
          className={`relative w-full md:w-auto md:absolute md:right-10 md:bottom-10 flex `}
        >
          <Link
            className={`z-[2] w-full md:w-auto  text-[21px] border-[1.5px] border-black hover:border-transparent border-solid py-[5px] px-[21px] font-modelicamed rounded-xl leading-[30px] flex items-center justify-center hover:text-white hover:bg-pink-one`}
            style={{
              cursor: 'pointer',
            }}
            to="/methodology"
          >
            {language === 'en' ? 'See How We Work' : 'Veja como trabalhamos'}
          </Link>
        </span>
      </section>
    </>
  );
}
