import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { apiGetPage, apiGetPostType } from "../services/apiService";
import { MyContext } from "../MyContext";
import style from "./about-style.module.css";
import Loading from "../components/Loading";
import { Link } from "react-router-dom";
import btn2Image from "../assets/images/btn2.webp";
import arrowDown from "../assets/images/arrowdown.svg";
import { MdClose } from "react-icons/md";
import { PageMainContent } from "../components/PageMainContent";

export default function About() {
  const [pageContent, setPageContent] = useState({});
  const [testimonialsContent, setTestimonialsContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [featuredImageUrl, setFeaturedImageUrl] = useState("");
  const [isShowingAboutContent, setIsShowingAboutContent] = useState(false);
  const { language } = useContext(MyContext);

  useEffect(() => {
    async function getPageContent() {
      try {
        window.scrollTo(0, 0);
        const backEndContent = await apiGetPage(17, language);
        const backendTestimonials = await apiGetPostType("testimony", language);
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
  }, [language]);

  function extractTextFromHtml(html) {
    const span = document.createElement("span");
    span.innerHTML = html;
    return span.textContent || span.innerText;
  }

  function getFirstWords(html, qty) {
    const text = extractTextFromHtml(html);
    const words = text.split(/\s+/).slice(0, qty);
    return words.join(" ");
  }

  function handleClick(event) {
    event.preventDefault();
    setIsShowingAboutContent(!isShowingAboutContent);
  }

  return (
    <>
      <section className="flex flex-col justify-center items-start min-h-100v-h2 bg-orange-one px-[20px] py-[35px] md:p-[75px] overflow-hidden">
        {!loading ? (
          <>
            <PageMainContent
              title={pageContent.title.rendered}
              content={pageContent.content.rendered}
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
            <h1 className="font-modelicalight text-[10vw] leading-[10vw] md:text-[5vw] md:leading-[5.5vw] text-left">
              <strong className="font-modelicabold">sti7ch</strong>{" "}
              {language === "en" ? "is" : "é"}
              <br />
              <span className="text-[10vw] md:text-[5.5vw]">
                {pageContent.acf.title_about}
              </span>
            </h1>
            <div className="flex mt-8 items-start justify-between flex-col md:flex-row">
              <img
                className="w-full md:w-1/4 h-auto"
                alt="Danubia"
                src={featuredImageUrl}
              />
              <div className="flex flex-col flex-grow w-full md:w-3/4 items-center">
                <div className="text-[18px] md:text-[30px] w-full font-modelicalight leading-[28px] md:leading-[45px] text-left px-0 md:px-[40px] mt-[12%]">
                  {getFirstWords(pageContent.acf.content_about, 37)}
                </div>
                <div
                  className={`relative overflow-hidden w-full flex justify-center ${
                    isShowingAboutContent
                      ? "max-h-[auto] opacity-100"
                      : "max-h-0 p-0 opacity-0"
                  } transition-all duration-500 ease-in-out z-[5] overflow-hidden`}
                >
                  {!loading ? (
                    <>
                      <div
                        className={`${style.fullText} text-content w-full px-0 md:px-[40px] overflow-y-auto`}
                        dangerouslySetInnerHTML={{
                          __html: pageContent.acf.content_about
                            .split(" ")
                            .slice(37)
                            .join(" "),
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
                    isShowingAboutContent ? "rotate-180" : ""
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
        className={`${style.testimonials} relative flex flex-col gap-40 md:gap-0 justify-center items-center bg-bg-one px-[20px] py-[35px] md:p-[75px] overflow-hidden`}
      >
        {!loading ? (
          <>
            {testimonialsContent &&
              [...testimonialsContent].reverse().map((testimony) => (
                <div
                  className={`${style.testimony} flex flex-col mt-8 w-full md:w-2/5 items-left justify-between text-left`}
                >
                  <div
                    className="w-full font-modelicalight text-[18px] md:text-[2vw]"
                    dangerouslySetInnerHTML={{
                      __html: testimony.content.rendered,
                    }}
                  ></div>
                  <span className="font-modelicabold text-[20px] md:text-[1.5vw]">
                    {testimony.title.rendered}
                  </span>
                </div>
              ))}
          </>
        ) : (
          <Loading loading={loading} />
        )}
        <span
          className={`relative w-full md:w-auto md:absolute md:right-10 md:bottom-10 flex `}
        >
          <Link
            className={`z-[2] w-full md:w-auto  text-[20px] border-[1.5px] border-black border-solid py-[5px] px-[20px] font-modelicabold rounded-xl leading-[30px] flex items-center justify-center hover:text-white hover:bg-black`}
            style={{
              cursor: "pointer",
            }}
            to="/methodology"
          >
            {language === "en" ? "See How We Work" : "Veja como trabalhamos"}
          </Link>
        </span>
      </section>
    </>
  );
}
