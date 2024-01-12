import { useEffect, useState } from "react";
import axios from "axios";
import { apiGetPage, apiGetPostType } from "../services/apiService";
import style from "./about-style.module.css";
import Loading from "../components/Loading";
import { Link } from "react-router-dom";
import btn1Image from "../assets/images/btn1.webp";

export default function About() {
  const [pageContent, setPageContent] = useState({});
  const [testimonialsContent, setTestimonialsContent] = useState({});
  const [loading, setLoading] = useState(true);
  const [featuredImageUrl, setFeaturedImageUrl] = useState("");

  useEffect(() => {
    async function getPageContent() {
      try {
        const backEndContent = await apiGetPage(17);
        const backendTestimonials = await apiGetPostType("testimony");
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
    const span = document.createElement("span");
    span.innerHTML = html;
    return span.textContent || span.innerText;
  }

  function getFirstWords(html, qty) {
    const text = extractTextFromHtml(html);
    const words = text.split(/\s+/).slice(0, qty);
    return words.join(" ");
  }

  return (
    <>
      <section className="flex flex-col justify-center items-start min-h-100v-h bg-orange-one p-[75px] overflow-hidden">
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
              <span
                className={`absolute -right-60 bottom-0 flex w-[179px] h-[120px]`}
              >
                <Link
                  className={`w-[179px] h-[120px] z-[2] font-modelicamed text-[31px] leading-[30px] flex items-center justify-center`}
                  style={{ backgroundImage: `url(${btn1Image})` }}
                  to="/"
                >
                  Ready to
                  <br />
                  Grow?
                </Link>
              </span>
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
            <div className="flex mt-8 items-center justify-between">
              <img
                className="w-1/4 h-auto"
                alt="Danubia"
                src={featuredImageUrl}
              />
              <div className="text-[4vw] w-3/4 font-modelicalight leading-[4.5vw] text-left pl-8">
                "{getFirstWords(pageContent.acf.content_about, 17)}"
              </div>
            </div>
          </>
        ) : (
          <Loading loading={loading} />
        )}
      </section>
      <section
        className={`${style.testimonials} flex flex-col justify-center items-center bg-bg-one p-[75px] overflow-hidden`}
      >
        {!loading ? (
          <>
            {testimonialsContent &&
              testimonialsContent.map((testimony) => (
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
      </section>
    </>
  );
}
