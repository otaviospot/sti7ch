import { useEffect, useState, useContext } from "react";
import { apiGetPage } from "../services/apiService";
import { MyContext } from "../MyContext";
import style from "./home-style.module.css";
import Loading from "../components/Loading";
import { Link } from "react-router-dom";
import btn1Image from "../assets/images/btn1-2.webp";
import { PageMainContent } from "../components/PageMainContent";

export default function Home() {
  const [pageContent, setPageContent] = useState({});
  const [loading, setLoading] = useState(true);
  const { language } = useContext(MyContext);

  useEffect(() => {
    async function getPageContent() {
      try {
        const backEndContent = await apiGetPage(14, language);
        setPageContent(backEndContent);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    getPageContent();
  }, [language]);

  return (
    <>
      <section className="flex relative flex-col justify-center items-start min-h-100v-h bg-blue-one px-[20px] pb-[75px] pt-[0px] md:p-[75px] overflow-hidden">
        {!loading ? (
          <>
            <PageMainContent
              title={pageContent.title.rendered}
              content={pageContent.content.rendered}
              style={style.content}
            />
            <span
              className={`${style.btn1} absolute right-[20px] flex w-[152px] h-[132px] transition-all ease-linear duration-500 animate__animated animate__fadeInRight animate__delay-3s`}
            >
              <Link
                className={`btn-1 w-[152px] h-[132px] z-[2] font-modelicamed text-[28px] leading-[30px] flex items-center justify-center`}
                style={{ backgroundImage: `url(${btn1Image})` }}
                to="/about"
              >
                {language === "en" ? (
                  <>
                    Ready to
                    <br />
                    Grow?
                  </>
                ) : (
                  <>
                    Pronto para
                    <br />
                    crescer?
                  </>
                )}
              </Link>
            </span>
          </>
        ) : (
          <Loading loading={loading} />
        )}
      </section>
    </>
  );
}
