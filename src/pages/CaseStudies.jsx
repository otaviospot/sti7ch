import { useEffect, useState } from "react";
import { apiGetPage, apiGetPostType } from "../services/apiService";
import style from "./about-style.module.css";
import Loading from "../components/Loading";
import { Link } from "react-router-dom";
import btn1Image from "../assets/images/btn1.webp";

export default function CaseStudies() {
  const [pageContent, setPageContent] = useState({});
  const [casesContent, setCasesContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isShowingCases, setIsShowingCases] = useState(false);

  useEffect(() => {
    async function getPageContent() {
      try {
        const backEndContent = await apiGetPage(61);
        setPageContent(backEndContent);
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
      {!isShowingCases ? (
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
      ) : (
        <section
          className={`${style.testimonials} flex flex-col justify-center items-center bg-bg-one p-[75px] overflow-hidden`}
        >
          {!loading ? (
            <>
              {casesContent &&
                casesContent.map((singlecase) => (
                  <div
                    className={`${style.testimony} flex flex-col mt-8 w-2/5 items-left justify-between text-left`}
                  >
                    <div
                      className="w-full font-modelicalight text-[2vw]"
                      dangerouslySetInnerHTML={{
                        __html: singlecase.content.rendered,
                      }}
                    ></div>
                    <span className="font-modelicabold text-[1.5vw]">
                      {singlecase.title.rendered}
                    </span>
                  </div>
                ))}
            </>
          ) : (
            <Loading loading={loading} />
          )}
        </section>
      )}
    </>
  );
}
